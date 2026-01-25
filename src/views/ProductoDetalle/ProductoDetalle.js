import "./ProductoDetalle.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch("/data/roller.json")
      .then(res => res.json())
      .then(data => {
        const found = data.rollerDetalle.find(
          item => item.id === Number(id)
        );
        setProducto(found);
      });
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="main-content">
      <div className="container-detalle">

        {/* VIDEO */}
        <div className="video-contenedor">
          <video
            src={producto.hero.src}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* INTRO */}
        <div className="introduccion">
          <h1>{producto.intro.title}</h1>
          <h4>{producto.intro.subtitle}</h4>
        </div>

        <div className="introduccion-one">
          <p>{producto.intro.description}</p>
        </div>

        <div className="titulo-one">
          <h1>Explore Lighting</h1>
        </div>

        {/* SECCIONES PRINCIPALES */}
        {producto.sections.map((section, index) => (
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
        <div className="explore-wrapper">

          <div className="half-header">
            <h2>{producto.explore.title}</h2>
            <p>{producto.explore.description}</p>
          </div>

          <div className="half-row">
            {producto.explore.items.map(item => (
              <div key={item.id} className="content-half">
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
