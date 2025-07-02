import React from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Dropdown.css';

function Dropdown() {
  const { state, dispatch } = useUser();
  const navigate = useNavigate();

  const goTo = (path) => () => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    sessionStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className='sub-menu-wrap'>
      <div className='sub-menu'>
        <div className='user-info'>
          <img src={state.profilePic ? `http://localhost:5000${state.profilePic}` : 'profile.png'} alt='User' />
          <h2>{state.displayname || 'User'}</h2>
        </div>
        <hr />

        <button type="button" className="sub-menu-link" onClick={goTo('/Profile')}>
          <img src="/coll.png" alt="Profile" />
          <p>My Profile</p>
          <span>&gt;</span>
        </button>

        {state.role === 'User' ? (
          <>
            <button type="button" className="sub-menu-link" onClick={goTo('/Browse')}>
              <img src="/info.png" alt="Browse" />
              <p>Browse</p>
              <span>&gt;</span>
            </button>
            <button type="button" className="sub-menu-link" onClick={goTo('/my-registrations')}>
              <img src="/regi.png" alt="My Registrations" />
              <p>My Registrations</p>
              <span>&gt;</span>
            </button>
          </>
        ) : (
          <>
            <button type="button" className="sub-menu-link" onClick={goTo('/Postjob')}>
              <img src="/Adidas-Logo-1949.jpg" alt="Post Job" />
              <p>Post a Job</p>
              <span>&gt;</span>
            </button>
            <button type="button" className="sub-menu-link" onClick={goTo('/company-registrations')}>
              <img src="/regi.png" alt="Company Registrations" />
              <p>Company Registrations</p>
              <span>&gt;</span>
            </button>
          </>
        )}

        <button type="button" className="sub-menu-link logout-btn" onClick={handleLogout}>
          <img src="/logout.png" alt="Logout" />
          <p>Log Out</p>
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
