import React from 'react';
import './Support.css';
import Accordion from './Accordion';

function Support() {
  const jobSeekerFAQs = [
    { question: "How do I apply for a job?", answer: "Log in, browse listings, and click Apply on your desired job." },
    { question: "How can I update my resume?", answer: "Go to your profile and upload a new resume under Resume section." },
    { question: "I didn’t receive a confirmation email.", answer: "Check your spam folder or update your email in settings." }
  ];

  const employerFAQs = [
    { question: "How do I post a job?", answer: "Log in as an employer and click on 'Post a Job' from the dashboard." },
    { question: "How to manage applicants?", answer: "Go to the job post and click 'View Applicants' to manage responses." }
  ];

  return (
    <div className="support-container">
      <h1>Support Center</h1>
      <input
        className="support-search"
        type="text"
        placeholder="Search support topics..."
      />

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <h3>For Job Seekers</h3>
        {jobSeekerFAQs.map((faq, index) => (
          <Accordion key={index} question={faq.question} answer={faq.answer} />
        ))}

        <h3>For Employers</h3>
        {employerFAQs.map((faq, index) => (
          <Accordion key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <div className="contact-form">
        <h2>Still need help? Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email Address" required />
          <select required>
            <option value="">Issue Category</option>
            <option value="login">Login Problem</option>
            <option value="resume">Resume Upload</option>
            <option value="application">Application Status</option>
            <option value="other">Other</option>
          </select>
          <textarea placeholder="Describe your issue..." rows="5" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Support;
