import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from './FilterBar';
import BrowseList from './BrowseList';
import './Browse.css';

function Browse() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [filters, setFilters] = useState({
    type: '',
    mode: '',
    category: '',
    eligibility: '',
    location: '',
    tag: ''
  });

  useEffect(() => {
    setFilters({
      type: query.get('type') || '',
      mode: query.get('mode') || '',
      category: query.get('category') || '',
      eligibility: query.get('eligibility') || '',
      location: query.get('location') || '',
      tag: query.get('tag') || ''
    });
  }, [location.search]);

  return (
    <div className="browse-page">
      <div className="browse-container">
        <div className="browse-body">
          <div className="browse-left">
            <FilterBar filters={filters} />
          </div>
          <div className="browse-right">
            <BrowseList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Browse;
