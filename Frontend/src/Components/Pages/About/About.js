import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import './About.css';

function About() {
  const { state } = useUser();
  return (
    <div className="about-wrapper">
      <header className="about-hero">
        <h1>Welcome to JobConnect</h1>
        <p>Your trusted platform for smarter hiring and seamless job searching.</p>
      </header>

      <section className="about-section mission">
        <h2>Our Mission</h2>
        <p>
          At JobConnect, we aim to simplify the recruitment journey by bridging the gap between skilled professionals and innovative companies. Whether you're a job seeker or a recruiter, we offer tools to make your journey efficient, transparent, and human-centered.
        </p>
      </section>

      <section className="about-section features">
        <h2>Comming soon</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="emoji">🔍</span>
            <h3>Smart Search</h3>
            <p>AI-powered job matching for candidates and smart filtering for recruiters.</p>
          </div>
          <div className="feature-card">
            <span className="emoji">📄</span>
            <h3>Resume Tools</h3>
            <p>Build, update, and manage your resumes directly from your dashboard.</p>
          </div>
          <div className="feature-card">
            <span className="emoji">📈</span>
            <h3>Career Insights</h3>
            <p>Stay ahead with market trends, salary insights, and personalized suggestions.</p>
          </div>
          <div className="feature-card">
            <span className="emoji">💼</span>
            <h3>Employer Solutions</h3>
            <p>Post jobs, track applicants, and find the perfect candidate with ease.</p>
          </div>
        </div>
      </section>

      <section className="about-section cta">
        <h2>Your next opportunity starts here.</h2>
        <div className="cta-buttons">
          <Link to='/Browse' className="btn-primary">Browse Job Listings</Link>
          <Link to='/Profile' className="btn-secondary">Upload Your Resume</Link>
          {state.role === 'User' ? (
            <>
              <Link to='/my-registrations' className="btn-primary">Track Applications</Link>
            </>
          ) : (
              <>
                <Link to='/company-registrations' className="btn-primary">Track Applications</Link>
              </>
          )}
        </div>
      </section>


    </div>
  );
}

export default About;
