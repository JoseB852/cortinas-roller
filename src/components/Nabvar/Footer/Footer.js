import { useEffect, useRef, useState } from 'react';
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

        <div className="footer-left">
          <p>© 2026 Cortina Lenox</p>
        </div>

        <div className="footer-center">
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
          <a href="#">Legal</a>
          <a href="#">Site Map</a>
        </div>

        <div className="footer-right">
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
    </footer>
  );
}