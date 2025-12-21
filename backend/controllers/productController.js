import { dbAll, dbGet, dbRun } from '../database/db.js';

// Récupérer tous les produits
export const getAllProducts = async (req, res) => {
  try {
    const { category, status, limit, offset, search } = req.query;
    
    let query = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        c.icon as category_icon
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (category) {
      query += ` AND c.slug = ?`;
      params.push(category);
    }
    
    if (status && status !== 'all') {
      query += ` AND p.status = ?`;
      params.push(status);
    } else if (!status) {
      // Par défaut, ne montrer que les actifs si pas de filtre
      query += ` AND p.status = 'active'`;
    }
    // Si status === 'all', on ne filtre pas par statut
    
    if (search) {
      query += ` AND (p.name LIKE ? OR p.description LIKE ? OR p.short_description LIKE ?)`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    query += ` ORDER BY p.created_at DESC`;
    
    if (limit) {
      query += ` LIMIT ?`;
      params.push(parseInt(limit));
      
      if (offset) {
        query += ` OFFSET ?`;
        params.push(parseInt(offset));
      }
    }
    
    const products = await dbAll(query, params);
    
    // Parser les features, images et videos
    const formattedProducts = products.map(product => ({
      ...product,
      features: product.features ? JSON.parse(product.features) : [],
      images: product.images ? JSON.parse(product.images) : [],
      videos: product.videos ? JSON.parse(product.videos) : []
    }));
    
    res.json({
      success: true,
      count: formattedProducts.length,
      data: formattedProducts
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits',
      error: error.message
    });
  }
};

// Récupérer un produit par son slug
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const product = await dbGet(
      `SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        c.icon as category_icon
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ? AND p.status = 'active'`,
      [slug]
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Parser les features, images et videos
    product.features = product.features ? JSON.parse(product.features) : [];
    product.images = product.images ? JSON.parse(product.images) : [];
    product.videos = product.videos ? JSON.parse(product.videos) : [];
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du produit',
      error: error.message
    });
  }
};

// Récupérer un produit par sa route
export const getProductByRoute = async (req, res) => {
  try {
    const route = '/' + req.params[0];
    
    const product = await dbGet(
      `SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        c.icon as category_icon
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.route = ? AND p.status = 'active'`,
      [route]
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Parser les features, images et videos
    product.features = product.features ? JSON.parse(product.features) : [];
    product.images = product.images ? JSON.parse(product.images) : [];
    product.videos = product.videos ? JSON.parse(product.videos) : [];
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du produit',
      error: error.message
    });
  }
};

// Récupérer un produit par ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await dbGet(
      `SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        c.icon as category_icon
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
      [id]
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Parser les features, images et videos
    product.features = product.features ? JSON.parse(product.features) : [];
    product.images = product.images ? JSON.parse(product.images) : [];
    product.videos = product.videos ? JSON.parse(product.videos) : [];
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du produit',
      error: error.message
    });
  }
};

// Créer un produit
export const createProduct = async (req, res) => {
  try {
    const {
      category_id,
      name,
      slug,
      description,
      short_description,
      price_min,
      price_max,
      surface_min,
      surface_max,
      images,
      videos,
      features,
      route,
      status = 'active'
    } = req.body;
    
    if (!name || !slug || !category_id) {
      return res.status(400).json({
        success: false,
        message: 'Le nom, le slug et la catégorie sont requis'
      });
    }
    
    const result = await dbRun(
      `INSERT INTO products 
      (category_id, name, slug, description, short_description, price_min, price_max, 
       surface_min, surface_max, images, videos, features, route, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        category_id,
        name,
        slug,
        description || null,
        short_description || null,
        price_min || null,
        price_max || null,
        surface_min || null,
        surface_max || null,
        images ? JSON.stringify(images) : null,
        videos ? JSON.stringify(videos) : null,
        features ? JSON.stringify(features) : null,
        route || null,
        status
      ]
    );
    
    const newProduct = await dbGet(
      `SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        c.icon as category_icon
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
      [result.lastID]
    );
    
    newProduct.features = newProduct.features ? JSON.parse(newProduct.features) : [];
    newProduct.images = newProduct.images ? JSON.parse(newProduct.images) : [];
    newProduct.videos = newProduct.videos ? JSON.parse(newProduct.videos) : [];
    
    res.status(201).json({
      success: true,
      message: 'Produit créé avec succès',
      data: newProduct
    });
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du produit',
      error: error.message
    });
  }
};

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Vérifier que le produit existe
    const existingProduct = await dbGet(
      `SELECT id FROM products WHERE id = ?`,
      [id]
    );
    
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Construire la requête de mise à jour dynamiquement
    const fields = [];
    const values = [];
    
    const allowedFields = [
      'category_id', 'name', 'slug', 'description', 'short_description',
      'price_min', 'price_max', 'surface_min', 'surface_max',
      'images', 'videos', 'features', 'route', 'status'
    ];
    
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        if (field === 'images' || field === 'features' || field === 'videos') {
          fields.push(`${field} = ?`);
          values.push(JSON.stringify(updates[field]));
        } else {
          fields.push(`${field} = ?`);
          values.push(updates[field]);
        }
      }
    }
    
    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucun champ à mettre à jour'
      });
    }
    
    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    await dbRun(
      `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    const updatedProduct = await dbGet(
      `SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        c.icon as category_icon
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
      [id]
    );
    
    updatedProduct.features = updatedProduct.features ? JSON.parse(updatedProduct.features) : [];
    updatedProduct.images = updatedProduct.images ? JSON.parse(updatedProduct.images) : [];
    updatedProduct.videos = updatedProduct.videos ? JSON.parse(updatedProduct.videos) : [];
    
    res.json({
      success: true,
      message: 'Produit mis à jour avec succès',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du produit',
      error: error.message
    });
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier que le produit existe
    const existingProduct = await dbGet(
      `SELECT id FROM products WHERE id = ?`,
      [id]
    );
    
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Soft delete (marquer comme supprimé)
    await dbRun(
      `UPDATE products SET status = 'deleted', updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [id]
    );
    
    res.json({
      success: true,
      message: 'Produit supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du produit',
      error: error.message
    });
  }
};

