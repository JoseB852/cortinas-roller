import React from 'react'
import { useState } from 'react'
import './Quoter.css'

export default function Quoter() {
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
        <div className="form">
          <div className="form-wrapper">
      
            <h3>Cotizador de Precios</h3>
      
            <div className="quoter-container">
      
              <div className="quoter-inputs">
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
      
                <a 
                  href="/como-medir-persianas.pdf" 
                  download 
                  className="download-btn"
                >
                  Descargar guía para medir
                </a>
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
        </div>
      )
  
}
