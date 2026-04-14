const { gql } = require('apollo-server');

const typeDefs = gql`
  type Estudiante {
    id: ID
    nombre: String
    apellido: String
    email: String
    edad: Int
    carrera: String
    fechaIngreso: String
  }

  type Curso {
    id: ID
    nombre: String
    descripcion: String
    duracionHoras: Int
    nivel: String
    instructor: String
    activo: Boolean
  }

  type Query {
    estudiantes: [Estudiante]
    estudiante(id: ID!): Estudiante
    cursos: [Curso]
    curso(id: ID!): Curso
  }
`;

module.exports = typeDefs;
