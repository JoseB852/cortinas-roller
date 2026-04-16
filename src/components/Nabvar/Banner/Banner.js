import React from "react";
import "./Banner.css";

export default function Banner() {
  return (
    <div className="container-banner">
      <div className="slider">
        <div className="slide">
          <img src="/images/banner-medidas.png" alt="banner 1" />
        </div>

        <div className="slide">
          <img src="/images/banner-medidas2.png" alt="banner 2" />
        </div>
      </div>
    </div>
  );
}