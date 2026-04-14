const { ApolloServer } = require('apollo-server');
const sequelize = require('./src/models/index');
const typeDefs = require('./src/typeDefs');
const resolvers = require('./src/resolvers');

require('./src/models/Estudiante');
require('./src/models/Curso');

async function startServer() {
  await sequelize.sync();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
  });

  const { url } = await server.listen({ port: 4000 });
  console.log(` Servidor corriendo en: ${url}`);
}

startServer();