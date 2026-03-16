const express = require("express");

const router = express.Router();

let tasks = [
  { id: 1, title: "Comprar pan", completed: false },
  { id: 2, title: "Hacer tarea de arquitectura", completed: true }
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Tarea no encontrada"
    });
  }

  res.json(task);
});

router.post("/", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "El campo title es obligatorio"
    });
  }

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: completed ?? false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const taskIndex = tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Tarea no encontrada"
    });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title ?? tasks[taskIndex].title,
    completed: completed ?? tasks[taskIndex].completed
  };

  res.json(tasks[taskIndex]);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Tarea no encontrada"
    });
  }

  const deletedTask = tasks[taskIndex];
  tasks = tasks.filter((item) => item.id !== id);

  res.json({
    message: "Tarea eliminada correctamente",
    task: deletedTask
  });
});

module.exports = router;