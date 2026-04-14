import React from 'react';
import Card from './Card/Card';
import Services from '../components/Nabvar/Services/Services';
import Quoter from '../components/Nabvar/Quoter/Quoter';


export default function Home() {
  return (
    <div className="container">
      <div className="section">
        <Card />
      </div>

      <div className="section">
        <Services />
      </div>

      <div className="section">
        <Quoter />
      </div>
    </div>
  );
}
