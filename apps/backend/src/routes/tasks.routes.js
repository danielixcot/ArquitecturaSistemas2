const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: "asc"
      }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las tareas",
      error: error.message
    });
  }
});

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada"
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la tarea",
      error: error.message
    });
  }
});

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos inválidos
 */
router.post("/", async (req, res) => {
  try {
    const { title, completed } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "El campo title es obligatorio"
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        completed: completed ?? false
      }
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la tarea",
      error: error.message
    });
  }
});

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 */
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Tarea no encontrada"
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title ?? existingTask.title,
        completed: completed ?? existingTask.completed
      }
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la tarea",
      error: error.message
    });
  }
});

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Tarea no encontrada"
      });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({
      message: "Tarea eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la tarea",
      error: error.message
    });
  }
});

module.exports = router;