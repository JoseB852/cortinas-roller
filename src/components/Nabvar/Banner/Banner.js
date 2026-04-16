import React, { useState, useEffect } from "react";
import "./Banner.css";

const images = [
  "/images/banner-medidas.png",
  "/images/banner-medidas2.png",
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="container-banner">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`slide ${i === index ? "active" : ""}`}
          alt="banner"
        />
      ))}
    </div>
  );
}