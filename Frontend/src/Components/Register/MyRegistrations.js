import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import "./Myreg.css";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useUser();
  const token = state.token;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/my-registrations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch registrations");

        const data = await res.json();
        setRegistrations(data);
      } catch (error) {
        console.error("Error:", error);
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [token]);

  if (loading) return <p className="my-registrations">Loading your registrations...</p>;

  if (registrations.length === 0) {
    return <p className="my-registrations">You have not registered for any opportunities yet.</p>;
  }

  return (
    <div className="my-registrations">
      <h2>My Registrations</h2>
      <ul className="registration-list">
        {registrations.map((reg) => (
          <li key={reg._id} className="registration-item">
            <h3>{reg.opportunity}</h3>
            <p><strong>Course:</strong> {reg.course}</p>
            <p><strong>Institute:</strong> {reg.institute}</p>
            <p><strong>Branch:</strong> {reg.branch}</p>
            <p><strong>Phone:</strong> {reg.phone}</p>
            <p><strong>CGPA:</strong> {reg.cgpa}</p>
            <p><strong>Type:</strong> {reg.type}</p>
            <a
              href={`http://localhost:5000/${reg.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link"
            >
              View Resume
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyRegistrations;
