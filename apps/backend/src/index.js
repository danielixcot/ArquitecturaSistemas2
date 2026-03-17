const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const tasksRoutes = require("./routes/tasks.routes");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/tasks", tasksRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});