import React, { useState } from "react";
import "./Whatsapp.css";

export default function Whatsapp() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <div className="whatsapp-button" onClick={() => setOpen(true)}>
          <div className="whatsapp-inner">
            <i className="fa-brands fa-whatsapp"></i>
          </div>
        </div>
      )}

      {open && (
        <div className="whatsapp-popup">
          <div className="popup-header">
            <div className="header-left">
              <i className="fa-brands fa-whatsapp"></i>
              <span>WhatsApp</span>
            </div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="popup-body">
            <div className="message">
              Hola, Soy Cata 🤗 <br />
              ¿En qué podemos ayudarte?
            </div>
          </div>

          <a
            href="https://wa.me/56952067126?text=Hola,%20quiero%20cotizar"
            target="_blank"
            rel="noopener noreferrer"
            className="open-chat"
          >
            Abrir chat
          </a>
        </div>
      )}
    </>
  );
}
