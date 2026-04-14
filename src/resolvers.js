const Estudiante = require('./models/Estudiante');
const Curso = require('./models/Curso');

const resolvers = {
  Query: {
    estudiantes: async () => await Estudiante.findAll(),
    estudiante: async (_, { id }) => await Estudiante.findByPk(id),
    cursos: async () => await Curso.findAll(),
    curso: async (_, { id }) => await Curso.findByPk(id)
  }
};

module.exports = resolvers;