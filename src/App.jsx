import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import TaskList from './components/TaskList.jsx';
import TaskEditor from './components/TaskEditor.jsx';
import './App.css';

function App() {
  const [isNightMode, setIsNightMode] = useState(() => {
    const savedMode = localStorage.getItem('nightMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const savedWidth = localStorage.getItem('sidebarWidth');
    return savedWidth ? parseInt(savedWidth) : 280;
  });

  const [editorWidth, setEditorWidth] = useState(() => {
    const savedWidth = localStorage.getItem('editorWidth');
    return savedWidth ? parseInt(savedWidth) : 400;
  });

  const [isResizing, setIsResizing] = useState(false);
  const [resizeType, setResizeType] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('lists');
    return savedLists ? JSON.parse(savedLists) : [
      { id: '1', name: 'Personal', color: '#6C5CE7' },
      { id: '2', name: 'Work', color: '#00B894' },
      { id: '3', name: 'Shopping', color: '#FD79A8' },
      { id: '4', name: 'Health', color: '#FDCB6E' },
      { id: '5', name: 'Education', color: '#00CEC9' }
    ];
  });

  const [tags, setTags] = useState(() => {
    const savedTags = localStorage.getItem('tags');
    return savedTags ? JSON.parse(savedTags) : [
      { id: '1', name: 'Urgent', color: '#FF7675' },
      { id: '2', name: 'Important', color: '#6C5CE7' },
      { id: '3', name: 'Low Priority', color: '#00B894' },
      { id: '4', name: 'In Progress', color: '#FDCB6E' },
      { id: '5', name: 'Completed', color: '#00CEC9' }
    ];
  });

  const [selectedList, setSelectedList] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem('sidebarWidth', sidebarWidth);
    localStorage.setItem('editorWidth', editorWidth);
  }, [sidebarWidth, editorWidth]);

  useEffect(() => {
    localStorage.setItem('nightMode', JSON.stringify(isNightMode));
    document.documentElement.setAttribute('data-theme', isNightMode ? 'dark' : 'light');
  }, [isNightMode]);

  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  const handleMouseDown = (type) => (e) => {
    setIsResizing(true);
    setResizeType(type);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const containerWidth = document.querySelector('.app').offsetWidth;
    const mouseX = e.clientX;

    if (resizeType === 'sidebar') {
      const newWidth = Math.max(200, Math.min(400, mouseX));
      setSidebarWidth(newWidth);
    } else if (resizeType === 'editor') {
      const newWidth = Math.max(300, Math.min(600, containerWidth - mouseX));
      setEditorWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeType(null);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className={`app ${isNightMode ? 'night-mode' : ''}`}>
      <div className="sidebar-container" style={{ width: sidebarWidth }}>
        <Sidebar
          lists={lists}
          tags={tags}
          selectedList={selectedList}
          selectedTag={selectedTag}
          onListSelect={setSelectedList}
          onTagSelect={setSelectedTag}
          onSearch={setSearchQuery}
          isNightMode={isNightMode}
          onToggleNightMode={() => setIsNightMode(!isNightMode)}
        />
      </div>
      <div 
        className="resize-handle resize-handle-sidebar"
        onMouseDown={handleMouseDown('sidebar')}
      />
      <div className="task-list-container">
        <TaskList
          tasks={tasks}
          lists={lists}
          tags={tags}
          selectedList={selectedList}
          selectedTag={selectedTag}
          searchQuery={searchQuery}
          setTasks={setTasks}
          setSelectedTaskId={setSelectedTaskId}
          isNightMode={isNightMode}
        />
      </div>
      <div 
        className="resize-handle resize-handle-editor"
        onMouseDown={handleMouseDown('editor')}
      />
      <div className="editor-container" style={{ width: editorWidth }}>
        <TaskEditor
          task={selectedTask}
          lists={lists}
          tags={tags}
          setTasks={setTasks}
          isNightMode={isNightMode}
        />
      </div>
    </div>
  );
}

export default App; 