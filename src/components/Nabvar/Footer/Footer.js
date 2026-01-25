import { useEffect, useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [visible, setVisible] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < lastScrollY) {
        // scroll hacia arriba → ocultar
        setVisible(false);
      } else {
        // scroll hacia abajo → mostrar
        setVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className={`footer ${visible ? 'show' : 'hide'}`}>
      <ul className="footer-content">
        <li>2026 Roller.</li>
        <li>Privacy Policy</li>
        <li>Cookie Preferences</li>
        <li>Legal</li>
        <li>Site Map</li>
        <li>Site Feedback</li>
        <li><i class="fa-brands fa-facebook"></i></li>
        <li>
          <a href="https://www.instagram.com/cortinaslenox?igsh=MW11dnpzdWdnbnp2bQ==" target="_blank" rel="noopener noreferrer" >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li><i class="fa-brands fa-whatsapp"></i></li>
      </ul>
    </footer>
  );
}
