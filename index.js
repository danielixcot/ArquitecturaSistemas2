const { ApolloServer } = require('apollo-server');
const sequelize = require('./src/models/index');
const typeDefs = require('./src/typeDefs');
const resolvers = require('./src/resolvers');

require('./src/models/Estudiante');
require('./src/models/Curso');

async function startServer() {
  await sequelize.sync();

  // Seed automático si no hay datos
  const Estudiante = require('./src/models/Estudiante');
  const count = await Estudiante.count();
  if (count === 0) {
    require('child_process').execSync('node src/seed.js');
    console.log('Seed ejecutado');
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
  });

  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`Servidor corriendo en: ${url}`);
}

startServer();