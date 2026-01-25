import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Nabvar from './components/Nabvar/Nabvar';
import Home from './views/Home';
import Footer from './components/Nabvar/Footer/Footer';
import Comercial from './views/Comercial/Comercial';
import Card from './views/Card/Card';
import SectionInfo from './components/Nabvar/SectionInfo/SectionInfo';
import Whatsapp from './components/Nabvar/Whatsapp/Whatsapp';
import ProductoDetalle from './views/ProductoDetalle/ProductoDetalle';

function App() {
  return (
    <BrowserRouter>
      <Nabvar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/comercial" element={<Comercial />} />
        <Route path="/productoDetalle/:id" element={<ProductoDetalle />} />
      </Routes>

      <SectionInfo />
      <Whatsapp />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
