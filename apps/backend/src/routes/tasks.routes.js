const express = require("express");

const router = express.Router();

let tasks = [
  { id: 1, title: "Comprar pan", completed: false },
  { id: 2, title: "Hacer tarea de arquitectura", completed: true }
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "El campo title es obligatorio"
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: completed ?? false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

module.exports = router;