import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './BrowseDetails.css';

function BrowseDetails() {
  const location = useLocation();
  const job = location.state?.item || null;
  const { state } = useUser(); // Access context
  const loggedIn = state.loggedIn;

  if (!job) {
    return <div className="browse-details">Select an opportunity to view details.</div>;
  }

  const renderSalary = () => {
    const min = job.annual_salary_min;
    const max = job.annual_salary_max;
    if (min == null && max == null) return 'Not Disclosed';
    if (min === 0 && max === 0) return 'Unpaid';
    if (min && max) return `₹${min} – ₹${max}`;
    if (min) return min === 0 ? 'Unpaid' : `₹${min}`;
    return max === 0 ? 'Unpaid' : `₹${max}`;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  return (
    <div className="rappr">
      <div className="browse-details">
        {/* Header */}
        <div className="company-header">
          <div className="logo">
            <img src={job.logo_url || '/amd.png'} alt="Company Logo" />
          </div>
          <div className="company-name">
            <h2>{job.opportunity}</h2>
            <p>{job.company || 'Company not specified'}</p>
          </div>
        </div>

        {/* Description */}
        <div className="company-description">
          <h3>Description</h3>
          <p>{job.description || 'No description provided.'}</p>
        </div>

        {/* Eligibility */}
        <div className="company-description">
          <h3>Eligibility</h3>
          <p>{job.eligibility || 'Not specified.'}</p>
        </div>

        {/* Technologies */}
        {Array.isArray(job.technologies) && job.technologies.length > 0 && (
          <div className="company-description">
            <h3>Technologies Required</h3>
            <div className="tech-tags">
              {job.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="info-card">
          <div className="info-text">
            <p className="info-label">Location</p>
            <p className="info-value">
              {job.location || 'N/A'}
              {job.mode && job.location && job.location !== 'Remote' ? ` (${job.mode})` : ''}
            </p>
          </div>
          <div className="info-icon">
            <img src="/l_ocation.png" alt="Location" />
          </div>
        </div>

        <div className="info-card">
          <div className="info-text">
            <p className="info-label">Salary</p>
            <p className="info-value">{renderSalary()}</p>
          </div>
          <div className="info-icon">
            <img src="/Salary.png" alt="Salary" />
          </div>
        </div>

        <div className="info-card">
          <div className="info-text">
            <p className="info-label">Work Details</p>
            <p className="info-value">
              {job.work_details || 'N/A'}
              {job.duration ? ` | Duration: ${job.duration}` : ''}
            </p>
          </div>
          <div className="info-icon">
            <img src="/work.png" alt="Work Details" />
          </div>
        </div>

        {job.last_date && (
          <div className="info-card">
            <div className="info-text">
              <p className="info-label">Last Date to Apply</p>
              <p className="info-value">{formatDate(job.last_date)}</p>
            </div>
            <div className="info-icon">
              <img src="/Clndr.png" alt="Deadline" />
            </div>
          </div>
        )}

        {job.contact_email && (
          <div className="info-card">
            <div className="info-text">
              <p className="info-label">Contact Email</p>
              <p className="info-value">{job.contact_email}</p>
            </div>
            <div className="info-icon">
              <img src="/email.png" alt="Email" />
            </div>
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          {loggedIn ? (
            <Link
              to="/Register"
              state={{ opportunity: job.opportunity }}
              className="apply-btn"
            >
              Apply Now
            </Link>
          ) : (
            <Link to="/login" className="apply-btn">
              Login to apply
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseDetails;
