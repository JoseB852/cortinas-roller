import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Blackout.css";
import { TextEffect } from "../../components/Text-Effect/TextEffect";
import { StoreContext } from "../../components/Context/StoreContext";

export default function Blackout() {

  const {
    blackoutProducts,
    loading,
    error,
    getBlackoutProducts
  } = useContext(StoreContext);

  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    getBlackoutProducts();
  }, [getBlackoutProducts]);


  const product = blackoutProducts.find(
    item => item.id === id
  );


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


  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }


  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Producto no encontrado</h2>
        <p>
          No se encontró un producto con el identificador: "{id}"
        </p>
        <button onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    );
  }


  return (
    <div className="container-blackout">

      <div
        className="banner-blackout"
        style={{
          backgroundImage: `url(${product.banner?.src || "/images/default-banner.jpg"})`,
        }}
      >
      </div>


      <div className="title-blackout">
        <h1>
          <TextEffect>
            {product.titleBlock?.h1 || "Título no disponible"}
          </TextEffect>
        </h1>

        <p>
          {product.titleBlock?.p || "Descripción no disponible"}
        </p>
      </div>


      <div className="explorer-title">
        <h1>{product.explorer?.title || ""}</h1>
      </div>


      {product.explorer?.sections ? (
        product.explorer.sections.map(
          (section,index) => (
            <div
              key={section.id}
              className={`content-explorer ${
                index % 2 !== 0 ? "reverse" : ""
              }`}
            >

              <div className="explorer">
                {section.text && (
                  <p>{section.text}</p>
                )}
              </div>

              <div
                className="explorer-imagen"
                style={{
                  backgroundImage:`url(${section.image})`
                }}
              />

            </div>
          )
        )
      ) : (
        <div className="no-sections">
          <p>No hay secciones disponibles para mostrar</p>
        </div>
      )}

    </div>
  );
}