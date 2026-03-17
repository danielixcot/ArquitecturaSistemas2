const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

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