import React, {
  useState,
  useEffect,
  useRef,
  useContext
} from "react";

import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../components/Context/StoreContext";

import "./Catalog.css";


/* =================================
   ACCORDION
================================= */

function AccordionSection({ title, children }) {

  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState("0px");

  const contentRef = useRef(null);


  useEffect(() => {

    setHeight(
      isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px"
    );

  }, [isOpen]);


  return (
    <div className="filter-category">

      <h3 onClick={() => setIsOpen(!isOpen)}>
        {title}

        <FiChevronDown
          className={`icon ${
            isOpen ? "rotate" : ""
          }`}
        />
      </h3>

      <div
        ref={contentRef}
        className="accordion-content"
        style={{ maxHeight: height }}
      >
        {children}
      </div>

    </div>
  );

}



/* =================================
   CATALOG
================================= */

export default function Catalog() {

  const navigate = useNavigate();

  const {
    products,
    loadingProducts,
    getProducts
  } = useContext(StoreContext);



  /* Filters */

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [selectedTypes, setSelectedTypes] =
    useState([]);

  const [sortOption, setSortOption] =
    useState("");



  useEffect(() => {
    getProducts();
  }, [getProducts]);



  const handleCategoryChange = (category) => {

    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );

  };



  const handleTypeChange = (type) => {

    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(item => item !== type)
        : [...prev, type]
    );

  };



  /* Filtering */

  let filteredProducts = products.filter(
    (product) => {

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(
          product.category
        );

      const matchType =
        selectedTypes.length === 0 ||
        selectedTypes.some(type =>
          product.category
            .toLowerCase()
            .includes(
              type.toLowerCase()
            )
        );

      return (
        matchCategory &&
        matchType
      );

    }
  );



  /* Sorting */

  if (sortOption === "az") {

    filteredProducts.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name
        )
    );

  }



  if (loadingProducts) {
    return (
      <p className="loading">
        Cargando catálogo...
      </p>
    );
  }



  return (
    <section className="main-content">

      {/* =========================
          Filters
      ========================= */}

      <aside className="filter">

        <h2>Filtros</h2>


        <AccordionSection title="Categorías">

          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleCategoryChange(
                  "roller-blackout"
                )
              }
            />
            Roller Blackout
          </label>


          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleCategoryChange(
                  "roller-sunscreen"
                )
              }
            />
            Roller Screen
          </label>


          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleCategoryChange(
                  "roller-dual"
                )
              }
            />
            Dúo Día/Noche
          </label>


          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleCategoryChange(
                  "roller-motorizada"
                )
              }
            />
            Motorizadas
          </label>

        </AccordionSection>



        <AccordionSection title="Tipo de tela">

          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleTypeChange(
                  "blackout"
                )
              }
            />
            Blackout
          </label>


          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleTypeChange(
                  "sunscreen"
                )
              }
            />
            Screen
          </label>


          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleTypeChange(
                  "dual"
                )
              }
            />
            Dúo
          </label>

        </AccordionSection>

      </aside>



      {/* =========================
          Catalog
      ========================= */}

      <main className="collections">

        <div className="header">

          <div>
            <h2>Catálogo</h2>

            <span>
              {filteredProducts.length} productos
            </span>
          </div>


          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(
                e.target.value
              )
            }
          >
            <option value="">
              Ordenar
            </option>

            <option value="az">
              A-Z
            </option>

          </select>

        </div>



        <div className="product-grid">

          {filteredProducts.map(
            (product, index) => (

              <div
                key={product.id}
                onClick={() =>
                  navigate(
                    `/producto/${product.id}`
                  )
                }
                className={`product-card ${
                  index % 5 === 0
                    ? "big"
                    : ""
                }`}
              >

                <div className="image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>


                <div className="product-info">

                  <h4>
                    {product.name}
                  </h4>

                  <span>
                    {product.category.replaceAll(
                      "-",
                      " "
                    )}
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </main>

    </section>
  );

}