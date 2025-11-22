const CircuitModel = require('../models/CircuitModel');

/**
 * Controller para manejar el circuito integral
 */
class CircuitController {
    /**
     * Mostrar circuito integral
     */
    static async mostrarCircuito(req, res) {
        try {
            // Verificar cookie de admin
            const adminSession = req.cookies && req.cookies.adminSession === 'true';
            
            // Obtener datos del circuito desde BD
            const panels = await CircuitModel.getAllPanels();
            const elements = await CircuitModel.getAllElements();
            const connections = await CircuitModel.getAllConnections();
            
            res.render('pages/circuito', {
                panels,
                elements,
                connections,
                adminSession: adminSession || false
            });
        } catch (error) {
            console.error('Error al mostrar circuito:', error);
            res.status(500).render('pages/error', {
                mensaje: 'Error al cargar el circuito',
                error: process.env.NODE_ENV === 'development' ? error.message : null
            });
        }
    }

    /**
     * Obtener todos los elementos (API)
     */
    static async obtenerElementos(req, res) {
        try {
            const elements = await CircuitModel.getAllElements();
            res.json({ success: true, elements });
        } catch (error) {
            console.error('Error al obtener elementos:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Crear un nuevo elemento (API)
     */
    static async crearElemento(req, res) {
        try {
            const element = await CircuitModel.createElement(req.body);
            res.json({ success: true, element });
        } catch (error) {
            console.error('Error al crear elemento:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Actualizar un elemento (API)
     */
    static async actualizarElemento(req, res) {
        try {
            const { elementId } = req.params;
            const element = await CircuitModel.updateElement(elementId, req.body);
            res.json({ success: true, element });
        } catch (error) {
            console.error('Error al actualizar elemento:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Eliminar un elemento (API)
     */
    static async eliminarElemento(req, res) {
        try {
            const { elementId } = req.params;
            await CircuitModel.deleteElement(elementId);
            res.json({ success: true });
        } catch (error) {
            console.error('Error al eliminar elemento:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Obtener todas las conexiones (API)
     */
    static async obtenerConexiones(req, res) {
        try {
            const connections = await CircuitModel.getAllConnections();
            res.json({ success: true, connections });
        } catch (error) {
            console.error('Error al obtener conexiones:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Crear una conexión (API)
     */
    static async crearConexion(req, res) {
        try {
            // Necesitamos obtener los IDs internos de los elementos
            const fromElement = await CircuitModel.getElementByElementId(req.body.from_element_id);
            const toElement = await CircuitModel.getElementByElementId(req.body.to_element_id);
            
            if (!fromElement || !toElement) {
                return res.status(400).json({ success: false, error: 'Elementos no encontrados' });
            }

            const connection = await CircuitModel.createConnection({
                ...req.body,
                from_element_id: fromElement.id,
                to_element_id: toElement.id
            });
            res.json({ success: true, connection });
        } catch (error) {
            console.error('Error al crear conexión:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Actualizar una conexión (API)
     */
    static async actualizarConexion(req, res) {
        try {
            const { connectionId } = req.params;
            const connection = await CircuitModel.updateConnection(connectionId, req.body);
            res.json({ success: true, connection });
        } catch (error) {
            console.error('Error al actualizar conexión:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    /**
     * Eliminar una conexión (API)
     */
    static async eliminarConexion(req, res) {
        try {
            const { connectionId } = req.params;
            await CircuitModel.deleteConnection(connectionId);
            res.json({ success: true });
        } catch (error) {
            console.error('Error al eliminar conexión:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = CircuitController;

