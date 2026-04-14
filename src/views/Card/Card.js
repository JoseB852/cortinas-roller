import { useEffect, useState, useRef } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import Menu from "../../components/Nabvar/Menu/Menu";

export default function Card() {
  const [roller, setRoller] = useState([]);
  const [openId, setOpenId] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    fetch("/data/roller.json")
      .then((res) => res.json())
      .then((data) => {
        setRoller(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleCard = (id, index) => {
    const container = containerRef.current;
    if (!container) return;
  
    // 👉 cerrar si ya está abierta
    if (openId === id) {
      setOpenId(null);
  
      if (window.innerWidth > 768) {
        container.style.transform = "translateX(0)";
      }
      return;
    }
  
    // 👉 abrir nueva card
    setOpenId(id);
  
    if (window.innerWidth > 768) {
      const wrapper = container.children[index];
      if (!wrapper) return;
  
      const panel = wrapper.querySelector(".card-panel");
      if (!panel) return;
  
      const panelWidth = panel.offsetWidth;
  
      // ✅ ancho visible real (viewport del contenedor)
      const containerWidth = container.parentElement.offsetWidth;
  
      // ✅ posición absoluta (SIN acumulación)
      const wrapperRight =
        wrapper.offsetLeft + wrapper.offsetWidth;
  
      // ✅ mover solo si se corta
      if (wrapperRight + panelWidth > containerWidth) {
        container.style.transform = `translateX(-${
          wrapperRight + panelWidth - containerWidth + 200
        }px)`;
      } else {
        container.style.transform = "translateX(0)";
      }
    }
  };

  const closePanel = (e) => {
    e.stopPropagation();
    setOpenId(null);

    if (window.innerWidth > 768 && containerRef.current) {
      containerRef.current.style.transform = "translateX(0)";
    }
  };

  return (
    <section className="card-page">
      <Menu />

      <div className="cards-section">
        <div className="cards-scroll">
          <div className="cards-container" ref={containerRef}>
            {roller.map((product, index) => (
              <div
                key={product.id}
                className={`card-wrapper ${
                  openId === product.id ? "open" : ""
                }`}
              >
                {/* CARD */}
                <div
                  className="card"
                  onClick={() => toggleCard(product.id, index)}
                >
                  <h3>{product.title}</h3>

                  <img
                    src={product.image}
                    alt={product.title}
                  />

                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </div>
                </div>

                {/* PANEL */}
                <div className="card-panel">
                  <button
                    className="panel-close"
                    onClick={closePanel}
                  >
                    ×
                  </button>

                  <h4>{product.panel?.title}</h4>
                  <p>{product.panel?.description}</p>

                  <div className="panel-cards">
                    {product.panel?.miniCards?.map((item) => (
                      <Link
                        key={item.id}
                        to={`/blackout/${item.viewId}`}
                        className="panel-mini-card"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={item.image}
                          alt={item.label}
                        />
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
    </section>
  );
}