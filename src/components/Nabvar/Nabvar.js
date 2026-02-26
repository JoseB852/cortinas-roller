import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nabvar.css';

const Nabvar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);

  const location = useLocation();
  const solidRoutes = [
    "/",
    "/catalog",
    "/us",
    "/contact",
    "/comercial",
    "/residencial",
    "/card"
  ];
  
  const isSolid = solidRoutes.includes(location.pathname);



  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Bajando
        setIsVisible(false);
      } else {
        // Subiendo
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    
    <nav
    className={`custom-navbar 
    ${isSolid ? 'navbar-solid' : 'navbar-glass'}
    ${isVisible ? '' : 'navbar-hidden'} 
    ${searchOpen ? 'expanded' : ''}
    ${menuOpen ? 'menu-open' : ''}`}
  >
      <div className="navbar-container">
        <Link to="/">
          <img src="/images/logo2.jpg" alt="Roller" className="navbar-logo" />
        </Link>

        <ul className="navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalog">Catalogo</Link></li>
          <li><Link to="/us">Nosotros</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
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

      <div className="mobile-menu">
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/catalog" onClick={() => setMenuOpen(false)}>Catalogo</Link>
        <Link to="/us" onClick={() => setMenuOpen(false)}>Nosotros</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contacto</Link>
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="What can we help you find?" />
      </div>
    </nav>
  );
};

export default Nabvar;