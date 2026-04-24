import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DetailProducts.css";

export default function DetailProducts() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        fetch("/data/products.json")
            .then(res => res.json())
            .then(data => {

                const found = data.find(
                    item => item.id === Number(id)
                );

                setProduct(found);

            });

    }, [id]);


    if (!product) {
        return (
            <div className="loading">
                Cargando producto...
            </div>
        )
    }


    return (

        <div className="detail-page">


            {/* HERO PRODUCTO */}

            <section className="product-hero">

                <div className="gallery-column">

                    <div className="main-image">
                        <img
                            src={product.image}
                            alt={product.name}
                        />
                    </div>

                    <div className="gallery-grid">

                        <img
                            src={product.image}
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

                    <span className="product-label">
                        Colección Premium
                    </span>

                    <h1>
                        {product.name}
                    </h1>

                    <p className="intro">
                        Diseñadas a medida para controlar luz,
                        privacidad y aportar diseño a cada espacio.
                        Texturas premium y terminaciones elegantes.
                    </p>



                    <div className="spec-grid">

                        <div className="spec-item">
                            <h4>Tela</h4>
                            <p>Blackout Premium</p>
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
                            <p>Manual / Motor</p>
                        </div>

                    </div>



                    <div className="description">

                        <h3>Descripción</h3>

                        <p>
                            Una solución elegante y funcional para dormitorios,
                            salas de estar y proyectos residenciales. Su tejido
                            ayuda a bloquear luz, mejorar privacidad y aportar
                            una estética minimalista.
                        </p>

                    </div>


                    <button className="quote-button">
                        Solicitar Cotización
                    </button>


                    <div className="sku-box">
                        SKU: {product.sku}
                    </div>


                </div>

            </section>



            {/* BLOQUE EDITORIAL */}

            <section className="editorial-banner">

                <img
                    src="/images/editorial-room.jpg"
                    alt=""
                />

            </section>



            {/* BENEFICIOS */}

            <section className="benefits">

                <div className="benefit">
                    <h4>Hechas a Medida</h4>
                    <p>Fabricación personalizada.</p>
                </div>

                <div className="benefit">
                    <h4>Instalación Profesional</h4>
                    <p>Montaje y asesoría.</p>
                </div>

                <div className="benefit">
                    <h4>Garantía</h4>
                    <p>5 años.</p>
                </div>

            </section>



            {/* DETALLE EXTRA */}

            <section className="technical-section">

                <h2>Especificaciones Técnicas</h2>

                <div className="tech-grid">

                    <div>
                        <h5>Ancho máximo</h5>
                        <p>340 cm</p>
                    </div>

                    <div>
                        <h5>Caída máxima</h5>
                        <p>300 cm</p>
                    </div>

                    <div>
                        <h5>Mantenimiento</h5>
                        <p>Limpieza en seco</p>
                    </div>

                    <div>
                        <h5>Opciones</h5>
                        <p>Manual / Motorizada</p>
                    </div>

                </div>

            </section>


        </div>

    )

}