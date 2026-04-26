import React, { useState, useEffect, useRef } from "react";
import "./Menu.css";
import { NavLink, useLocation } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const [sliderLeft, setSliderLeft] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const menuItemsRef = useRef([]);

  const location = useLocation();

  // cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // slider activo
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
        <ul
          className={`menu-list ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <li className="menu-main">
            <span>Productos</span>
            <span className={`chevron-icon ${open ? "open" : "closed"}`} />
          </li>
        </ul>

        <div className={`submenu-panel ${open ? "open" : ""}`}>
          <ul className="submenu-list">

            <li className="submenu-item">
              <NavLink to="/residencial" onClick={() => setOpen(false)}>
                Residencial
              </NavLink>
            </li>

            <li className="submenu-item">
              <NavLink to="/comercial" onClick={() => setOpen(false)}>
                Comercial
              </NavLink>
            </li>

            <li className="submenu-item">
              <NavLink to="/infantil" onClick={() => setOpen(false)}>
                Infantil
              </NavLink>
            </li>

          </ul>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <ul className="menu-desktop">

        <div
          className="menu-slider"
          style={{
            width: `${sliderWidth}px`,
            left: `${sliderLeft}px`,
          }}
        />

        {[
          { path: "/residencial", label: "Residencial" },
          { path: "/comercial", label: "Comercial" },
          { path: "/infantil", label: "Infantil" },
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