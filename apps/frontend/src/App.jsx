import { useEffect, useState } from "react";
import "./index.css";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await createTask({
        title,
        completed: false
      });

      setTitle("");
      await loadTasks();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      await updateTask(task.id, {
        completed: !task.completed
      });

      await loadTasks();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div className="container">
      <h1>Lista de tareas</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      {loading ? (
        <p>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span
                onClick={() => handleToggleTask(task)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer"
                }}
              >
                {task.title}
              </span>

              <div>
                <button onClick={() => handleToggleTask(task)}>
                  {task.completed ? "Desmarcar" : "Completar"}
                </button>
                
                <button onClick={() => handleDeleteTask(task.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;