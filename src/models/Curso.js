const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Curso = sequelize.define('Curso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING
  },
  duracionHoras: {
    type: DataTypes.INTEGER
  },
  nivel: {
    type: DataTypes.STRING
  },
  instructor: {
    type: DataTypes.STRING
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Curso;
