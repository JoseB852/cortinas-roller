import './Comercial.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Nabvar/Menu/Menu';

export default function Comercial() {

  const [comercial, setComercial] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    document.body.classList.add('comercial-page');

    
    fetch('/data/comercial.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
   
        setComercial(data);
      })
      .catch(err => console.error('Error cargando comercial:', err));

    return () => {
      document.body.classList.remove('comercial-page');
    };
  }, []);

  const toggleComercial = (id, index) => {
    if (openId === id) {
      setOpenId(null);

      if (window.innerWidth > 768) {
        const content = document.querySelector('.comercial-content');
        if (content) {
          content.style.transform = 'translateX(0)';
        }
      }
    } else {
      setOpenId(id);

      if (window.innerWidth > 768) {
        const container = document.querySelector('.comercial-content');
        if (!container) return;
        
        const wrapper = container.children[index];
        if (!wrapper) return;
        
        const panel = wrapper.querySelector('.comercial-panel');
        if (!panel) return;
        
        const panelWidth = panel.offsetWidth;
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

  const closePanel = (e) => {
    e.stopPropagation();
    setOpenId(null);

    if (window.innerWidth > 768) {
      const content = document.querySelector('.comercial-content');
      if (content) {
        content.style.transform = 'translateX(0)';
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

                {/* CARD PRINCIPAL */}
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

                {/* PANEL LATERAL */}
                <div className="comercial-panel">

                  {/* BOTÓN CERRAR */}
                  <button
                    className="panel-close"
                    onClick={closePanel}
                  >
                    ×
                  </button>

                  <h4>{product.panel?.title || 'Título no disponible'}</h4>
                  <p>{product.panel?.description || 'Descripción no disponible'}</p>

                  <div className="panel-cards">
                    {product.panel?.miniCards?.map(item => (
                      <Link
                        key={item.id}
                        to={`/comercial/${item.viewId}`}
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

    </section>
  );
}