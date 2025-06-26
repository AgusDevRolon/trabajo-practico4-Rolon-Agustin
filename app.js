import { sequelize, testConnection } from "./src/config/database";
import Character from "./src/models/character.model";

sequelize.sync({ alter: true })
.then(() => {
    console.log("Base de Datos y tablas sincronizadas.");
})
.catch(error => {
    console.error("Error al sincronizar la base de datos.", error);
})