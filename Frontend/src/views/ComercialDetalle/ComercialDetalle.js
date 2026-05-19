import {useContext,useEffect} from "react";
 import {useParams,useNavigate} from "react-router-dom";
 import "../Blackout/Blackout.css";
 import {StoreContext} from "../../components/Context/StoreContext";
 import {TextEffect} from "../../components/Text-Effect/TextEffect";
 
 
 /* =========================
  Comercial Detalle
 ========================= */
 
 export default function ComercialDetalle(){
 
 const {comercialVista,loadingComercialVista,comercialError,getComercialVista} = useContext(StoreContext);
 const { id } = useParams();
 const navigate = useNavigate();
 
 
 
 useEffect(()=>{
  getComercialVista();
 },[
  getComercialVista
 ]);
 
 
 
 const product =
 comercialVista.find(
 item=>item.id===id
 );
 
 
 
 /* Error */
 
 if(comercialError){
 
 return(
 
 <div className="error-container">
 
 <h2>Error</h2>
 
 <p>
 {comercialError}
 </p>
 
 <button
 onClick={()=>
 navigate(
 "/comercial"
 )
 }
 >
 Volver a Comercial
 </button>
 
 </div>
 
 )
 
 }
 
 
 
 /* Loading */
 
 if(
 loadingComercialVista
 ){
 return(
 <div className="loading-container">
 
 <div className="loading-spinner">
 </div>
 
 <p>
 Cargando...
 </p>
 
 </div>
 )
 }
 
 
 
 /* Not found */
 
 if(!product){
 
 return(
 
 <div className="not-found-container">
 
 <h2>
 Producto no encontrado
 </h2>
 
 <p>
 No se encontró un producto
 con el identificador:
 "{id}"
 </p>
 
 <button
 onClick={()=>
 navigate(
 "/comercial"
 )
 }
 >
 Volver a Comercial
 </button>
 
 </div>
 
 )
 
 }
 
 
 
 return(
 
 <div className="container-blackout">
 
 
 {/* Banner */}
 
 <div
 className="banner-blackout"
 style={{
 backgroundImage:
 `url(${
 product.banner?.src ||
 "/images/default-banner.jpg"
 })`
 }}
 />
 
 
 
 {/* Title */}
 
 <div className="title-blackout">
 
 <h1>
 
 <TextEffect
 per="char"
 preset="fade"
 >
 
 {
 product.titleBlock?.h1 ||
 "Título no disponible"
 }
 
 </TextEffect>
 
 </h1>
 
 
 <p>
 {
 product.titleBlock?.p ||
 "Descripción no disponible"
 }
 </p>
 
 </div>
 
 
 
 {/* Explorer Title */}
 
 <div className="explorer-title">
 
 <h1>
 {
 product.explorer?.title || ""
 }
 </h1>
 
 </div>
 
 
 
 {/* Sections */}
 
 {product.explorer?.sections ? (
 
 product.explorer.sections.map(
 (section,index)=>(
 
 <div
 key={section.id}
 className={`content-explorer ${
 index % 2 !== 0
 ? "reverse"
 : ""
 }`}
 >
 
 <div className="explorer">
 
 {section.text && (
 <p>
 {section.text}
 </p>
 )}
 
 </div>
 
 
 <div
 className="explorer-imagen"
 style={{
 backgroundImage:
 `url(${section.image})`
 }}
 />
 
 </div>
 
 ))
 
 ):(
 
 <div className="no-sections">
 
 <p>
 No hay secciones disponibles
 para mostrar
 </p>
 
 </div>
 
 )}
 
 </div>
 
 )
 
 }