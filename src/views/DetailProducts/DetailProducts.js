import {useEffect,useContext} from "react";
import { useParams,Link} from "react-router-dom";
import { StoreContext} from "../../components/Context/StoreContext";
import "./DetailProducts.css";


/* =========================
 Detail Product
========================= */

export default function DetailProducts() {

    const { id } = useParams();
    const {selectedProduct, getProductById} = useContext(StoreContext);

    useEffect(() => {
        getProductById(id);
    }, [
        id,
        getProductById
    ]);
    if (!selectedProduct) {
        return (
            <div className="loading">
                Cargando producto...
            </div>
        )
    }

    return (
        <div className="detail-page">
            {/* Hero */}
            <section className="product-hero">
                <div className="gallery-column">
                    <div className="main-image">
                        <img
                            src={selectedProduct.image}
                            alt={
                                selectedProduct.name
                            }
                        />

                    </div>



                    <div className="gallery-grid">

                        <img
                            src={selectedProduct.image}
                            alt=""
                        />

                        <img
                            src="/images/detail-2.jpg"
                            alt=""
                        />

                        <img
                            src="/images/detail-3.jpg"
                            alt=""
                        />

                        <img
                            src="/images/detail-4.jpg"
                            alt=""
                        />

                    </div>

                </div>



                <div className="product-info">

                    <h1>
                        {selectedProduct.name}
                    </h1>


                    <p className="intro">
                        Diseñadas a medida para
                        controlar luz, privacidad
                        y aportar diseño.
                    </p>



                    <div className="spec-grid">

                        <div className="spec-item">
                            <h4>Tela</h4>
                            <p>
                                Blackout Premium
                            </p>
                        </div>

                        <div className="spec-item">
                            <h4>Privacidad</h4>
                            <p>Alta</p>
                        </div>

                        <div className="spec-item">
                            <h4>Aislación</h4>
                            <p>Térmica</p>
                        </div>

                        <div className="spec-item">
                            <h4>Accionamiento</h4>
                            <p>
                                Manual / Motor
                            </p>
                        </div>

                    </div>



                    <div className="description">

                        <h3>
                            Descripción
                        </h3>

                        <p>
                            Una solución elegante
                            y funcional para
                            espacios residenciales.
                        </p>

                    </div>



                    <Link to="/contact">

                        <button className="quote-button">
                            Solicitar Cotización
                        </button>

                    </Link>



                    <div className="sku-box">
                        SKU:
                        {
                            selectedProduct.sku
                        }
                    </div>

                </div>

            </section>



            {/* Editorial */}

            <section className="editorial-banner">

                <img
                    src="/images/editorial-room.jpg"
                    alt=""
                />

            </section>



            {/* Benefits */}

            <section className="benefits">

                <div className="benefit">
                    <h4>
                        Hechas a Medida
                    </h4>
                    <p>
                        Fabricación personalizada
                    </p>
                </div>


                <div className="benefit">
                    <h4>
                        Instalación Profesional
                    </h4>
                    <p>
                        Montaje y asesoría
                    </p>
                </div>


                <div className="benefit">
                    <h4>Garantía</h4>
                    <p>5 años</p>
                </div>

            </section>



            {/* Technical */}

            <section className="technical-section">

                <h2>
                    Especificaciones Técnicas
                </h2>


                <div className="tech-grid">

                    <div>
                        <h5>
                            Ancho máximo
                        </h5>
                        <p>340 cm</p>
                    </div>

                    <div>
                        <h5>
                            Caída máxima
                        </h5>
                        <p>300 cm</p>
                    </div>

                    <div>
                        <h5>
                            Mantenimiento
                        </h5>
                        <p>
                            Limpieza en seco
                        </p>
                    </div>

                    <div>
                        <h5>Opciones</h5>
                        <p>
                            Manual / Motorizada
                        </p>
                    </div>

                </div>

            </section>

        </div>

    )

}