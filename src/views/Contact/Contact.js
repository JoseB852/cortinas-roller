import React, { useState } from 'react'
import './Contact.css'

export default function Contact() {

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: ""
  });

  const [success, setSuccess] = useState(false);

  const sendEmail = (formData) => {
    fetch("http://localhost:3000/email", {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then(async (response) => {

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

        return response.json();
      })
      .then((datos) => {
        console.log("Correo enviado:", datos);

        setSuccess(true);

        // limpiar formulario
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          mensaje: ""
        });

        // ocultar popup
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error al enviar el formulario", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

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

      {/* FORMULARIO */}
      <div className='contact-form'>
        <h3>Envíanos un Mensaje</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Correo Electrónico"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />

          <input
            type="tel"
            placeholder="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />

          <textarea
            placeholder="Escribe tu mensaje aquí..."
            name="mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
          ></textarea>

          <button type='submit'>Enviar Mensaje</button>

        </form>
      </div>

      {/* POPUP */}
      {success && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="check-circle">✓</div>
            <p>Mensaje enviado</p>
          </div>
        </div>
      )}

    </div>
  )
}