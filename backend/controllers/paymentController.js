// Charger les variables d'environnement en premier
import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
import { dbRun, dbGet, dbAll } from '../database/db.js';

// Vérifier que la clé Stripe est configurée
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey || stripeSecretKey.includes('votre_cle')) {
  console.warn('⚠️  ATTENTION: STRIPE_SECRET_KEY n\'est pas configurée dans .env');
  console.warn('   Le serveur démarrera mais les paiements ne fonctionneront pas.');
  console.warn('   Pour configurer: https://dashboard.stripe.com/apikeys');
}

// Initialiser Stripe avec la clé secrète
const stripe = stripeSecretKey && !stripeSecretKey.includes('votre_cle')
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2024-12-18.acacia',
    })
  : null;

/**
 * Créer une session de paiement Stripe Checkout
 */
export const createCheckoutSession = async (req, res) => {
  // Vérifier que Stripe est configuré
  if (!stripe) {
    console.error('❌ Stripe n\'est pas initialisé');
    return res.status(500).json({
      success: false,
      error: 'Stripe n\'est pas configuré. Veuillez configurer STRIPE_SECRET_KEY dans backend/.env'
    });
  }

  try {
    console.log('📝 Création de session checkout:', req.body);
    const { productId, finishMode, customerEmail, customerName } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'productId est requis'
      });
    }

    // Récupérer le produit depuis la base de données
    console.log('🔍 Recherche du produit ID:', productId);
    const product = await dbGet(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ? AND p.status = 'active'`,
      [productId]
    );

    if (!product) {
      console.error('❌ Produit non trouvé:', productId);
      return res.status(404).json({
        success: false,
        error: 'Produit non trouvé'
      });
    }
    console.log('✅ Produit trouvé:', product.name);

    // Calculer le prix (utiliser price_min par défaut, ou price_max si finishMode === 'wood')
    const basePrice = finishMode === 'wood' && product.price_max 
      ? product.price_max 
      : product.price_min || 45000;

    // Créer le nom du produit avec la finition
    const finishLabel = finishMode === 'wood' ? 'Bois' : 'Industrielle';
    const productName = `${product.name} - Finition ${finishLabel}`;

    // Préparer les images pour Stripe (doivent être des URLs absolues)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5090';
    let productImages = [];
    if (product.images) {
      try {
        const images = JSON.parse(product.images);
        productImages = images
          .slice(0, 1) // Stripe accepte max 1 image
          .map((img) => {
            // Si c'est déjà une URL complète, l'utiliser telle quelle
            if (img.startsWith('http://') || img.startsWith('https://')) {
              return img;
            }
            // Sinon, convertir le chemin relatif en URL absolue
            if (img.startsWith('/')) {
              return `${frontendUrl}${img}`;
            }
            // Si le chemin ne commence pas par /, l'ajouter
            return `${frontendUrl}/${img}`;
          })
          .filter(Boolean); // Retirer les valeurs vides
      } catch (e) {
        console.warn('⚠️ Erreur lors du parsing des images:', e);
      }
    }

    // Créer la session de paiement Stripe
    console.log('💳 Création de la session Stripe...');
    console.log('🖼️ Images du produit:', productImages);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
              description: product.short_description || product.description || 'Maison container UNIHOME',
              images: productImages, // Utiliser les images converties en URLs absolues
            },
            unit_amount: Math.round(basePrice * 100), // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/payment/cancel`,
      customer_email: customerEmail,
      metadata: {
        productId: productId.toString(),
        productName: product.name,
        finishMode: finishMode || 'indus',
        customerName: customerName || '',
      },
    });

    // Enregistrer la commande en base de données (statut: pending)
    console.log('💾 Enregistrement de la commande en base de données...');
    await dbRun(
      `INSERT INTO orders (
        stripe_session_id, 
        product_id, 
        product_name, 
        finish_mode, 
        amount, 
        currency, 
        customer_email, 
        customer_name, 
        status, 
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        session.id,
        productId,
        product.name,
        finishMode || 'indus',
        basePrice,
        'eur',
        customerEmail || null,
        customerName || null,
        'pending',
        new Date().toISOString()
      ]
    );

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('❌ Erreur lors de la création de la session Stripe:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de la session de paiement',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Récupérer les détails d'une session de paiement
 */
export const getCheckoutSession = async (req, res) => {
  // Vérifier que Stripe est configuré
  if (!stripe) {
    return res.status(500).json({
      success: false,
      error: 'Stripe n\'est pas configuré. Veuillez configurer STRIPE_SECRET_KEY dans backend/.env'
    });
  }

  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'sessionId est requis'
      });
    }

    // Récupérer la session depuis Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Récupérer la commande depuis la base de données
    const order = await dbGet(
      'SELECT * FROM orders WHERE stripe_session_id = ?',
      [sessionId]
    );

    res.json({
      success: true,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata
      },
      order: order || null
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de la session',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Webhook pour les événements Stripe
 */
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET n\'est pas configuré');
    return res.status(400).send('Webhook secret manquant');
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Erreur de signature webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Gérer les différents types d'événements
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('✅ Paiement réussi:', session.id);
        
        // Mettre à jour le statut de la commande
        await dbRun(
          `UPDATE orders 
           SET status = 'completed', 
               payment_status = ?, 
               stripe_payment_intent_id = ?,
               updated_at = ?
           WHERE stripe_session_id = ?`,
          [
            session.payment_status,
            session.payment_intent || null,
            new Date().toISOString(),
            session.id
          ]
        );
        break;

      case 'checkout.session.async_payment_succeeded':
        const asyncSession = event.data.object;
        console.log('✅ Paiement asynchrone réussi:', asyncSession.id);
        
        await dbRun(
          `UPDATE orders 
           SET status = 'completed', 
               payment_status = ?,
               updated_at = ?
           WHERE stripe_session_id = ?`,
          [
            asyncSession.payment_status,
            new Date().toISOString(),
            asyncSession.id
          ]
        );
        break;

      case 'checkout.session.async_payment_failed':
        const failedSession = event.data.object;
        console.log('❌ Paiement échoué:', failedSession.id);
        
        await dbRun(
          `UPDATE orders 
           SET status = 'failed', 
               payment_status = ?,
               updated_at = ?
           WHERE stripe_session_id = ?`,
          [
            failedSession.payment_status,
            new Date().toISOString(),
            failedSession.id
          ]
        );
        break;

      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Erreur lors du traitement du webhook:', error);
    res.status(500).json({ error: 'Erreur lors du traitement du webhook' });
  }
};

/**
 * Récupérer toutes les commandes (admin)
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await dbAll(
      `SELECT o.*, p.name as product_name, p.images as product_images
       FROM orders o
       LEFT JOIN products p ON o.product_id = p.id
       ORDER BY o.created_at DESC`
    );

    res.json({
      success: true,
      orders: orders.map(order => ({
        ...order,
        product_images: order.product_images ? JSON.parse(order.product_images) : []
      }))
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des commandes'
    });
  }
};


