const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task List API",
      version: "1.0.0",
      description: "API para gestionar tareas"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            title: {
              type: "string",
              example: "Hacer tarea de arquitectura"
            },
            completed: {
              type: "boolean",
              example: false
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-16T12:00:00.000Z"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-16T12:00:00.000Z"
            }
          }
        },
        TaskInput: {
          type: "object",
          required: ["title"],
          properties: {
            title: {
              type: "string",
              example: "Comprar víveres"
            },
            completed: {
              type: "boolean",
              example: false
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;