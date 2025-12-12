/**
 * ================================
 * RUTAS PARA PROYECTOS
 * ================================
 * Maneja las operaciones CRUD de proyectos
 */

const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * GET - Obtener todos los proyectos
 */
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [proyectos] = await connection.query('SELECT * FROM proyectos ORDER BY fecha_proyecto DESC');
    connection.release();
    
    res.json({
      success: true,
      data: proyectos
    });
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyectos',
      error: error.message
    });
  }
});

/**
 * GET - Obtener un proyecto por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [proyectos] = await connection.query('SELECT * FROM proyectos WHERE id = ?', [id]);
    connection.release();
    
    if (proyectos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: proyectos[0]
    });
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyecto',
      error: error.message
    });
  }
});

/**
 * POST - Crear un nuevo proyecto
 * Body: { nombre, descripcion, tecnologias, estado, fecha_proyecto, imagen_url }
 */
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, tecnologias, estado, fecha_proyecto, imagen_url } = req.body;
    
    // Validación básica
    if (!nombre || !descripcion || !tecnologias || !fecha_proyecto || !imagen_url) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO proyectos (nombre, descripcion, tecnologias, estado, fecha_proyecto, imagen_url) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, tecnologias, estado || 'completado', fecha_proyecto, imagen_url]
    );
    connection.release();
    
    res.status(201).json({
      success: true,
      message: 'Proyecto creado exitosamente',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear proyecto',
      error: error.message
    });
  }
});

/**
 * PUT - Actualizar un proyecto
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, tecnologias, estado, fecha_proyecto, imagen_url } = req.body;
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE proyectos SET nombre = ?, descripcion = ?, tecnologias = ?, estado = ?, fecha_proyecto = ?, imagen_url = ? WHERE id = ?',
      [nombre, descripcion, tecnologias, estado, fecha_proyecto, imagen_url, id]
    );
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Proyecto actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar proyecto',
      error: error.message
    });
  }
});

/**
 * DELETE - Eliminar un proyecto
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM proyectos WHERE id = ?', [id]);
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Proyecto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar proyecto',
      error: error.message
    });
  }
});

module.exports = router;
