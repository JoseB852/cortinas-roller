import { useEffect, useState } from "react";
import React from 'react';
import './Services.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [introData, setIntroData] = useState(null);

  useEffect(() => {
    fetch("/data/roller.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setIntroData(data.intro); // Ahora viene del JSON
      })
      .catch((err) => console.error(err));
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
            <div className="cube-services" key={index} tabIndex="0">
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
