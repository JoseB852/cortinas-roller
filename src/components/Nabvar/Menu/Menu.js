import React, { useState } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="menu">
      <ul className={`menu-list ${open ? "open" : ""}`}>

        
        <li className="menu-main" onClick={() => setOpen(!open)}>
          <span>Residencia</span>
          <i className={`fa-solid fa-chevron-down ${open ? "rotate" : ""}`}></i>
        </li>

       
        <li className="menu-item">
          <NavLink to="/card" className="hvr-fade">
            Residencia
          </NavLink>
        </li>

        <li className="menu-item">
          <NavLink to="/comercial" className="hvr-fade">
            Comercial
          </NavLink>
        </li>

        <li className="menu-item">
          <NavLink to="/hospitality" className="hvr-fade">
            Infantiles
          </NavLink>
        </li>

      </ul>
    </div>
  );
}
