import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    const newTask = {
      id: Date.now(),
      text,
      done: false,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.done));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "pending") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = total - done;

  return (
    <div className="app-wrapper">
      <div className="container py-5" style={{ maxWidth: 640 }}>

        <div className="mb-4 app-header">
          <h1 className="app-title">My Tasks</h1>
          <p className="app-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-4">
            <div className="stat-card">
              <div className="stat-label">Total</div>
              <div className="stat-value">{total}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="stat-card">
              <div className="stat-label">Completed</div>
              <div className="stat-value text-success">{done}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="stat-card">
              <div className="stat-label">Pending</div>
              <div className="stat-value text-warning">{pending}</div>
            </div>
          </div>
        </div>

        <div className="add-row mb-3 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className="btn btn-primary px-4" onClick={addTask}>
            Add
          </button>
        </div>

        <div className="d-flex gap-2 mb-4 flex-wrap">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          {done > 0 && (
            <button className="filter-btn clear-btn ms-auto" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>

        <div className="task-list">
          {filtered.length === 0 ? (
            <div className="empty-state">
              {filter === "completed"
                ? "No completed tasks yet."
                : filter === "pending"
                ? "No pending tasks. Great job!"
                : "No tasks yet. Add one above!"}
            </div>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
