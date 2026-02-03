import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Blackout.css";

export default function Blackout() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // id de la URL
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
        if (data.blackoutVista && Array.isArray(data.blackoutVista)) {
          setProducts(data.blackoutVista);
        } else {
          throw new Error("No se encontró blackoutVista en los datos");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Buscamos el producto por ID numérico
  const product = products.find((item) => {
    const itemId = Number(item.id);
    const paramId = Number(id);
    return itemId === paramId;
  });

  // Si hay error
  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    );
  }

  // Si está cargando
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no se encontró el producto
  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Producto no encontrado</h2>
        <p>No se encontró un producto con el ID: {id}</p>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    );
  }

  return (
    <div className="container-blackout">
      {/* Banner usando banner.src */}
      <div
        className="banner-blackout"
        style={{ 
          backgroundImage: `url(${product.banner?.src || '/images/default-banner.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
    
      </div>

      {/* Título y descripción usando titleBlock */}
      <div className="title-blackout">
        <h1>{product.titleBlock?.h1 || "Título no disponible"}</h1>
        <p>{product.titleBlock?.p || "Descripción no disponible"}</p>
      </div>


      
      <div className="explorer-title">
        <h1>{product.explorer?.title || "Explore the Portfolio"}</h1>
      </div>

      {/* Secciones del explorador */}
      {product.explorer?.sections ? (
        product.explorer.sections.map((section, index) => (
          <div
            key={section.id}
            className={`content-explorer ${index % 2 !== 0 ? "reverse" : ""}`}
          >
            <div className="explorer">
             {/* <h2>{section.title}</h2> */}
              {section.text && <p>{section.text}</p>}
            </div>
            <div
              className="explorer-imagen"
              style={{ 
                backgroundImage: `url(${section.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
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