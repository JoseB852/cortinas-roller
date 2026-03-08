import { useEffect, useState } from "react";
import React from 'react';
import './Services.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [introData, setIntroData] = useState(null);

  useEffect(() => {
    // Cargar servicios desde services.json
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data); // services.json es directamente un array
      })
      .catch((err) => console.error("Error cargando services:", err));

    // Cargar intro desde intro.json
    fetch("/data/intro.json")
      .then((res) => res.json())
      .then((data) => {
        setIntroData(data); // intro.json es directamente el objeto intro
      })
      .catch((err) => console.error("Error cargando intro:", err));
  }, []);

  return (
    <div className="content-services">
      <div className="services-inner">
        
        <div className="description-services">
          {introData && (
            <>
              <h2>{introData.title}</h2>
              <h3>{introData.subtitle}</h3>
              <p>{introData.text}</p>
            </>
          )}
        </div>

        <div className="cubes-container">
          {services.map((service, index) => (
            <div className="cube-services" key={service.id || index} tabIndex="0">
              <img src={service.imgFront} alt={service.title} />
              <h3>{service.title}</h3>

              <div
                className="info"
                style={{ backgroundImage: `url(${service.imgBack})` }}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}