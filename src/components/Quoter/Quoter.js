import React, { useState } from 'react'
import './Quoter.css'

export default function Quoter() {

  // ========== MODO (NUEVO) ==========
  const [modo, setModo] = useState("dibujo") // "dibujo" o "ia"

  // ========== MODO DIBUJO (el que ya tenías) ==========
  const [ancho, setAncho] = useState(0)
  const [alto, setAlto] = useState(0)
  const [color, setColor] = useState("blanco")
  const [tipo, setTipo] = useState("blackout")
  const [screenLevel, setScreenLevel] = useState("5")
  const [abierta, setAbierta] = useState(false)

  // ========== MODO IA (NUEVO) ==========
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null)
  const [vistaPrevia, setVistaPrevia] = useState(null)
  const [imagenGenerada, setImagenGenerada] = useState(null)
  const [cargandoIA, setCargandoIA] = useState(false)
  const [errorIA, setErrorIA] = useState(null)
  const [tipoCortinaIA, setTipoCortinaIA] = useState("gris moderno")

  const maxWidth = 400
  const scale = ancho ? Math.min(maxWidth / ancho, 1) : 1
  const width = ancho ? ancho * scale : 0
  const height = alto ? alto * scale : 0

  // Manejar selección de foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFotoSeleccionada(file)
    setErrorIA(null)
    setImagenGenerada(null)

    const reader = new FileReader()
    reader.onloadend = () => setVistaPrevia(reader.result)
    reader.readAsDataURL(file)
  }

  // Generar cortina con IA
  const handleGenerarConIA = async () => {
    if (!fotoSeleccionada) {
      setErrorIA("Selecciona una foto de una ventana primero")
      return
    }
  
    setCargandoIA(true)
    setErrorIA(null)
  
    const formData = new FormData()
    formData.append("imagen", fotoSeleccionada)
    formData.append("tipoCortina", tipoCortinaIA)
  
    try {
      const response = await fetch("http://localhost:3000/ia/generar-cortina", {
        method: "POST",
        body: formData,
      })
  
      const data = await response.json()
  
      if (data.exito) {
        setImagenGenerada(data.imagenUrl)  // ✅ AHORA ES URL DIRECTA
      } else {
        setErrorIA(data.error || "Error al generar la imagen")
      }
    } catch (error) {
      console.error("Error:", error)
      setErrorIA("Error de conexión: " + error.message)
    } finally {
      setCargandoIA(false)
    }
  }

  return (
    <div className="form">
      <div className="form-wrapper">
        <h3>Simulador de Cortinas</h3>

        {/* ========== SELECTOR DE MODO ========== */}
        <div className="modo-selector">
          <button
            className={modo === "dibujo" ? "active" : ""}
            onClick={() => setModo("dibujo")}
          >
            ✏️ Modo Dibujo (2D)
          </button>
          <button
            className={modo === "ia" ? "active" : ""}
            onClick={() => setModo("ia")}
          >
            📸 Modo Foto Real (IA)
          </button>
        </div>

        <div className="quoter-container">
          {/* ========================= INPUTS ========================= */}
          <div className="quoter-inputs">
            {modo === "dibujo" ? (
              <>
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

                <label>Tipo de cortina</label>
                <div className="type-selector">
                  {["blackout", "screen", "dual", "vertical"].map((t) => (
                    <button
                      key={t}
                      className={tipo === t ? "active" : ""}
                      onClick={() => {
                        setTipo(t)
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
              </>
            ) : (
              <>
                <label>📷 Sube una foto de tu ventana</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="file-input"
                />

                {vistaPrevia && (
                  <div className="foto-preview">
                    <img src={vistaPrevia} alt="Vista previa" />
                  </div>
                )}

                <label>🎨 Color de cortina</label>
                <div className="color-picker-ia">
                  {["gris moderno", "blanco", "beige", "negro", "azul marino"].map((c) => (
                    <button
                      key={c}
                      className={tipoCortinaIA === c ? "active" : ""}
                      onClick={() => setTipoCortinaIA(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGenerarConIA}
                  disabled={!fotoSeleccionada || cargandoIA}
                  className="ia-button"
                >
                  {cargandoIA ? "⏳ Generando con IA..." : "🎨 Ver mi cortina con IA"}
                </button>

                {errorIA && <div className="error-ia">{errorIA}</div>}

                {imagenGenerada && (
                  <div className="resultado-ia">
                    <label>✨ Resultado:</label>
                    <img src={imagenGenerada} alt="Cortina generada por IA" />
                  </div>
                )}
              </>
            )}
          </div>

          {/* ========================= PREVIEW ========================= */}
          {modo === "dibujo" && (
            <div className="preview">
              {(ancho > 0 && alto > 0) && (
                <>
                  <div className="window-wrapper">
                    <div className="window-frame" style={{ width, height }}>
                      <div className="window-glass">
                        <div className="divider vertical"></div>
                        <div className="divider horizontal"></div>
                        <div
                          className={`roller ${tipo} ${color} ${abierta ? "open" : ""} ${
                            tipo === "screen" ? `screen-${screenLevel}` : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div className="cord" onClick={() => setAbierta(!abierta)}>
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
          )}
        </div>
      </div>
    </div>
  )
}