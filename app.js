import express from 'express';
import 'dotenv/config';
import router from './src/routes/character.routes.js';

import { sequelize, testConnection } from "./src/config/database.js";
import Character from "./src/models/character.model.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/characters', router)

app.get('/', (req, res) => {
    res.send('API de Dragon Ball funcionando!');
});

sequelize.sync({ alter: true })
.then(() => {
    console.log("Base de Datos y tablas sincronizadas.");
    testConnection();
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
})
.catch(error => {
    console.error("Error al sincronizar la base de datos.", error);
})