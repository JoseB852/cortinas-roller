import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

import Nabvar from './components/Nabvar/Nabvar';
import Footer from './components/Nabvar/Footer/Footer';
import Whatsapp from './components/Nabvar/Whatsapp/Whatsapp';
import ScrollToTop from './components/Nabvar/ScrollToTop/ScrollToTop';

// Vistas
import Home from './views/Home';
import Card from './views/Card/Card';
import Comercial from './views/Comercial/Comercial';
import ComercialDetalle from "./views/ComercialDetalle/ComercialDetalle";
import ProductoDetalle from './views/ProductoDetalle/ProductoDetalle';
import Blackout from './views/Blackout/Blackout';
import Contact from './views/Contact/Contact';
import Us from './views/Us/Us';
import Catalog from './views/Catalog/Catalog';
import Privacy from './views/Privacy/Privacy';
import Condition from './views/Condition/Condition';
import ResidencialBody from './components/Nabvar/ResidencialBody/ResidencialBody';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nabvar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/residencial" element={<ResidencialBody />} />
          <Route path="/comercial" element={<Comercial />} />
          <Route path="/productoDetalle/:id" element={<ProductoDetalle />} />
          <Route path="/blackout/:id" element={<Blackout />} />
          <Route path="/comercial/:id" element={<ComercialDetalle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/us" element={<Us />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/condition" element={<Condition />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </main>

      <Whatsapp />
      <Footer />
    </BrowserRouter>
  );
}