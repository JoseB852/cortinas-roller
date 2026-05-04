import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { StoreContext } from "../../components/Context/StoreContext";
import "./DetailProducts.css";

export default function DetailProducts() {

  const { id } = useParams();
  const { selectedProduct, getProductById } = useContext(StoreContext);

  useEffect(() => {
    if (!id) return;
    getProductById(id);
  }, [id, getProductById]);

  if (!selectedProduct) {
    return <div className="loading">Cargando producto...</div>;
  }

  return (
    <div className="detail-page">

      {/* HERO */}
      <section className="product-hero">

        {/* GALERÍA */}
        <div className="gallery-column">

          <div className="main-image">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
          </div>

          <div className="gallery-grid">
            <img src={selectedProduct.image} alt="" />
            <img src="/images/detail-2.jpg" alt="" />
            <img src="/images/detail-3.jpg" alt="" />
            <img src="/images/detail-4.jpg" alt="" />
          </div>

        </div>

        {/* INFO */}
        <div className="product-info">

          <h1>{selectedProduct.name}</h1>

          <p className="intro">
            {selectedProduct.intro}
          </p>

          {/* SPECS */}
          <div className="spec-grid">

            <div className="spec-item">
              <h4>Tela</h4>
              <p>{selectedProduct.specs?.tela}</p>
            </div>

            <div className="spec-item">
              <h4>Privacidad</h4>
              <p>{selectedProduct.specs?.privacidad}</p>
            </div>

            <div className="spec-item">
              <h4>Aislación</h4>
              <p>{selectedProduct.specs?.aislacion}</p>
            </div>

            <div className="spec-item">
              <h4>Accionamiento</h4>
              <p>{selectedProduct.specs?.accionamiento}</p>
            </div>

          </div>

          {/* DESCRIPCIÓN PRO */}
          <div className="description-box">
            <h3>Descripción</h3>

            <div className="description-text">
              {selectedProduct.description
                .split("\n")
                .map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
            </div>
          </div>

          <Link to="/contact">
            <button className="quote-button">
              Solicitar Cotización
            </button>
          </Link>

          <div className="sku-box">
            SKU: {selectedProduct.sku}
          </div>

        </div>

      </section>

      {/* BANNER */}
      <section className="editorial-banner">
        <img src="/images/editorial-room.jpg" alt="" />
      </section>

      {/* BENEFITS */}
      <section className="benefits">

        <div className="benefit">
          <h4>Hechas a Medida</h4>
          <p>Fabricación personalizada</p>
        </div>

        <div className="benefit">
          <h4>Instalación Profesional</h4>
          <p>Montaje y asesoría</p>
        </div>

        <div className="benefit">
          <h4>Garantía</h4>
          <p>5 años</p>
        </div>

      </section>

      {/* TECHNICAL */}
      <section className="technical-section">

        <h2>Especificaciones Técnicas</h2>

        <div className="tech-grid">

          <div>
            <h5>Ancho máximo</h5>
            <p>{selectedProduct.technical?.ancho}</p>
          </div>

          <div>
            <h5>Caída máxima</h5>
            <p>{selectedProduct.technical?.caida}</p>
          </div>

          <div>
            <h5>Mantenimiento</h5>
            <p>{selectedProduct.technical?.mantenimiento}</p>
          </div>

          <div>
            <h5>Opciones</h5>
            <p>{selectedProduct.technical?.opciones}</p>
          </div>

        </div>

      </section>

    </div>
  );
}