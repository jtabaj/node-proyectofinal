import express from 'express';
import productosRoutes from './productos.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API funcionando correctamente!!!'
    });
});

// Rutas del módulo productos
app.use('/api/productos', productosRoutes);

export default app;