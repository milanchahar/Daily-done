import React, { useState, useEffect } from 'react';
import './TaskEditor.css';

function TaskEditor({ task, lists, tags, setTasks, isNightMode }) {
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newSubtaskName, setNewSubtaskName] = useState('');

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
      setIsEditing(false);
    }
  }, [task]);

  if (!task || !editedTask) {
    return (
      <div className={`task-editor ${isNightMode ? 'night-mode' : ''}`}>
        <div className="task-editor-empty">
          <p>Select a task to edit or create a new one</p>
        </div>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setEditedTask(prev => ({ ...prev, [field]: value }));
    setIsEditing(true);
  };

  const handleSave = () => {
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === editedTask.id ? editedTask : t)
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(t => t.id !== editedTask.id));
    }
  };

  const handleAddTag = () => {
    const tagName = prompt('Enter tag name:');
    if (tagName && tagName.trim()) {
      const existingTag = tags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
      if (existingTag) {
        if (!editedTask.tags.includes(existingTag.id)) {
          setEditedTask(prev => ({
            ...prev,
            tags: [...prev.tags, existingTag.id]
          }));
          setIsEditing(true);
        }
      } else {
        const newTag = {
          id: Date.now().toString(),
          name: tagName.trim(),
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        };
        setEditedTask(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.id]
        }));
        setIsEditing(true);
      }
    }
  };

  const handleRemoveTag = (tagId) => {
    setEditedTask(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagId)
    }));
    setIsEditing(true);
  };

  const handleAddSubtask = () => {
    const subtaskName = prompt('Enter subtask name:');
    if (subtaskName && subtaskName.trim()) {
      const newSubtask = {
        id: Date.now().toString(),
        name: subtaskName.trim(),
        completed: false
      };
      setEditedTask(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, newSubtask]
      }));
      setIsEditing(true);
    }
  };

  const handleSubtaskToggle = (subtaskId) => {
    setEditedTask(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(sub => 
        sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
      )
    }));
    setIsEditing(true);
  };

  const handleSubtaskDelete = (subtaskId) => {
    setEditedTask(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(sub => sub.id !== subtaskId)
    }));
    setIsEditing(true);
  };

  return (
    <div className={`task-editor ${isNightMode ? 'night-mode' : ''}`}>
      <div className="task-editor-header">
        <h2>Edit Task</h2>
      </div>
      <div className="task-editor-content">
        <div className="form-group">
          <label htmlFor="title">Title</label>
        <input 
            type="text"
            id="title"
            name="title"
          value={editedTask.name} 
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
      <textarea 
            id="description"
            name="description"
        value={editedTask.description} 
        onChange={(e) => handleChange('description', e.target.value)}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={editedTask.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
          >
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={editedTask.completed}
            onChange={(e) => handleChange('completed', e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="list">List</label>
          <select 
            id="list"
            name="list"
            value={editedTask.list} 
            onChange={(e) => handleChange('list', e.target.value)}
            style={{ 
              backgroundColor: lists.find(l => l.id === editedTask.list)?.color + '20',
              borderColor: lists.find(l => l.id === editedTask.list)?.color
            }}
          >
            {lists.map(list => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </select>
      </div>
      <div className="task-editor-tags">
        <label>Tags:</label>
        <div className="task-editor-tag-list">
          {editedTask.tags.map(tagId => {
            const tag = tags.find(t => t.id === tagId);
            return tag ? (
              <span key={tag.id} className="task-editor-tag" style={{ backgroundColor: tag.color + '20', borderColor: tag.color }}>
                {tag.name}
                <button 
                  className="tag-remove-btn"
                  onClick={() => handleRemoveTag(tag.id)}
                >×</button>
              </span>
            ) : null;
          })}
        </div>
        <button 
          className="task-editor-add-tag" 
          onClick={handleAddTag}
        >+ Add Tag</button>
      </div>
      <div className="task-editor-subtasks">
        <label>Subtasks:</label>
        <ul>
          {editedTask.subtasks.map(sub => (
            <li key={sub.id} className="subtask-item">
              <input 
                type="checkbox" 
                checked={sub.completed} 
                onChange={() => handleSubtaskToggle(sub.id)}
              /> 
              <span className={sub.completed ? 'completed' : ''}>{sub.name}</span>
              <button 
                className="subtask-delete-btn"
                onClick={() => handleSubtaskDelete(sub.id)}
              >×</button>
            </li>
          ))}
        </ul>
        <button 
          className="task-editor-add-subtask" 
          onClick={handleAddSubtask}
        >+ Add Subtask</button>
        </div>
      </div>
      <div className="task-editor-actions">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button 
          className={`save-button ${isEditing ? 'active' : ''}`} 
          onClick={handleSave}
          disabled={!isEditing}
        >Save</button>
      </div>
    </div>
  );
}

export default TaskEditor; 