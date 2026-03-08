// Importar todos los JSON usando import
import roller from './roller.json';
import comercial from './comercial.json';
import rollerDetalle from './rollerDetalle.json';
import blackoutVista from './blackoutVista.json';
import comercialVista from './comercialVista.json';
import products from './products.json';
import services from './services.json';
import intro from './intro.json';

// Exportar cada uno individualmente
export {
  roller,
  comercial,
  rollerDetalle,
  blackoutVista,
  comercialVista,
  products,
  services,
  intro
};

// Crear y exportar el objeto combinado
const allData = {
  roller,
  comercial,
  rollerDetalle,
  blackoutVista,
  comercialVista,
  products,
  services,
  intro
};

export default allData;