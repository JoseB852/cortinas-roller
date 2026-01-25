import './Comercial.css';
import { useEffect, useState } from 'react';

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

  return (
    <div className="comercial-content">
      {comercial.map(product => (
        <div
          className={`comercial-wrapper ${
            openId === product.id ? 'open' : ''
          }`}
          key={product.id}
        >
 
          <div
            className="comercial"
            onClick={() =>
              setOpenId(openId === product.id ? null : product.id)
            }
          >
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <span className="arrow"><i class="fa-solid fa-arrow-right-long"></i></span>
          </div>

          <div className="comercial-panel">
            <h4>{product.title}</h4>
            <p>
              Contenido del panel comercial.  
              Esto es EXACTAMENTE lo mismo que Card.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
