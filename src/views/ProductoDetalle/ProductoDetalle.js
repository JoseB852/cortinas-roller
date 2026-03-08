import "./ProductoDetalle.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // CORREGIDO: Cargar rollerDetalle.json directamente
    fetch("/data/rollerDetalle.json")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // data es directamente el array de rollerDetalle
        if (Array.isArray(data)) {
          // El ID en rollerDetalle es número, no string
          const found = data.find(item => item.id === Number(id));
          setProducto(found);
        } else {
          throw new Error("El formato de rollerDetalle no es un array");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.history.back()}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="main-content">
        <div className="not-found-container">
          <h2>Producto no encontrado</h2>
          <p>No se encontró un producto con el ID: {id}</p>
          <button onClick={() => window.history.back()}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container-detalle">

        {/* VIDEO */}
        <div className="video-contenedor">
          <video
            src={producto.hero?.src}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* INTRO */}
        <div className="introduccion">
          <h1>{producto.intro?.title}</h1>
          <h4>{producto.intro?.subtitle}</h4>
        </div>

        <div className="introduccion-one">
          <p>{producto.intro?.description}</p>
        </div>

        <div className="titulo-one">
          <h1>Explore Lighting</h1>
        </div>

        {/* SECCIONES PRINCIPALES */}
        {producto.sections?.map((section, index) => (
          <div
            key={section.id}
            className={`content ${index % 2 !== 0 ? "reverse" : ""}`}
          >
            <div
              className="content-image"
              style={{ backgroundImage: `url(${section.image})` }}
            />

            <div className="content-description">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
              <button className="button-explorer">Explorar</button>
            </div>
          </div>
        ))}

        {/* EXPLORE SECTION */}
        {producto.explore && (
          <div className="explore-wrapper">

            <div className="half-header">
              <h2>{producto.explore.title}</h2>
              <p>{producto.explore.description}</p>
            </div>

            <div className="half-row">
              {producto.explore.items?.map(item => (
                <div key={item.id} className="content-half">
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}