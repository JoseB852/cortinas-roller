import React, { useState, useEffect, useRef } from "react";
import "./Menu.css";
import { NavLink, useLocation } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Slider desktop
  const [sliderLeft, setSliderLeft] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const menuItemsRef = useRef([]);

  const location = useLocation();

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mover slider al ítem activo
  useEffect(() => {
    const activeItem = menuItemsRef.current.find(
      (item) => item.querySelector("a.active")
    );
    if (activeItem) {
      setSliderLeft(activeItem.offsetLeft);
      setSliderWidth(activeItem.offsetWidth);
    }
  }, [location]);

  return (
    <div className="menu-container" ref={menuRef}>
      {/* ===== MOBILE ===== */}
      <div className="menu">
        <ul className={`menu-list ${open ? "active" : ""}`} onClick={() => setOpen(!open)}>
          <li className="menu-main">
            <span>Residencial</span>
            <span className={`chevron-icon ${open ? "open" : "closed"}`}></span>
          </li>
        </ul>

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

      {/* ===== DESKTOP ===== */}
      <ul className="menu-desktop">
        {/* Slider como fondo blanco */}
        <div
          className="menu-slider"
          style={{
            width: `${sliderWidth}px`,
            left: `${sliderLeft}px`,
          }}
        />

        {[
          { path: "/card", label: "Residencia" },
          { path: "/comercial", label: "Comercial" },
          { path: "/hospitality", label: "Infantil" },
        ].map((item, index) => (
          <li
            key={index}
            className="menu-item"
            ref={(el) => (menuItemsRef.current[index] = el)}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
