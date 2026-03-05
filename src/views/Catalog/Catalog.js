import React, { useRef, useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./Catalog.css";

/* ACORDEÓN */
function AccordionSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div className="filter-category">
      <h3 onClick={() => setIsOpen(!isOpen)}>
        {title}
        <FiChevronDown className={`icon ${isOpen ? "rotate" : ""}`} />
      </h3>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="accordion-content"
      >
        {children}
      </div>
    </div>
  );
}

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("");

  /* FETCH */
  useEffect(() => {
    fetch("/data/roller.json")
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  /* FILTRO CATEGORÍAS */
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  /* FILTRO TIPOS */
  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  /* FILTRAR */
  let filteredProducts = products.filter(product => {

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchType =
      selectedTypes.length === 0 ||
      selectedTypes.some(type =>
        product.category.includes(type)
      );

    return matchCategory && matchType;
  });

  /* ORDENAR */
  if (sortOption === "precio-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "precio-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "az") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  return (
    <section className="main-content">

      {/* SIDEBAR */}
      <aside className="filter">
        <h2>Filtros</h2>

        <AccordionSection title="Categorias">
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange("roller-blackout")}
            />
            Roller Blackout
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange("roller-sunscreen")}
            />
            Roller Sunscreen
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange("roller-dual")}
            />
            Roller Dual
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange("roller-motorizada")}
            />
            Roller Motorizada
          </label>
        </AccordionSection>

        <AccordionSection title="Tipos">
          <label>
            <input
              type="checkbox"
              onChange={() => handleTypeChange("blackout")}
            />
            Blackout
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => handleTypeChange("sunscreen")}
            />
            Sunscreen
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => handleTypeChange("dual")}
            />
            Dual
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => handleTypeChange("motorizada")}
            />
            Motorizada
          </label>
        </AccordionSection>
      </aside>

      {/* CONTENIDO */}
      <main className="collections">

        <div className="option">
          <h2>PRODUCTOS</h2>

          <div className="sort-options">
            <label>
              Ordenar por:
              <select
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="az">Alfabéticamente</option>
                <option value="precio-asc">Precio menor a mayor</option>
                <option value="precio-desc">Precio mayor a menor</option>
              </select>
            </label>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h4>{product.name}</h4>
              <p>${product.price.toLocaleString("es-CL")}</p>
            </div>
          ))}
        </div>

      </main>
    </section>
  );
}