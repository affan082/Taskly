function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card d-flex align-items-center gap-3 ${task.done ? "done" : ""}`}>
      <button
        className={`check-circle ${task.done ? "checked" : ""}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? "Mark incomplete" : "Mark complete"}
      />
      <div className="flex-grow-1">
        <span className="task-text">{task.text}</span>
        <span className="task-date">{task.createdAt}</span>
      </div>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        
      >
        &times;
      </button>
    </div>
  );
}

export default TaskCard;
