import { useEffect, useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card() {
  const [roller, setRoller] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch("/data/roller.json")
      .then(res => res.json())
      .then(data => setRoller(data.roller))
      .catch(err => console.error(err));
  }, []);

  const toggleCard = (id) => {
    setOpenId(openId === id ? null : id);
  };

  useEffect(() => {
    document.body.classList.add("card-page");
    return () => document.body.classList.remove("card-page");
  }, []);

  return (
    <section className="card-page">
      <div className="cards-section">
        <div className="cards-scroll">
          <div className="cards-container">

            {roller.map(product => (
              <div
                key={product.id}
                className={`card-wrapper ${openId === product.id ? "open" : ""}`}
              >

                {/* CARD */}
                <div className="card" onClick={() => toggleCard(product.id)}>
                  <h3>{product.title}</h3>
                  <img src={product.image} alt={product.title} />
                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </div>
                </div>

                {/* PANEL */}
                <div className="card-panel">

                

                  {/* TEXTO */}
                  <h4>{product.title}</h4>
                  <p>
                    Soluciones premium diseñadas para ofrecer confort,
                    control de luz y estética moderna en cualquier espacio.
                  </p>

                    {/* BOTÓN ARRIBA */}
                    <div className="panel-header">
                    <Link to={`/productoDetalle/${product.id}`}>
                      <button className="panel-button">Ver más</button>
                    </Link>
                  </div>

                  {/* MINI CARDS */}
                  <div className="panel-cards">
                    <div className="panel-mini-card">
                      <img src="/images/cortina-roller-1.jpg" alt="Blackout Total" />
                      <span>Blackout Total</span>
                    </div>

                    <div className="panel-mini-card">
                      <img src="/images/cortina-roller-2.jpg" alt="Blackout Térmico" />
                      <span>Blackout Térmico</span>
                    </div>

                    <div className="panel-mini-card">
                      <img src="/images/cortina-roller-3.jpg" alt="Blackout Acústico" />
                      <span>Blackout Acústico</span>
                    </div>

                    <div className="panel-mini-card">
                      <img src="/images/cortina-roller-4.jpg" alt="Blackout Premium" />
                      <span>Blackout Premium</span>
                    </div>
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
