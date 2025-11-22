const { query } = require('../config/database');

/**
 * Modelo para manejar el circuito integral
 */
class CircuitModel {
    /**
     * Obtener todos los paneles
     */
    static async getAllPanels() {
        const sql = 'SELECT * FROM circuit_panels ORDER BY id';
        const result = await query(sql);
        return result.rows;
    }

    /**
     * Obtener todos los elementos del circuito
     */
    static async getAllElements() {
        const sql = 'SELECT * FROM circuit_elements ORDER BY panel_id, type, left_position';
        const result = await query(sql);
        return result.rows;
    }

    /**
     * Obtener todas las conexiones
     */
    static async getAllConnections() {
        const sql = `
            SELECT 
                cc.*,
                ce1.element_id as from_element_id_str,
                ce2.element_id as to_element_id_str
            FROM circuit_connections cc
            JOIN circuit_elements ce1 ON cc.from_element_id = ce1.id
            JOIN circuit_elements ce2 ON cc.to_element_id = ce2.id
            ORDER BY cc.id
        `;
        const result = await query(sql);
        return result.rows;
    }

    /**
     * Obtener un elemento por element_id
     */
    static async getElementByElementId(elementId) {
        const sql = 'SELECT * FROM circuit_elements WHERE element_id = $1';
        const result = await query(sql, [elementId]);
        return result.rows[0];
    }

    /**
     * Crear un nuevo elemento
     */
    static async createElement(elementData) {
        const {
            element_id,
            type,
            panel_id,
            left_position,
            top_position,
            width,
            height,
            label,
            icon,
            background_color,
            text_color,
            border_color
        } = elementData;

        const sql = `
            INSERT INTO circuit_elements 
            (element_id, type, panel_id, left_position, top_position, width, height, label, icon, background_color, text_color, border_color)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *
        `;
        const params = [
            element_id,
            type,
            panel_id,
            left_position,
            top_position,
            width || null,
            height || null,
            label,
            icon || null,
            background_color || null,
            text_color || null,
            border_color || null
        ];
        const result = await query(sql, params);
        return result.rows[0];
    }

    /**
     * Actualizar un elemento
     */
    static async updateElement(elementId, elementData) {
        const {
            left_position,
            top_position,
            width,
            height,
            label,
            icon,
            background_color,
            text_color,
            border_color
        } = elementData;

        const sql = `
            UPDATE circuit_elements 
            SET 
                left_position = $1,
                top_position = $2,
                width = $3,
                height = $4,
                label = $5,
                icon = $6,
                background_color = $7,
                text_color = $8,
                border_color = $9,
                updated_at = CURRENT_TIMESTAMP
            WHERE element_id = $10
            RETURNING *
        `;
        const params = [
            left_position,
            top_position,
            width || null,
            height || null,
            label,
            icon || null,
            background_color || null,
            text_color || null,
            border_color || null,
            elementId
        ];
        const result = await query(sql, params);
        return result.rows[0];
    }

    /**
     * Eliminar un elemento
     */
    static async deleteElement(elementId) {
        const sql = 'DELETE FROM circuit_elements WHERE element_id = $1 RETURNING *';
        const result = await query(sql, [elementId]);
        return result.rows[0];
    }

    /**
     * Crear una conexión
     */
    static async createConnection(connectionData) {
        const {
            connection_type,
            from_element_id,
            to_element_id,
            points,
            stroke_color,
            stroke_width,
            stroke_dasharray
        } = connectionData;

        const sql = `
            INSERT INTO circuit_connections 
            (connection_type, from_element_id, to_element_id, points, stroke_color, stroke_width, stroke_dasharray)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const params = [
            connection_type,
            from_element_id,
            to_element_id,
            JSON.stringify(points),
            stroke_color || '#00897b',
            stroke_width || 3,
            stroke_dasharray || null
        ];
        const result = await query(sql, params);
        return result.rows[0];
    }

    /**
     * Actualizar una conexión
     */
    static async updateConnection(connectionId, connectionData) {
        const {
            points,
            stroke_color,
            stroke_width,
            stroke_dasharray
        } = connectionData;

        const sql = `
            UPDATE circuit_connections 
            SET 
                points = $1,
                stroke_color = $2,
                stroke_width = $3,
                stroke_dasharray = $4,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *
        `;
        const params = [
            JSON.stringify(points),
            stroke_color,
            stroke_width,
            stroke_dasharray || null,
            connectionId
        ];
        const result = await query(sql, params);
        return result.rows[0];
    }

    /**
     * Eliminar una conexión
     */
    static async deleteConnection(connectionId) {
        const sql = 'DELETE FROM circuit_connections WHERE id = $1 RETURNING *';
        const result = await query(sql, [connectionId]);
        return result.rows[0];
    }

    /**
     * Obtener elemento por ID interno
     */
    static async getElementById(id) {
        const sql = 'SELECT * FROM circuit_elements WHERE id = $1';
        const result = await query(sql, [id]);
        return result.rows[0];
    }
}

module.exports = CircuitModel;

