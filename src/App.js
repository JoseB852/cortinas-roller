import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Nabvar from './components/Nabvar/Nabvar';
import Footer from './components/Nabvar/Footer/Footer';
import SectionInfo from './components/Nabvar/SectionInfo/SectionInfo';
import Whatsapp from './components/Nabvar/Whatsapp/Whatsapp';

import Home from './views/Home';
import Card from './views/Card/Card';
import Comercial from './views/Comercial/Comercial';
import ProductoDetalle from './views/ProductoDetalle/ProductoDetalle';
import Blackout from './views/Blackout/Blackout';

export default function App() {
  return (
    <BrowserRouter>
      <Nabvar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Card />} />
          <Route path="/comercial" element={<Comercial />} />
          <Route path="/productoDetalle/:id" element={<ProductoDetalle />} />
          <Route path="/blackout/:id" element={<Blackout/>} />
        </Routes>
      </main>

      <SectionInfo />
      <Whatsapp />
      <Footer />
    </BrowserRouter>
  );
}
