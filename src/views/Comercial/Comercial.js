import './Comercial.css';
import { useEffect, useState } from 'react';
import Menu from '../../components/Nabvar/Menu/Menu';

export default function Comercial() {
  const [comercial, setComercial] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    document.body.classList.add('comercial-page');

    fetch('/data/roller.json')
      .then(res => res.json())
      .then(data => setComercial(data.comercial));

    return () => {
      document.body.classList.remove('comercial-page');
    };
  }, []);

  const toggleComercial = (id, index) => {
    if (openId === id) {
      setOpenId(null);

      if (window.innerWidth > 768) {
        document.querySelector('.comercial-content').style.transform = 'translateX(0)';
      }
    } else {
      setOpenId(id);

      if (window.innerWidth > 768) {
        const container = document.querySelector('.comercial-content');
        const wrapper = container.children[index];
        const panelWidth = wrapper.querySelector('.comercial-panel').offsetWidth;
        const containerWidth = container.offsetWidth;
        const wrapperRight = wrapper.offsetLeft + wrapper.offsetWidth;

        if (wrapperRight + panelWidth > containerWidth) {
          container.style.transform = `translateX(-${
            wrapperRight + panelWidth - containerWidth + 30
          }px)`;
        } else {
          container.style.transform = 'translateX(0)';
        }
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
                className={`comercial-wrapper ${
                  openId === product.id ? 'open' : ''
                }`}
              >
                {/* CARD */}
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

                {/* PANEL */}
                <div className="comercial-panel">
                  <h4>{product.panel.title}</h4>
                  <p>{product.panel.description}</p>
                  <div className="panel-header">
                    <button className="panel-button">
                      Ver más
                    </button>
                  </div>

                  <div className="panel-cards">
                    {product.panel.miniCards.map(item => (
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
