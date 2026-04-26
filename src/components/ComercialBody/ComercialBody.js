import {useEffect,useContext } from "react";
import "./ComercialBody.css";
import { StoreContext } from "../Context/StoreContext";
import { FaDollarSign,FaSun,FaCheckCircle,FaShieldAlt}from "react-icons/fa";
   
   
   
   /* =========================
    Icons
   ========================= */
   
   const iconMap = {
   
   dollar:
   <FaDollarSign />,
   
   sun:
   <FaSun />,
   
   check:
   <FaCheckCircle />,
   
   shield:
   <FaShieldAlt />
   
   };
   
   
   
   /* =========================
    Comercial Body
   ========================= */
   
   export default function ComercialBody(){
   
   const {bodyContent,getBodyContent} = useContext(StoreContext);
   
   useEffect(()=>{
   getBodyContent();},[
   getBodyContent
   ]);
   
   
   
   return(
   
   <>
   
   <h1 className="text-tiltle">
   ¿POR QUÉ LAS EMPRESAS?
   </h1>
   
   
   
   <div className="comercial-body">
   
   {
   bodyContent.map(
   (content)=>(
   
   <div
   key={content.id}
   className="body-one"
   >
   
   <div className="icon">
   {
   iconMap[
   content.icon
   ]
   }
   </div>
   
   
   <h1>
   {content.titulo}
   </h1>
   
   
   <p>
   {content.text}
   </p>
   
   </div>
   
   ))
   }
   
   </div>
   
   </>
   
   )
   
   }