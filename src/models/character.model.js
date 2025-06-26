import { DataTypes } from 'sequelize';

import { sequelize } from '../config/database';


const Character = sequelize.define('Character', {
    [cite_start]
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    [cite_start]
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        [cite_start]unique: true,
    },
    [cite_start]
    ki: {
        [cite_start]type: DataTypes.INTEGER,
        allowNull: false,
    },
    [cite_start]
    gender: {
        [cite_start]type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
    }
    [cite_start]
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName:'characters',
    timestamps: true,
});

export default Character;