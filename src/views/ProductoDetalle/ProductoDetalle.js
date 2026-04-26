import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../components/Context/StoreContext";
import "./ProductoDetalle.css";



/* =========================
 Producto Detalle
========================= */

export default function ProductoDetalle() {

  const { id } = useParams();

  const { rollerDetail, loadingRollerDetail, rollerDetailError, getRollerDetailById } = useContext(StoreContext);



  useEffect(() => {

    getRollerDetailById(
      id
    );

  }, [
    id,
    getRollerDetailById
  ]);



  /* Loading */

  if (
    loadingRollerDetail
  ) {

    return (

      <div className="main-content">

        <div className="loading-container">

          <div className="loading-spinner">
          </div>

          <p>
            Cargando...
          </p>

        </div>

      </div>

    )

  }



  /* Error */

  if (
    rollerDetailError
  ) {

    return (

      <div className="main-content">

        <div className="error-container">

          <h2>Error</h2>

          <p>
            {rollerDetailError}
          </p>

          <button
            onClick={() =>
              window.history.back()
            }
          >
            Volver
          </button>

        </div>

      </div>

    )

  }



  /* Not found */

  if (!rollerDetail) {

    return (

      <div className="main-content">

        <div className="not-found-container">

          <h2>
            Producto no encontrado
          </h2>

          <p>
            No se encontró un producto
            con el ID:
            {id}
          </p>

          <button
            onClick={() =>
              window.history.back()
            }
          >
            Volver
          </button>

        </div>

      </div>

    )

  }



  return (

    <div className="main-content">

      <div className="container-detalle">


        {/* ======================
  Video
 ====================== */}

        <div className="video-contenedor">

          <video
            src={
              rollerDetail.hero?.src
            }
            autoPlay
            loop
            muted
            playsInline
          />

        </div>



        {/* ======================
  Intro
 ====================== */}

        <div className="introduccion">

          <h1>
            {
              rollerDetail.intro?.title
            }
          </h1>

          <h4>
            {
              rollerDetail.intro?.subtitle
            }
          </h4>

        </div>



        <div className="introduccion-one">

          <p>
            {
              rollerDetail.intro?.description
            }
          </p>

        </div>



        <div className="titulo-one">
          <h1>
            Explore Lighting
          </h1>
        </div>



        {/* ======================
  Main Sections
 ====================== */}

        {rollerDetail.sections?.map(
          (section, index) => (

            <div
              key={section.id}
              className={`content ${index % 2 !== 0
                  ? "reverse"
                  : ""
                }`}
            >

              <div
                className="content-image"
                style={{
                  backgroundImage:
                    `url(${section.image})`
                }}
              />



              <div className="content-description">

                <h2>
                  {section.title}
                </h2>

                <p>
                  {section.text}
                </p>

                <button className="button-explorer">
                  Explorar
                </button>

              </div>

            </div>

          ))}



        {/* ======================
  Explore Section
 ====================== */}

        {rollerDetail.explore && (

          <div className="explore-wrapper">


            <div className="half-header">

              <h2>
                {
                  rollerDetail.explore.title
                }
              </h2>

              <p>
                {
                  rollerDetail.explore.description
                }
              </p>

            </div>



            <div className="half-row">

              {
                rollerDetail.explore.items?.map(
                  item => (

                    <div
                      key={item.id}
                      className="content-half"
                    >

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.text}
                      </p>

                    </div>

                  ))
              }

            </div>

          </div>

        )}

      </div>

    </div>

  )

}