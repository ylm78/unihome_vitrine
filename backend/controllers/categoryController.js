import { dbAll, dbGet, dbRun } from '../database/db.js';

// Récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await dbAll(
      `SELECT 
        c.*,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
      GROUP BY c.id
      ORDER BY c.name ASC`
    );
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories',
      error: error.message
    });
  }
};

// Récupérer une catégorie par son slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const category = await dbGet(
      `SELECT * FROM categories WHERE slug = ?`,
      [slug]
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }
    
    // Récupérer les produits de cette catégorie
    const products = await dbAll(
      `SELECT * FROM products WHERE category_id = ? AND status = 'active' ORDER BY created_at DESC`,
      [category.id]
    );
    
    const formattedProducts = products.map(product => ({
      ...product,
      features: product.features ? JSON.parse(product.features) : [],
      images: product.images ? JSON.parse(product.images) : []
    }));
    
    res.json({
      success: true,
      data: {
        ...category,
        products: formattedProducts,
        product_count: formattedProducts.length
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la catégorie',
      error: error.message
    });
  }
};

// Créer une catégorie
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, icon } = req.body;
    
    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Le nom et le slug sont requis'
      });
    }
    
    const result = await dbRun(
      `INSERT INTO categories (name, slug, description, icon) VALUES (?, ?, ?, ?)`,
      [name, slug, description || null, icon || null]
    );
    
    const newCategory = await dbGet(
      `SELECT * FROM categories WHERE id = ?`,
      [result.lastID]
    );
    
    res.status(201).json({
      success: true,
      message: 'Catégorie créée avec succès',
      data: newCategory
    });
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la catégorie',
      error: error.message
    });
  }
};

