import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FilterBar.css';

function FilterBar({ filters }) {
  const navigate = useNavigate();

  const [options, setOptions] = useState({
    type: [],
    mode: [],
    tag: [],
    category: [],
    eligibility: [],
    location: []
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/opportunity/filters')
      .then(res => setOptions(res.data || {}))
      .catch(err => console.error('Failed to load filter options', err));
  }, []);

  const updateURL = (newFilters) => {
    const searchParams = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) searchParams.set(key, val);
    });

    navigate({ pathname: '/browse', search: `?${searchParams.toString()}` });
  };

  const update = (key, val) => {
    const newFilters = { ...filters, [key]: val };
    updateURL(newFilters);
  };

  const clearFilters = () => {
    navigate('/browse');
  };

  return (
    <div className="filter-bar">
      {['type', 'mode', 'category', 'eligibility', 'location', 'tag'].map((field) => (
        <select
          key={field}
          value={filters[field] || ''}
          onChange={(e) => update(field, e.target.value)}
        >
          <option value="">{field.charAt(0).toUpperCase() + field.slice(1)}</option>
          {(options[field] || []).map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
      <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}

export default FilterBar;
