import React from 'react';
import Card from './Card/Card';
import Services from '../components/Services/Services';
import Quoter from '../components/Quoter/Quoter';



export default function Home() {
  return (
    <main className="main-layout">
      <Card />
      <Services />
      <Quoter />
    </main>
  );
}
