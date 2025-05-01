import React from 'react';
import './Sidebar.css';

function Sidebar({ 
  lists, 
  tags, 
  selectedList, 
  selectedTag, 
  onListSelect,
  onTagSelect,
  onSearch,
  isNightMode,
  onToggleNightMode
}) {
  const handleListClick = (listId) => {
    onListSelect(listId === selectedList ? null : listId);
    onTagSelect(null);
  };

  const handleTagClick = (tagId) => {
    onTagSelect(tagId === selectedTag ? null : tagId);
    onListSelect(null);
  };

  const getTaskCount = (list) => {
    // This is a placeholder. In a real app, we'd pass the count from the parent
    return '0';
  };

  return (
    <aside className={`sidebar ${isNightMode ? 'night-mode' : ''}`}>
      {/* Section 1: Search */}
      <div className="sidebar-search">
        <input 
          type="text" 
          placeholder="Search tasks..." 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Section 2: Priority Matrix */}
      <div className="sidebar-section">
        <h3>Priority Matrix</h3>
        <div className="priority-matrix">
          <div 
            className={`priority-item urgent-important ${selectedList === 'urgent-important' ? 'active' : ''}`}
            onClick={() => handleListClick('urgent-important')}
          >
            <span className="priority-icon">⚡</span>
            <span className="priority-text">Urgent & Important</span>
          </div>
          <div 
            className={`priority-item not-urgent-important ${selectedList === 'not-urgent-important' ? 'active' : ''}`}
            onClick={() => handleListClick('not-urgent-important')}
          >
            <span className="priority-icon">⭐</span>
            <span className="priority-text">Not Urgent & Important</span>
          </div>
          <div 
            className={`priority-item urgent-not-important ${selectedList === 'urgent-not-important' ? 'active' : ''}`}
            onClick={() => handleListClick('urgent-not-important')}
          >
            <span className="priority-icon">⏰</span>
            <span className="priority-text">Urgent & Not Important</span>
          </div>
          <div 
            className={`priority-item not-urgent-not-important ${selectedList === 'not-urgent-not-important' ? 'active' : ''}`}
            onClick={() => handleListClick('not-urgent-not-important')}
          >
            <span className="priority-icon">📌</span>
            <span className="priority-text">Not Urgent & Not Important</span>
          </div>
        </div>
      </div>

      {/* Section 3: Quick Filters */}
      <div className="sidebar-section">
        <h3>Quick Filters</h3>
        <div className="sidebar-filters">
          <div 
            className={`sidebar-filter${selectedList === 'upcoming' ? ' active' : ''}`} 
            onClick={() => handleListClick('upcoming')}
          >
            Upcoming
          </div>
          <div 
            className={`sidebar-filter${selectedList === 'today' ? ' active' : ''}`} 
            onClick={() => handleListClick('today')}
          >
            Today
          </div>
          <div 
            className={`sidebar-filter${selectedList === 'completed' ? ' active' : ''}`} 
            onClick={() => handleListClick('completed')}
          >
            Completed
          </div>
        </div>
      </div>

      {/* Section 4: Lists */}
      <div className="sidebar-section">
        <h3>Lists</h3>
        <ul className="sidebar-list">
          {lists.map(list => (
            <li 
              key={list.id} 
              className={`sidebar-item ${selectedList === list.id ? 'active' : ''}`}
              onClick={() => handleListClick(list.id)}
            >
              <span 
                className="list-color" 
                style={{ backgroundColor: list.color }}
              />
              <span className="list-name">{list.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 5: Tags */}
      <div className="sidebar-section">
        <h3>Tags</h3>
        <ul className="sidebar-list">
          {tags.map(tag => (
            <li 
              key={tag.id} 
              className={`sidebar-item ${selectedTag === tag.id ? 'active' : ''}`}
              onClick={() => handleTagClick(tag.id)}
            >
              <span 
                className="tag-color" 
                style={{ backgroundColor: tag.color }}
              />
              <span className="tag-name">{tag.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="sidebar-bottom-nav">
        <button 
          className="sidebar-nav-btn night-mode-toggle"
          onClick={onToggleNightMode}
        >
          {isNightMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <button className="sidebar-nav-btn">Settings</button>
      </div>
    </aside>
  );
}

export default Sidebar; 