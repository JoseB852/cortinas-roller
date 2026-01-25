import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nabvar.css';

const Nabvar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`custom-navbar 
      ${isVisible ? '' : 'navbar-hidden'} 
      ${searchOpen ? 'expanded' : ''}
      ${menuOpen ? 'menu-open' : ''}`}
    >
      {/* HEADER */}
      <div className="navbar-container">
        <Link to="/">
          <img src="/images/logo.jpg" alt="Roller" className="navbar-logo" />
        </Link>

        <ul className="navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="navbar-actions">
          <button
            className="search-btn"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <button
            className={`hamburger-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="mobile-menu">
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link>
        <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>

      {/* SEARCH */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="What can we help you find?"
        />
      </div>
    </nav>
  );
};

export default Nabvar;
