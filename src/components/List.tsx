import React, { useState } from 'react';
import Task from './Task';
import { Task as TaskType } from '../types';

interface ListProps {
  title: string;
  tasks: TaskType[];
  onAddTask: (content: string, completed: boolean) => void;
  onToggleTaskComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const List: React.FC<ListProps> = ({ title, tasks, onAddTask, onToggleTaskComplete, onDeleteTask }) => {
  const [newTaskContent, setNewTaskContent] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskContent.trim()) {
      onAddTask(newTaskContent.trim(), isCompleted);
      setNewTaskContent('');
      setIsCompleted(false);
    }
  };

  return (
    <div className="list">
      <h2>{title}</h2>
      <form onSubmit={handleAddTask} className="add-task-form">
        <div className="task-input-container">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            className="task-checkbox"
          />
          <input
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            placeholder="Add a new task..."
            className="task-input"
          />
        </div>
        <button type="submit" className="add-task-button">Add</button>
      </form>
      <div className="tasks">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleComplete={onToggleTaskComplete}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default List; 