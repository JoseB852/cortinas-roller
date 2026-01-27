import React, { useState, useEffect, useRef } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-container" ref={menuRef}>
      
      {/* VERSIÓN MOBILE */}
      <div className="menu">
        <ul 
          className={`menu-list ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <li className="menu-main">
            <span>Residencial</span>
            <span className={`chevron-icon ${open ? "open" : "closed"}`}></span>
          </li>
        </ul>

        {/* PANEL DEBAJO */}
        <div className={`submenu-panel ${open ? "open" : ""}`}>
          <ul className="submenu-list">
            <li className="submenu-item">
              <NavLink 
                to="/card" 
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                Residencia
              </NavLink>
            </li>

            <li className="submenu-item">
              <NavLink 
                to="/comercial" 
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                Comercial
              </NavLink>
            </li>

            <li className="submenu-item">
              <NavLink 
                to="/hospitality" 
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                Infantil
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* VERSIÓN DESKTOP */}
      <ul className="menu-desktop">
        <li className="menu-item">
          <NavLink 
            to="/card" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Residencia
          </NavLink>
        </li>

        <li className="menu-item">
          <NavLink 
            to="/comercial" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Comercial
          </NavLink>
        </li>

        <li className="menu-item">
          <NavLink 
            to="/hospitality" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Infantil
          </NavLink>
        </li>

      </ul>
    </div>
  );
}