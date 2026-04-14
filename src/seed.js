const sequelize = require('./models/index');
const Estudiante = require('./models/Estudiante');
const Curso = require('./models/Curso');

async function seed() {
  await sequelize.sync({ force: true });

  await Estudiante.bulkCreate([
    { nombre: 'Carlos', apellido: 'Pérez', email: 'carlos@mail.com', edad: 20, carrera: 'Ingeniería en Sistemas', fechaIngreso: '2023-01-15' },
    { nombre: 'María', apellido: 'López', email: 'maria@mail.com', edad: 22, carrera: 'Ciencias de la Computación', fechaIngreso: '2022-08-10' },
    { nombre: 'José', apellido: 'Méndez', email: 'jose@mail.com', edad: 21, carrera: 'Ingeniería en Sistemas', fechaIngreso: '2023-03-01' }
  ]);

  await Curso.bulkCreate([
    { nombre: 'GraphQL Básico', descripcion: 'Introducción a GraphQL y Apollo', duracionHoras: 40, nivel: 'Principiante', instructor: 'Dr. Ramírez', activo: true },
    { nombre: 'Node.js Avanzado', descripcion: 'Patrones avanzados con Node.js', duracionHoras: 60, nivel: 'Avanzado', instructor: 'Ing. Torres', activo: true },
    { nombre: 'Bases de Datos', descripcion: 'SQL y NoSQL con Sequelize', duracionHoras: 50, nivel: 'Intermedio', instructor: 'Dra. Fuentes', activo: false }
  ]);

  console.log('✅ Datos insertados correctamente');
  process.exit();
}

seed();