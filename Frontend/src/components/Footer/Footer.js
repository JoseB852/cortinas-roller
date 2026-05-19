import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTop = () => {
    if (location.pathname !== "/") {
      navigate("/"); //  ir al home
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100); // pequeño delay para que cargue
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;
  
      setVisible(scrollBottom);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`footer ${visible ? "show" : ""}`}>
      <div className="footer-container">

        {/* IZQUIERDA */}
        <div className="footer-column">
          <h3 onClick={handleScrollTop} className="footer-logo">
            Cortinas Lenox
          </h3>
          © 2026 Cortinas Lenox — Todos los derechos reservados.
        </div>

        {/* CENTRO */}
        <div className="footer-column links">
          <Link to="/condition">Términos</Link>
          <Link to="/privacy">Privacidad</Link>
          <Link to="/contact">Contacto</Link>
          <Link to="/">Mapa</Link>
        </div>

        {/* DERECHA */}
        <div className="footer-column social">
          <div className="social-icons">

            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a href="https://www.instagram.com/cortinaslenox" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-whatsapp"></i>
            </a>

          </div>
        </div>

      </div>

      <div className="footer-bottom"></div>
    </footer>
  );
}