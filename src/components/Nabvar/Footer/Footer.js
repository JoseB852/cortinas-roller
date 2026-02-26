import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className={`footer ${visible ? 'show' : 'hide'}`}>
      <div className="footer-container">

        {/* COLUMNA 1 */}
        <div className="footer-column">
          <h3>Cortinas Lenox</h3>
          <p>
            Especialistas en cortinas Roller, Blackout, Dúo y soluciones
            motorizadas de alta calidad para tu hogar y oficina.
          </p>
        </div>

        {/* COLUMNA 2 */}
        <div className="footer-column">
          <h4>Productos</h4>
          <Link to="/">Roller Blackout</Link>
          <Link to="/">Roller Dual</Link>
          <Link to="/">Roller Dúo</Link>
          <Link to="/">Motorizadas</Link>
          <Link to="/">Cortina Vertical</Link>
        </div>

        {/* COLUMNA 3 */}
        <div className="footer-column">
          <h4>Información</h4>
          <Link to="/">Términos y Condiciones</Link>
          <Link to="/">Política de Privacidad</Link>
          <Link to="/">Contacto</Link>
          <Link to="/">Mapa del Sitio</Link>
        </div>

        {/* COLUMNA 4 */}
        <div className="footer-column social">
          <h4>Síguenos</h4>

          <div className="social-icons">
            <i className="fa-brands fa-facebook"></i>

            <a
              href="https://www.instagram.com/cortinaslenox?igsh=MW11dnpzdWdnbnp2bQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <i className="fa-brands fa-whatsapp"></i>
          </div>
        </div>

      </div>

      {/* PARTE INFERIOR */}
      <div className="footer-bottom">
        © 2026 Cortinas Lenox — Todos los derechos reservados.
      </div>
    </footer>
  );
}