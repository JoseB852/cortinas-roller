import { useEffect, useRef, useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < lastScrollY.current) {
     
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
      <ul className="footer-content">
        <li>2026 Roller.</li>
        <li>Privacy Policy</li>
        <li>Cookie Preferences</li>
        <li>Legal</li>
        <li>Site Map</li>
        <li>Site Feedback</li>

        <li><i className="fa-brands fa-facebook"></i></li>

        <li>
          <a
            href="https://www.instagram.com/cortinaslenox?igsh=MW11dnpzdWdnbnp2bQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>

        <li><i className="fa-brands fa-whatsapp"></i></li>
      </ul>
    </footer>
  );
}
