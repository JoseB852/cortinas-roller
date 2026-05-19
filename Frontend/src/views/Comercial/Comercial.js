import { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";

import "./Comercial.css";
import Menu from "../../components/Menu/Menu";
import ComercialBody from "../../components/ComercialBody/ComercialBody";
import { StoreContext } from "../../components/Context/StoreContext";

export default function Comercial() {
  const { comercial, getComercialProducts } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado para controlar qué tarjeta está abierta
  const initialOpenId = searchParams.get("open");
  const [openId, setOpenId] = useState(initialOpenId ? Number(initialOpenId) : null);

  // Efecto inicial: agregar clase al body y cargar productos
  useEffect(() => {
    document.body.classList.add("comercial-page");
    getComercialProducts();

    return () => {
      document.body.classList.remove("comercial-page");
    };
  }, [getComercialProducts]);

  // Sincronizar estado con cambios en la URL
  useEffect(() => {
    const open = searchParams.get("open");
    setOpenId(open ? Number(open) : null);
  }, [searchParams]);

  // Alternar apertura/cierre de una tarjeta
  const toggleComercial = (id, index) => {
    const content = document.querySelector(".comercial-content");

    if (openId === id) {
      // Cerrar tarjeta
      setOpenId(null);
      setSearchParams({});

      if (window.innerWidth > 768 && content) {
        content.style.transform = "translateX(0)";
      }
      return;
    }

    // Abrir tarjeta
    setOpenId(id);
    setSearchParams({ open: id });

    if (window.innerWidth > 768) {
      if (!content) return;

      const wrapper = content.children[index];
      if (!wrapper) return;

      const panel = wrapper.querySelector(".comercial-panel");
      if (!panel) return;

      const panelWidth = panel.offsetWidth;
      const containerWidth = content.offsetWidth;
      const wrapperRight = wrapper.offsetLeft + wrapper.offsetWidth;

      // Ajustar scroll si el panel se desborda
      if (wrapperRight + panelWidth > containerWidth) {
        content.style.transform = `translateX(-${
          wrapperRight + panelWidth - containerWidth + 30
        }px)`;
      } else {
        content.style.transform = "translateX(0)";
      }
    }
  };

  // Cerrar panel manualmente
  const closePanel = (e) => {
    e.stopPropagation();
    setOpenId(null);
    setSearchParams({});

    if (window.innerWidth > 768) {
      const content = document.querySelector(".comercial-content");
      if (content) {
        content.style.transform = "translateX(0)";
      }
    }
  };

  return (
    <section className="comercial-page">
      <Menu />

      <div className="comercial-section">
        <div className="comercial-scroll">
          <div className="comercial-content">
            {comercial.map((product, index) => (
              <div
                key={product.id}
                className={`comercial-wrapper ${openId === product.id ? "open" : ""}`}
              >
                {/* Tarjeta principal */}
                <div
                  className="comercial"
                  onClick={() => toggleComercial(product.id, index)}
                >
                  <h3>{product.title}</h3>
                  <img src={product.image} alt={product.title} />
                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </div>
                </div>

                {/* Panel desplegable lateral */}
                <div className="comercial-panel">
                  <button className="panel-close" onClick={closePanel}>
                    ×
                  </button>

                  <h4>{product.panel?.title || "Título no disponible"}</h4>
                  <p>{product.panel?.description || "Descripción no disponible"}</p>

                  <div className="panel-cards">
                    {product.panel?.miniCards?.map((item) => (
                      <Link
                        key={item.id}
                        to={`/comercial/${item.viewId}?open=${product.id}`}
                        className="panel-mini-card"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img src={item.image} alt={item.label} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ComercialBody />
    </section>
  );
}