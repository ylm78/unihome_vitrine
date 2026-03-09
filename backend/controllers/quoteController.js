import { dbRun, dbAll, dbGet } from '../database/db.js';

/**
 * Créer une demande de devis (route publique)
 */
export const createQuoteRequest = async (req, res) => {
  try {
    const { name, email, phone, model, project, type } = req.body;
    const requestType = (type === 'contact' || type === 'quote') ? type : 'contact';

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nom et email requis'
      });
    }

    const result = await dbRun(
      `INSERT INTO quote_requests (customer_name, customer_email, customer_phone, model, project, status, source, request_type)
       VALUES (?, ?, ?, ?, ?, 'pending', 'site', ?)`,
      [name.trim(), email.trim(), (phone || '').trim(), (model || '').trim(), (project || '').trim(), requestType]
    );

    res.status(201).json({
      success: true,
      message: 'Demande de devis enregistrée',
      data: {
        id: result.lastID
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création de la demande de devis:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement de la demande'
    });
  }
};

/**
 * Récupérer toutes les demandes de devis (admin uniquement)
 */
export const getAllQuoteRequests = async (req, res) => {
  try {
    const requests = await dbAll(
      `SELECT id, customer_name, customer_email, customer_phone, model, project, status, source, request_type, is_favorite, created_at
       FROM quote_requests
       ORDER BY is_favorite DESC, created_at DESC`
    );

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes de devis:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des demandes'
    });
  }
};

/**
 * Mettre à jour une demande (favori, statut) - admin uniquement
 */
export const updateQuoteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_favorite, status } = req.body;

    const updates = [];
    const values = [];

    if (typeof is_favorite === 'boolean') {
      updates.push('is_favorite = ?');
      values.push(is_favorite ? 1 : 0);
    }
    if (status && ['pending', 'treated', 'cancelled', 'quote_created'].includes(status)) {
      updates.push('status = ?');
      values.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucune mise à jour fournie'
      });
    }

    values.push(id);
    await dbRun(
      `UPDATE quote_requests SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    res.json({
      success: true,
      message: 'Demande mise à jour'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour'
    });
  }
};

/**
 * Supprimer une demande - admin uniquement
 */
export const deleteQuoteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await dbRun('DELETE FROM quote_requests WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Demande non trouvée'
      });
    }

    res.json({
      success: true,
      message: 'Demande supprimée'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    });
  }
};
