import './Comercial.css';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Nabvar/Menu/Menu';
import ComercialBody from '../../components/Nabvar/ComercialBody/ComercialBody';

export default function Comercial() {

  const [comercial, setComercial] = useState([]);
  const [openId, setOpenId] = useState(null);

  const containerRef = useRef(null);

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
    const container = containerRef.current;
    if (!container) return;

    if (openId === id) {
      setOpenId(null);

      if (window.innerWidth > 768) {
        container.style.transform = 'translateX(0)';
      }

    } else {
      setOpenId(id);

      if (window.innerWidth > 768) {
        const wrapper = container.children[index];
        if (!wrapper) return;

        const panel = wrapper.querySelector('.comercial-panel');
        if (!panel) return;

        const panelWidth = panel.offsetWidth;

        // 🔥 ancho REAL visible (viewport)
        const containerWidth = container.parentElement.offsetWidth;

        // 🔥 obtener translate actual (sin WebKitCSSMatrix)
        const style = window.getComputedStyle(container);
        const matrix = style.transform;

        let currentTranslate = 0;

        if (matrix !== 'none') {
          const values = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
          currentTranslate = Math.abs(parseFloat(values[4]));
        }

        // 🔥 posición REAL corregida
        const wrapperRight =
          wrapper.offsetLeft +
          wrapper.offsetWidth -
          currentTranslate;

        // 🔥 ajuste inteligente (fix 3ra card)
        if (wrapperRight + panelWidth > containerWidth) {
          container.style.transform = `translateX(-${
            wrapperRight + panelWidth - containerWidth + 200
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

    if (window.innerWidth > 768 && containerRef.current) {
      containerRef.current.style.transform = 'translateX(0)';
    }
  };

  return (
    <section className="comercial-page">

      <Menu />

      <div className="comercial-section">
        <div className="comercial-scroll">

          {/* 🔥 REF AQUÍ */}
          <div className="comercial-content" ref={containerRef}>

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

                  <button
                    className="panel-close"
                    onClick={closePanel}
                  >
                    ×
                  </button>

                  <h4>{product.panel?.title}</h4>
                  <p>{product.panel?.description}</p>

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

      <ComercialBody />

    </section>
  );
}