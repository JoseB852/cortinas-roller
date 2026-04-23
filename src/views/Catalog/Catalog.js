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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  let filteredProducts = products.filter(product => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchType =
      selectedTypes.length === 0 ||
      selectedTypes.some(type =>
        product.category.toLowerCase().includes(type.toLowerCase())
      );

    return matchCategory && matchType;
  });

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

  if (loading) {
    return <p className="loading">Cargando catálogo...</p>;
  }

  return (
    <section className="main-content">

      {/* SIDEBAR */}
      <aside className="filter">
        <h2>Filtros</h2>

        <AccordionSection title="Categorías">
          <label><input type="checkbox" onChange={() => handleCategoryChange("roller-blackout")} /> Roller Blackout</label>
          <label><input type="checkbox" onChange={() => handleCategoryChange("roller-sunscreen")} /> Roller Screen</label>
          <label><input type="checkbox" onChange={() => handleCategoryChange("roller-dual")} /> Dúo / Día-Noche</label>
          <label><input type="checkbox" onChange={() => handleCategoryChange("roller-motorizada")} /> Motorizadas</label>
        </AccordionSection>

        <AccordionSection title="Tipo de tela">
          <label><input type="checkbox" onChange={() => handleTypeChange("blackout")} /> Blackout</label>
          <label><input type="checkbox" onChange={() => handleTypeChange("sunscreen")} /> Screen</label>
          <label><input type="checkbox" onChange={() => handleTypeChange("dual")} /> Dúo</label>
        </AccordionSection>
      </aside>

      {/* CONTENIDO */}
      <main className="collections">

        <div className="header">
          <div>
            <h2>Catálogo</h2>
            <span>{filteredProducts.length} productos</span>
          </div>

          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="">Ordenar</option>
            <option value="az">A-Z</option>
            <option value="precio-asc">Precio ↑</option>
            <option value="precio-desc">Precio ↓</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`product-card ${index % 5 === 0 ? "big" : ""}`}
            >
              <div className="image-wrapper">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-info">
                <h4>{product.name}</h4>
                <p>${product.price.toLocaleString("es-CL")}</p>
                <span>{product.category}</span>
              </div>
            </div>
          ))}
        </div>

      </main>
    </section>
  );
}