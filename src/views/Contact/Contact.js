import React, { useState } from 'react'
import './Contact.css'

export default function Contact() {

  const [ancho, setAncho] = useState(0)
  const [alto, setAlto] = useState(0)

  const precioM2 = 25000 //  cambia este valor es de referencia este seria el precio

  const area = (ancho * alto) / 10000
  const ventaPresencial = area * precioM2
  // Desceuntos
  const fabricacion = area * (precioM2 * 0.8)
  const ventaOnline = area * (precioM2 * 0.9)

  const formato = (num) =>
    num.toLocaleString('es-CL', { minimumFractionDigits: 0 })

  return (
    <div className='content-form'>
      
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
          <h5>Atendemos de Lunes a Viernes: 09:00 - 18.00HRS</h5>
        </div>

        <div className='shipment'>
          <i className="fa-solid fa-envelopes-bulk"></i>
          <h5>Hacemos envíos a todo Chile</h5>
        </div>
      </div>

      {/* FORM COTIZADOR */}
      <div className='form'>
        <h3>Cotizador de Precios</h3>

        <label>Ingrese aquí las medidas</label>

        <div className='input-group'>
          <input
            type="number"
            placeholder="Ancho (cm)"
            onChange={(e) => setAncho(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Alto (cm)"
            onChange={(e) => setAlto(Number(e.target.value))}
          />
        </div>

        <div className='result'>
          <p><strong>Área Total (m2):</strong> {area.toFixed(3)}</p>
          <p><strong>Venta presencial:</strong> $ {formato(ventaPresencial)}</p>
          <p><strong>Fabricación cortina:</strong> $ {formato(fabricacion)}</p>
          <p><strong>Valor venta online:</strong> $ {formato(ventaOnline)}</p>
          <small>Valores IVA incluido. (Facturable)</small>
        </div>
      </div>

    </div>
  )
}
