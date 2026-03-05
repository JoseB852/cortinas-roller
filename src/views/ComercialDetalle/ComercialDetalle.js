import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Blackout/Blackout.css";

export default function ComercialDetalle() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    fetch("/data/roller.json")
      .then((res) => {

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();

      })
      .then((data) => {

        if (data.comercialVista && Array.isArray(data.comercialVista)) {
          setProducts(data.comercialVista);
        } else {
          throw new Error("No se encontró comercialVista en los datos");
        }

        setLoading(false);

      })
      .catch((err) => {

        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);

      });

  }, []);

  // Buscar producto por ID
  const product = products.find((item) => item.id === id);

  // Error
  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  // No encontrado
  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Producto no encontrado</h2>
        <p>No se encontró un producto con el identificador: "{id}"</p>
        <button onClick={() => navigate("/comercial")}>
          Volver
        </button>
      </div>
    );
  }

  return (

    <div className="container-blackout">

      {/* Banner */}
      <div
        className="banner-blackout"
        style={{
          backgroundImage: `url(${product.banner?.src || "/images/default-banner.jpg"})`
        }}
      />

      {/* Título */}
      <div className="title-blackout">

        <h1>
          {product.titleBlock?.h1 || "Título no disponible"}
        </h1>

        <p>
          {product.titleBlock?.p || "Descripción no disponible"}
        </p>

      </div>

      {/* Título del explorador */}
      <div className="explorer-title">

        <h1>
          {product.explorer?.title || ""}
        </h1>

      </div>

      {/* Secciones */}
      {product.explorer?.sections ? (

        product.explorer.sections.map((section, index) => (

          <div
            key={section.id}
            className={`content-explorer ${index % 2 !== 0 ? "reverse" : ""}`}
          >

            <div className="explorer">

              {section.text && (
                <p>{section.text}</p>
              )}

            </div>

            <div
              className="explorer-imagen"
              style={{
                backgroundImage: `url(${section.image})`
              }}
            />

          </div>

        ))

      ) : (

        <div className="no-sections">
          <p>No hay secciones disponibles para mostrar</p>
        </div>

      )}

    </div>

  );

}