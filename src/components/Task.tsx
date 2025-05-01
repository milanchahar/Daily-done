import React from 'react';
import { Task as TaskType } from '../types';

interface TaskProps {
  task: TaskType;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="task-checkbox"
      />
      <span className={`task-content ${task.completed ? 'completed' : ''}`}>
        {task.content}
      </span>
      <button 
        onClick={() => onDelete(task.id)}
        className="delete-task-button"
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  );
};

export default Task; 