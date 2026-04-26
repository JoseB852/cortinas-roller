import React, { createContext, useState, useCallback } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  /* =========================
     ESTADO GLOBAL
  ========================= */
  const [roller, setRoller] = useState([]);
  const [blackoutProducts, setBlackoutProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [comercial, setComercial] = useState([]);
  const [comercialVista, setComercialVista] = useState([]);
  const [loadingComercialVista, setLoadingComercialVista] = useState(false);
  const [comercialError, setComercialError] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rollerDetail, setRollerDetail] = useState(null);
  const [loadingRollerDetail, setLoadingRollerDetail] = useState(false);
  const [rollerDetailError, setRollerDetailError] = useState(null);
  const [bodyContent, setBodyContent] = useState([]);
  const [residencialContent, setResidencialContent] = useState([]);
  const [services, setServices] = useState([]);
  const [introData, setIntroData] = useState(null);

  /* =========================
     ROLLER PRODUCTS
  ========================= */
  const getRollerProducts = useCallback(async () => {
    try {
      const res = await fetch("/data/roller.json");
      if (!res.ok) throw new Error("Error cargando roller");
      const data = await res.json();
      setRoller(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* =========================
     BLACKOUT PRODUCTS
  ========================= */
  const getBlackoutProducts = useCallback(async () => {
    try {
      const res = await fetch("/data/blackoutVista.json");
      if (!res.ok) throw new Error("Error cargando blackout");
      const data = await res.json();
      setBlackoutProducts(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* =========================
     CATÁLOGO PRODUCTOS
  ========================= */
  const getProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch("/data/products.json");
      if (!res.ok) throw new Error("Error cargando catálogo");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  /* =========================
     COMERCIAL PRODUCTOS
  ========================= */
  const getComercialProducts = useCallback(async () => {
    try {
      const res = await fetch("/data/comercial.json");
      if (!res.ok) throw new Error("Error cargando comercial");
      const data = await res.json();
      setComercial(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getComercialVista = useCallback(async () => {
    try {
      setLoadingComercialVista(true);
      const res = await fetch("/data/comercialVista.json");
      if (!res.ok) throw new Error("Error cargando comercial detalle");
      const data = await res.json();
      setComercialVista(data);
    } catch (error) {
      console.error(error);
      setComercialError(error.message);
    } finally {
      setLoadingComercialVista(false);
    }
  }, []);

  /* =========================
     EMAIL
  ========================= */
  const sendContactEmail = useCallback(async (formData) => {
    try {
      setSendingEmail(true);
      const response = await fetch("http://localhost:3000/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      await response.json();
      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 2000);
    } catch (error) {
      console.error("Error enviando correo", error);
    } finally {
      setSendingEmail(false);
    }
  }, []);

  /* =========================
     PRODUCTO POR ID
  ========================= */
  const getProductById = useCallback(async (id) => {
    try {
      const res = await fetch("/data/products.json");
      if (!res.ok) throw new Error("Error cargando producto");
      const data = await res.json();
      const found = data.find((item) => item.id === Number(id));
      setSelectedProduct(found);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* =========================
     DETALLE ROLLER POR ID
  ========================= */
  const getRollerDetailById = useCallback(async (id) => {
    try {
      setLoadingRollerDetail(true);
      setRollerDetailError(null);
      const res = await fetch("/data/rollerDetalle.json");
      if (!res.ok) throw new Error("Error cargando detalle");
      const data = await res.json();
      const found = data.find((item) => item.id === Number(id));
      setRollerDetail(found);
    } catch (error) {
      console.error(error);
      setRollerDetailError(error.message);
    } finally {
      setLoadingRollerDetail(false);
    }
  }, []);

  /* =========================
     CONTENIDOS ESTÁTICOS
  ========================= */
  const getBodyContent = useCallback(async () => {
    try {
      const res = await fetch("/data/body.json");
      if (!res.ok) throw new Error("Error cargando body");
      const data = await res.json();
      setBodyContent(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getResidencialContent = useCallback(async () => {
    try {
      const res = await fetch("/data/residencial.json");
      if (!res.ok) throw new Error("Error cargando residencial");
      const data = await res.json();
      setResidencialContent(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* =========================
     SERVICIOS + INTRO
  ========================= */
  const getServicesData = useCallback(async () => {
    try {
      const [servicesRes, introRes] = await Promise.all([
        fetch("/data/services.json"),
        fetch("/data/intro.json"),
      ]);

      if (!servicesRes.ok || !introRes.ok) {
        throw new Error("Error cargando servicios");
      }

      const servicesData = await servicesRes.json();
      const intro = await introRes.json();

      setServices(servicesData);
      setIntroData(intro);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* =========================
     VALOR DEL CONTEXTO
  ========================= */
  const value = {
    // Roller
    roller,
    getRollerProducts,

    // Blackout
    blackoutProducts,
    getBlackoutProducts,

    // Catálogo
    products,
    loadingProducts,
    getProducts,

    // Comercial
    comercial,
    getComercialProducts,
    comercialVista,
    loadingComercialVista,
    comercialError,
    getComercialVista,

    // Email
    sendingEmail,
    emailSuccess,
    sendContactEmail,

    // Productos individuales
    selectedProduct,
    getProductById,
    rollerDetail,
    loadingRollerDetail,
    rollerDetailError,
    getRollerDetailById,

    // Contenidos
    bodyContent,
    getBodyContent,
    residencialContent,
    getResidencialContent,
    services,
    introData,
    getServicesData,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};