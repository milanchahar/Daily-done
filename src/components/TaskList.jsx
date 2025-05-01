import React, { useState } from 'react';
import './TaskList.css';

function TaskList({ tasks, lists, tags, selectedList, selectedTag, searchQuery, setTasks, setSelectedTaskId, isNightMode }) {
  const [newTaskName, setNewTaskName] = useState('');
  const [fadingTaskIds, setFadingTaskIds] = useState(new Set());

  const handleAddTask = (e) => {
    if (e.key === 'Enter' && newTaskName.trim()) {
      const newTask = {
        id: Date.now().toString(),
        name: newTaskName.trim(),
        dueDate: '',
        completed: false,
        list: selectedList || lists[0]?.id,
        tags: [],
        description: '',
        subtasks: []
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setNewTaskName('');
    }
  };

  const handleTaskToggle = (taskId, e) => {
    e.stopPropagation();
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    // Add fade-out effect and remove task after delay
    const task = tasks.find(t => t.id === taskId);
    if (!task.completed) {
      setFadingTaskIds(prev => new Set([...prev, taskId]));
      setTimeout(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        setFadingTaskIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(taskId);
          return newSet;
        });
      }, 500); // Remove after 500ms (matching the CSS transition duration)
    }
  };

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
  };

  const handleTaskDelete = (taskId, e) => {
    e.stopPropagation();
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesList = !selectedList || task.list === selectedList;
    const matchesTag = !selectedTag || task.tags.includes(selectedTag);
    const matchesSearch = !searchQuery || 
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesList && matchesTag && matchesSearch;
  });

  const today = new Date().toISOString().split('T')[0];
  const upcomingTasks = filteredTasks.filter(task => 
    task.dueDate && task.dueDate > today && !task.completed
  );
  const todayTasks = filteredTasks.filter(task => 
    task.dueDate === today && !task.completed
  );

  return (
    <div className={`task-list ${isNightMode ? 'night-mode' : ''}`}>
      <div className="task-list-header">
        <h2>
          {selectedList 
            ? lists.find(l => l.id === selectedList)?.name 
            : selectedTag 
              ? tags.find(t => t.id === selectedTag)?.name 
              : 'All Tasks'}
        </h2>
        <div className="task-stats">
          <span className="today-count">{todayTasks.length} Today</span>
          <span className="upcoming-count">{upcomingTasks.length} Upcoming</span>
        </div>
      </div>
      
      <div className="task-input-container">
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyPress={handleAddTask}
        />
      </div>

      <div className="task-list-content">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''} ${fadingTaskIds.has(task.id) ? 'fade-out' : ''}`}
            onClick={() => handleTaskClick(task.id)}
          >
            <div className="task-item-content">
              <div className="task-header">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={(e) => handleTaskToggle(task.id, e)}
                />
                <h3>{task.name}</h3>
                <button 
                  className="delete-task-button"
                  onClick={(e) => handleTaskDelete(task.id, e)}
                  title="Delete task"
                >
                  ×
                </button>
              </div>
              <p>{task.description}</p>
              {task.dueDate && (
                <span className="due-date">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="task-item-actions">
              <span className={`priority-badge ${task.priority}`}>
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList; 