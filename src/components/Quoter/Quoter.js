import React, { useState } from 'react'
import './Quoter.css'

export default function Quoter() {

  const [ancho, setAncho] = useState(0)
  const [alto, setAlto] = useState(0)
  const [color, setColor] = useState("blanco")
  const [tipo, setTipo] = useState("blackout")
  const [screenLevel, setScreenLevel] = useState("5")
  const [abierta, setAbierta] = useState(false)

  const maxWidth = 400
  const scale = ancho ? Math.min(maxWidth / ancho, 1) : 1

  const width = ancho ? ancho * scale : 0
  const height = alto ? alto * scale : 0


  return (
    <div className="form">

      <div className="form-wrapper">

        <h3>Simulador de Cortinas</h3>

        <div className="quoter-container">

          {/* =========================
              INPUTS
          ========================= */}
          <div className="quoter-inputs">

            <label>Medidas</label>

            <div className="input-group">
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

            {/* COLOR */}
            <label>Color</label>

            <div className="color-picker">
              {["blanco", "beige", "gris", "negro"].map((c) => (
                <div
                  key={c}
                  className={`color-circle ${c} ${color === c ? "active" : ""}`}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>

            {/* TIPO */}
            <label>Tipo de cortina</label>

            <div className="type-selector">
              {["blackout", "screen", "dual", "vertical"].map((t) => (
                <button
                  key={t}
                  className={tipo === t ? "active" : ""}
                  onClick={() => {
                    setTipo(t)

                    // 🔥 RESET SCREEN SI CAMBIA DE TIPO
                    if (t !== "screen") {
                      setScreenLevel(null)
                    } else {
                      setScreenLevel("5")
                    }
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* SCREEN SOLO SI ES SCREEN */}
            {tipo === "screen" && (
              <>
                <label>Transparencia Screen</label>

                <div className="screen-selector">
                  <button
                    className={screenLevel === "3" ? "active" : ""}
                    onClick={() => setScreenLevel("3")}
                  >
                    3%
                  </button>

                  <button
                    className={screenLevel === "5" ? "active" : ""}
                    onClick={() => setScreenLevel("5")}
                  >
                    5%
                  </button>
                </div>
              </>
            )}

          </div>

          {/* =========================
              PREVIEW
          ========================= */}
          <div className="preview">

            {(ancho > 0 && alto > 0) && (
              <>
                <div className="window-wrapper">

                  <div
                    className="window-frame"
                    style={{ width, height }}
                  >

                    <div className="window-glass">

                      <div className="divider vertical"></div>
                      <div className="divider horizontal"></div>

                      {/* CORTINA */}
                      <div
                        className={`roller ${tipo} ${color} ${abierta ? "open" : ""} ${
                          tipo === "screen" ? `screen-${screenLevel}` : ""
                        }`}
                      />

                    </div>

                  </div>

                  {/* CUERDA */}
                  <div
                    className="cord"
                    onClick={() => setAbierta(!abierta)}
                  >
                    <div className="cord-line"></div>
                    <div className="cord-ball"></div>
                  </div>

                </div>

                <p className="size-label">
                  {ancho} cm x {alto} cm
                </p>
              </>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}