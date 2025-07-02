import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Register.css';

function Register() {
  const { state } = useUser();
  const email = state.email;
  const loggedIn = state.loggedIn;

  const location = useLocation();
  const opportunity = location.state?.opportunity || "N/A";

  const [formData, setFormData] = useState({
    fullName: '',
    email: email,
    phone: '',
    gender: '',
    type: '',
    institute: '',
    course: '',
    branch: '',
    cgpa: '',
    opportunity: opportunity,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        form.append(key, value);
      }
    });
    const token = sessionStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/registration', {
        method: 'POST',
        headers: {'Authorization': `Bearer ${token}`},
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Registration successful!');
      } else {
        alert(data.message || 'Something went wrong during registration.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Failed to register due to network/server error.');
    }
  };

  return (
    <div className="register-container">
      {!loggedIn ? (
        <h2>Please log in</h2>
      ) : (
        <>
          <h1 className="register-heading">Registration Form</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Full Name" className="register-input" required onChange={handleChange} />
            <input type="email" name="email" value={formData.email} className="register-input" readOnly />
            <input type="tel" name="phone" placeholder="Phone Number" className="register-input" required onChange={handleChange} />
            
            <select name="gender" className="register-input" required onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <select name="type" className="register-input" required onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Recent Graduate">Recent Graduate</option>
              <option value="Fresher">Fresher</option>
            </select>

            <input type="text" name="institute" placeholder="Enter Your college name" className="register-input" required onChange={handleChange} />

            <select name="course" className="register-input" required onChange={handleChange}>
              <option value="">Select Course</option>
              <option value="B.Tech/BE">B.Tech/BE</option>
              <option value="M.Tech/ME">M.Tech/ME</option>
              <option value="PHD">PHD</option>
              <option value="MBA">MBA</option>
              <option value="MBBS">MBBS</option>
              <option value="MS/MD">MS/MD</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Sc">M.Sc</option>
              <option value="LLB">LLB</option>
              <option value="LLM">LLM</option>
              <option value="Other">Other</option>
            </select>

            <input type="text" name="branch" placeholder="Branch" className="register-input" required onChange={handleChange} />
            <input type="number" step="0.01" name="cgpa" placeholder="CGPA" className="register-input" required onChange={handleChange} />

            <label className="resume-up">Upload Resume (PDF/DOC):</label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" required onChange={handleChange} />

            <div className="checkbox-wrapper-12">
              <div className="cbx">
                <input type="checkbox" id="cbx-12" required />
                <label htmlFor="cbx-12"></label>
                <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>

              <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="goo-12">
                    <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic" />
                    <feColorMatrix result="goo-12" in="blur" type="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" />
                    <feBlend in="SourceGraphic" in2="goo-12" />
                  </filter>
                </defs>
              </svg>

              <div>
                <label htmlFor="cbx-12" className="checkbox-label">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            <button type="submit" className="register-button">
              Register
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Register;
