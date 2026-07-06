import * as productosModel from './productos.model.js';


export const obtenerProductos = async (req, res) => {
    try {
        const productos = await productosModel.obtenerProductos();

        res.json(productos);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener productos: " + error.message
        });
    }
};

export const obtenerProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await productosModel.obtenerProducto(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const crearProducto = async (req, res) => {
    try {
        const producto = await productosModel.crearProducto(req.body);

        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productosModel.actualizarProducto(id, req.body);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productosModel.eliminarProducto(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            id: producto.id,
            ...producto,
            mensaje: 'Producto eliminado'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};