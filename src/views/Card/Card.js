import { useEffect, useState, useRef, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Card.css";
import Menu from "../../components/Menu/Menu";
import { StoreContext } from "../../components/Context/StoreContext";
export default function Card() {
  const { roller, getRollerProducts } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();


  const initialOpenId = searchParams.get("open");
  const [openId, setOpenId] = useState(initialOpenId ? Number(initialOpenId) : null);

  const containerRef = useRef(null);


  useEffect(() => {
    getRollerProducts();
  }, [getRollerProducts]);


  useEffect(() => {
    const open = searchParams.get("open");
    setOpenId(open ? Number(open) : null);
  }, [searchParams]);


  const toggleCard = (id, index) => {
    const container = containerRef.current;
    if (!container) return;

    if (openId === id) {
      setOpenId(null);
      setSearchParams({});

      if (window.innerWidth > 768) {
        container.style.transform = "translateX(0)";
      }
    } else {
      setOpenId(id);
      setSearchParams({ open: id });

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
    setSearchParams({});

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
                className={`card-wrapper ${openId === product.id ? "open" : ""}`}
              >

                <div className="card" onClick={() => toggleCard(product.id, index)}>
                  <h3>{product.title}</h3>
                  <img src={product.image} alt={product.title} />
                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </div>
                </div>

                <div className="card-panel">
                  <button className="panel-close" onClick={closePanel}>
                    ×
                  </button>

                  <h4>{product.panel?.title}</h4>
                  <p>{product.panel?.description}</p>

                  <div className="panel-cards">
                    {product.panel?.miniCards?.map((item) => (
                      <Link
                        key={item.id}
                        to={`/blackout/${item.viewId}?open=${product.id}`}
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