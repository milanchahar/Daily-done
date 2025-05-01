import React from 'react';
import '../styles/Sidebar.css';

interface SidebarProps {
  onTagSelect: (tag: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTagSelect }) => {
  const predefinedTags = [
    { name: 'work', color: '#FF6B6B' },
    { name: 'home', color: '#4ECDC4' },
    { name: 'personal', color: '#45B7D1' },
    { name: 'shopping', color: '#96CEB4' },
    { name: 'health', color: '#FFEEAD' },
    { name: 'finance', color: '#D4A5A5' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Search</h3>
        <input type="text" placeholder="Search tasks..." className="search-input" />
      </div>

      <div className="sidebar-section">
        <h3>Quick Filters</h3>
        <div className="filter-options">
          <button className="filter-button">All</button>
          <button className="filter-button">Today</button>
          <button className="filter-button">Completed</button>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Lists</h3>
        <div className="list-options">
          <button className="list-button">Inbox</button>
          <button className="list-button">Today</button>
          <button className="list-button">Upcoming</button>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Tags</h3>
        <div className="tags-container">
          {predefinedTags.map((tag) => (
            <button
              key={tag.name}
              className="tag-button"
              style={{ backgroundColor: tag.color }}
              onClick={() => onTagSelect(tag.name)}
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 