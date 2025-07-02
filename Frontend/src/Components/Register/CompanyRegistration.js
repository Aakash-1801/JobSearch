import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import './CompanyRegistrations.css';

function CompanyRegistrations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useUser();
  const token = state.token;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/company-registrations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (res.ok) {
          setData(result);
        } else {
          alert(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching registrations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [token]);

  if (loading) return <p className="loading">Loading registrations...</p>;

  return (
    <div className="company-registrations">
      <h2>📋 Registrations by Opportunity</h2>
      {data.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        data.map((item, index) => (
          <div key={index} className="opportunity-block">
            <h3>{item.opp} <span>({item.size})</span></h3>
            {item.regist.length > 0 ? (
              <table className="registration-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Institute</th>
                    <th>Course</th>
                    <th>CGPA</th>
                    <th>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {item.regist.map((reg, i) => (
                    <tr key={i}>
                      <td>{reg.fullName}</td>
                      <td>{reg.email}</td>
                      <td>{reg.phone}</td>
                      <td>{reg.institute}</td>
                      <td>{reg.course}</td>
                      <td>{reg.cgpa ?? 'N/A'}</td>
                      <td>
                        {reg.resume ? (
                          <a href={`http://localhost:5000/${reg.resume}`} target="_blank" rel="noopener noreferrer">
                            📄 View
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No registrations for this opportunity.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CompanyRegistrations;
