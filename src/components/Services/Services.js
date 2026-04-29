import { useEffect, useContext } from "react";
import React from "react";
import "./Services.css";
import RotatingText from "../RotatingText/RotatingText";
import Banner from "../Banner/Banner";
import { StoreContext } from "../Context/StoreContext";



/* =========================
 Services
========================= */

export default function Services() {

  const { services, introData, getServicesData } = useContext(StoreContext);



  useEffect(() => {
    getServicesData();
  }, [
    getServicesData
  ]);



  return (

    <div className="content-services">
      <div className="services-inner">

        {/* ======================
   Intro
  ====================== */}

        <div className="description-services">

          {introData && (

            <>

              <h2 className="title-intro">

                {introData.title}

                {" "}

                <RotatingText
                  texts={[
                    "Privacidad",
                    "Oscuridad total",
                    "Control de luz",
                    "Diseño moderno",
                    "Aislamiento térmico"
                  ]}

                  mainClassName="rotating-highlight"rotationInterval={3000}/>
              </h2>
              <h3>
                {introData.subtitle}
              </h3>
              <p>
                {introData.text}
              </p>

            </>

          )}

        </div>



        {/* ======================
   Services Grid
  ====================== */}

        <div className="cubes-container">

          {
            services.map(
              (service, index) => (

                <div
                  key={
                    service.id || index
                  }
                  className="
  cube-services
  "
                  tabIndex="0"
                >

                  <img
                    src={service.imgFront}
                    alt={service.title}
                  />


                  <h3>
                    {service.title}
                  </h3>



                  <div
                    className="info"
                    style={{
                      backgroundImage:
                        `url(${service.imgBack})`
                    }}
                  >

                    <h3>
                      {service.title}
                    </h3>

                    <p>
                      {service.description}
                    </p>

                  </div>

                </div>

              ))
          }

        </div>



        <Banner />

      </div>

    </div>

  )

}