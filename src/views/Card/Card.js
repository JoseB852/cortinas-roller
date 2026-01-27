import { useEffect, useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import Menu from "../../components/Nabvar/Menu/Menu";

export default function Card() {
  const [roller, setRoller] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch("/data/roller.json")
      .then((res) => res.json())
      .then((data) => setRoller(data.roller))
      .catch((err) => console.error(err));
  }, []);

  const toggleCard = (id, index) => {
    if (openId === id) {
      setOpenId(null);
      // Solo para desktop
      if (window.innerWidth > 768) {
        document.querySelector(".cards-container").style.transform = "translateX(0)";
      }
    } else {
      setOpenId(id);
      
      // Solo para desktop
      if (window.innerWidth > 768) {
        const container = document.querySelector(".cards-container");
        const wrapper = container.children[index];
        const panelWidth = wrapper.querySelector(".card-panel").offsetWidth;
        const containerWidth = container.offsetWidth;
        const wrapperRight = wrapper.offsetLeft + wrapper.offsetWidth;

        if (wrapperRight + panelWidth > containerWidth) {
          container.style.transform = `translateX(-${
            wrapperRight + panelWidth - containerWidth + 30
          }px)`;
        } else {
          container.style.transform = "translateX(0)";
        }
      }
    }
  };

  return (
    <section className="card-page">
      <Menu />

      <div className="cards-section">
        <div className="cards-scroll">
          <div className="cards-container">
            {roller.map((product, index) => (
              <div
                key={product.id}
                className={`card-wrapper ${
                  openId === product.id ? "open" : ""
                }`}
              >
                {/* CARD (igual que antes) */}
                <div
                  className="card"
                  onClick={() => toggleCard(product.id, index)}
                >
                  <h3>{product.title}</h3>
                  <img src={product.image} alt={product.title} />
                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </div>
                </div>

                {/* PANEL (igual que antes) */}
                <div className="card-panel">
                  <h4>{product.panel.title}</h4>
                  <p>{product.panel.description}</p>

                  <div className="panel-header">
                    <Link to={`/productoDetalle/${product.id}`}>
                      <button className="panel-button">Ver más</button>
                    </Link>
                  </div>

                  <div className="panel-cards">
                    {product.panel.miniCards.map((item) => (
                      <div className="panel-mini-card" key={item.id}>
                        <img src={item.image} alt={item.label} />
                        <span>{item.label}</span>
                      </div>
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