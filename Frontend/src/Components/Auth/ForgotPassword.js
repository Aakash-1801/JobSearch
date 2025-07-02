import React, { useState } from 'react';
import './Login.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Reset link sent to your email!');
      } else {
        alert(data.message || 'Reset failed');
      }
    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Company">Company</option>
        </select>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
