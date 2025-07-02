import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BrowseList.css';

function BrowseList() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [opportunities, setOpportunities] = useState([]);

  const filters = {
    type: query.get('type') || '',
    mode: query.get('mode') || '',
    category: query.get('category') || '',
    eligibility: query.get('eligibility') || '',
    location: query.get('location') || '',
    tag: query.get('tag') || '',
  };

  useEffect(() => {
    axios.post('http://localhost:5000/api/getalljobs', filters)
      .then(res => setOpportunities(res.data))
      .catch(err => console.error('Axios fetch error:', err));
  }, [location.search]);

  const handleclick = (item) => {
    navigate('/browse/details', { state: { item } });
  };

  return (
    <div className="browse-list">
      {opportunities.map(item => (
        <div
          key={item._id}
          className="browse-card"
          onClick={() => handleclick(item)}
        >
          <span className={`browse-type ${item.type?.toLowerCase()}`}>{item.type}</span>
          <h4>{item.opportunity}</h4>
          <p>{item.company}</p>
          <p>
            {item.last_date
              ? new Date(item.last_date).toLocaleDateString('en-IN')
              : 'No deadline'}
          </p>
          <p>{item.applied || 0} Applied</p>
          <div className="browse-tags">
            {(item.tags || []).map((tag, idx) => (
              <span key={idx} className="browse-tag">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BrowseList;
