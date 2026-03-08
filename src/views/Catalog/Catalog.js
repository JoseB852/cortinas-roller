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

  /* FETCH - CORREGIDO */
  useEffect(() => {
    fetch("/data/products.json") // Cambiado a products.json
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setProducts(data); // data es directamente el array de productos
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando productos:", err);
        setLoading(false);
      });
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
        product.category.toLowerCase().includes(type.toLowerCase())
      );

    return matchCategory && matchType;
  });

  /* ORDENAR */
  if (sortOption === "precio-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortOption === "precio-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (sortOption === "az") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  // Mostrar loading mientras carga
  if (loading) {
    return (
      <section className="main-content">
        <div className="loading-container">
          <p>Cargando productos...</p>
        </div>
      </section>
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
          <h2>PRODUCTOS ({filteredProducts.length})</h2>

          <div className="sort-options">
            <label>
              Ordenar por:
              <select
                onChange={(e) => setSortOption(e.target.value)}
                value={sortOption}
              >
                <option value="">Seleccionar</option>
                <option value="az">Alfabéticamente (A-Z)</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
              </select>
            </label>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h4>{product.name}</h4>
                <p>${product.price.toLocaleString("es-CL")}</p>
                <small>SKU: {product.sku}</small>
                <small>Stock: {product.stock} unidades</small>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No hay productos que coincidan con los filtros seleccionados.</p>
            </div>
          )}
        </div>

      </main>
    </section>
  );
}