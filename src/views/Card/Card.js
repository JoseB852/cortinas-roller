import { useEffect, useState, useRef } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import Menu from "../../components/Nabvar/Menu/Menu";
import ResidencialBody from "../../components/Nabvar/ResidencialBody/ResidencialBody";

export default function Card() {
  const [roller, setRoller] = useState([]);
  const [openId, setOpenId] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    fetch("/data/roller.json")
      .then((res) => res.json())
      .then((data) => {
        // data ahora es directamente el array de roller
        setRoller(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleCard = (id, index) => {
    const container = containerRef.current;

    if (!container) return;

    if (openId === id) {
      setOpenId(null);

      if (window.innerWidth > 768) {
        container.style.transform = "translateX(0)";
      }
    } else {
      setOpenId(id);

      if (window.innerWidth > 768) {
        const wrapper = container.children[index];

        if (!wrapper) return;

        const panel = wrapper.querySelector(".card-panel");

        if (!panel) return;

        const panelWidth = panel.offsetWidth;
        const containerWidth = container.offsetWidth;
        const wrapperRight = wrapper.offsetLeft + wrapper.offsetWidth;

        if (wrapperRight + panelWidth > containerWidth) {
          container.style.transform = `translateX(-${
            wrapperRight + panelWidth - containerWidth + 200
          }px)`;
        } else {
          container.style.transform = "translateX(0)";
        }
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

                {/* CARD PRINCIPAL */}

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

                {/* PANEL LATERAL */}

                <div className="card-panel">

                  {/* BOTON CERRAR */}

                  <button
                    className="panel-close"
                    onClick={closePanel}
                  >
                    ×
                  </button>

                  <h4>{product.panel?.title}</h4>

                  <p>{product.panel?.description}</p>

                  {/* BOTON VER MAS 

                  <div className="panel-header">
                    <Link
                      to={`/productoDetalle/${product.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="panel-button">
                        Ver más
                      </button>
                    </Link>
                  </div>*/}

                  {/* MINI CARDS */}

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