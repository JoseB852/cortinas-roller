import React from 'react'
import './Contact.css'

export default function Contact() {

  return (
    <div className='content-form'>
      
      {/* PANEL IZQUIERDO */}
      <div className='form-description'>
        <div className='contact'>
          <i className="fa-brands fa-whatsapp"></i>
          <h5>Telefono - Whatsapp +56 9 5206 7126</h5>
        </div>

        <div className='Direccion'>
          <i className="fa-solid fa-truck"></i>
          <h5>VISITA PREVIO AGENDAMIENTO VIA WHATSAPP</h5>
        </div>

        <div className='schedule'>
          <i className="fa-solid fa-clock"></i>
          <h5>Atendemos de Lunes a Viernes: 09:00 - 18:00 HRS</h5>
        </div>

        <div className='shipment'>
          <i className="fa-solid fa-envelopes-bulk"></i>
          <h5>Hacemos envíos a todo Chile</h5>
        </div>
      </div>

      {/* PANEL DERECHO - FORMULARIO */}
      <div className='contact-form'>

        <h3>Envíanos un Mensaje</h3>

        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Correo Electrónico" />
        <input type="tel" placeholder="Teléfono" />
        <textarea placeholder="Escribe tu mensaje aquí..." rows="5"></textarea>

        <button>Enviar Mensaje</button>

      </div>

    </div>
  )
}