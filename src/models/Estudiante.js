const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Estudiante = sequelize.define('Estudiante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER
  },
  carrera: {
    type: DataTypes.STRING
  },
  fechaIngreso: {
    type: DataTypes.STRING
  }
});

module.exports = Estudiante;
