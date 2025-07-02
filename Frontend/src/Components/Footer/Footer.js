import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Support">Support</Link>
          <Link to="/Contact">Contact</Link>
        </div>

        <div className="footer-socials">
            <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="24" height="24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-1.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
                </svg>
            </a>
            <a
                href="https://www.facebook.com/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="1.5" d="M15.117 8.084h-1.748v-1.73c0-.5.344-.62.56-.62h1.18V4.239l-1.616-.007c-2.33 0-2.978 1.745-2.978 2.892v1.46H9.604v2.355h1.511V20h2.302v-9.561h1.63l.259-2.355z"/>
                </svg>
            </a>
            <a
                href="https://www.linkedin.com/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v14H0V8zm7 0h4.75v2.18h.07c.66-1.25 2.27-2.56 4.67-2.56 5 0 5.92 3.3 5.92 7.59V22h-5v-6.3c0-1.5-.03-3.43-2.09-3.43-2.1 0-2.42 1.63-2.42 3.33V22h-5V8z"/>
                </svg>
            </a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} YourCompanyName. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
