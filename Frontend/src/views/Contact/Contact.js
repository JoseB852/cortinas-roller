import React, { useState, useContext } from "react";
import "./Contact.css";
import { StoreContext } from "../../components/Context/StoreContext";


/* =========================
 Contact
========================= */

export default function Contact() {

  const {sendContactEmail,sendingEmail,emailSuccess} = useContext(StoreContext);

  const [formData, setFormData] =
    useState({
      nombre: "",
      correo: "",
      telefono: "",
      mensaje: ""
    });


  /* Form */

  const handleChange = (e) => {
    const {name,value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  const handleSubmit =
    async (e) => {
      e.preventDefault();
      await sendContactEmail(
        formData
      );
      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        mensaje: ""
      });

    };



  return (

    <div className="content-form">


      {/* ======================
  Info Panel
 ====================== */}

      <div className="form-description">

        <div className="contact">
          <i className="fa-brands fa-whatsapp"></i>

          <h5>
            Telefono - Whatsapp
            +56 9 5206 7126
          </h5>
        </div>



        <div className="Direccion">
          <i className="fa-solid fa-truck"></i>

          <h5>
            VISITA PREVIO AGENDAMIENTO
            VIA WHATSAPP
          </h5>
        </div>



        <div className="schedule">
          <i className="fa-solid fa-clock"></i>

          <h5>
            Atendemos de Lunes a Viernes:
            09:00 - 18:00 HRS
          </h5>

        </div>



        <div className="shipment">
          <i className="fa-solid fa-envelopes-bulk"></i>

          <h5>
            Hacemos envíos a todo Chile
          </h5>

        </div>

      </div>



      {/* ======================
  Form
 ====================== */}

      <div className="contact-form">

        <h3>
          Envíanos un Mensaje
        </h3>


        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />



          <input
            type="email"
            name="correo"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
          />



          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />



          <textarea
            name="mensaje"
            rows="5"
            placeholder="Escribe tu mensaje aquí..."
            value={formData.mensaje}
            onChange={handleChange}
          />



          <button
            type="submit"
            disabled={sendingEmail}
          >

            {
              sendingEmail
                ? "Enviando..."
                : "Enviar Mensaje"
            }

          </button>

        </form>

      </div>



      {/* ======================
  Success Popup
 ====================== */}

      {emailSuccess && (

        <div className="popup-overlay">

          <div className="popup">

            <div className="check-circle">
              ✓
            </div>

            <p>
              Mensaje enviado
            </p>

          </div>

        </div>

      )}

    </div>

  )

}