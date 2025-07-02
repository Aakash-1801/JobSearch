import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Navbar.css";
import Dropdown from "./Dropdown";

function Navbar({ onProfileClick, dropdownOpen, setDropdownOpen }) {
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const { state } = useUser();
  
  useEffect(() => {
    const activeLink = navRef.current?.querySelector(".active-link");
    if (activeLink) {
      setUnderlineStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, setDropdownOpen]);

  const profileImage = state.profilePic
    ? state.profilePic.startsWith("/uploads/")
      ? `http://localhost:5000${state.profilePic}`
      : state.profilePic
    : "/profile.png";

  return (
    <nav className="navbar">
      <div className="navbar-left" ref={dropdownRef}>
        {state.loggedIn ? (
          <div
            className="navbar-left"
            onClick={onProfileClick}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onProfileClick()
            }
          >
            <img
              src={profileImage}
              alt="Profile"
              className="profile-pic"
            />
            <span className="profile-name">{state.displayname || 'User'}</span>
            {dropdownOpen && <Dropdown />}
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>

      <div className={`navbar-right ${menuOpen ? "open" : ""}`} ref={navRef}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/Browse"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Browse
        </NavLink>
        <NavLink
          to="/About"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          About
        </NavLink>
        <NavLink
          to="/Support"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Support
        </NavLink>
        <NavLink
          to="/Contact"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </NavLink>
        <span
          className="sliding-underline"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default Navbar;
