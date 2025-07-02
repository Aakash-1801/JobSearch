import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pop.css";

function Popular({quickFilters = [], filtertype}) {
  const navigate = useNavigate();

  const handleQuickFilterClick = (tag) => {
    navigate(`/browse?${filtertype}=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="quick-filter-section">
      <div className="quick-filter-container">
        {quickFilters.map((filter) => (
          <button
            key={filter.value}
            className="quick-filter-button"
            onClick={() => handleQuickFilterClick(filter.value)}
          >
            <span className="quick-filter-icon">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Popular;
