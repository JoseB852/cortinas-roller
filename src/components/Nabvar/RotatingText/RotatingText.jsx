import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function RotatingText({
  texts = [],
  rotationInterval = 2000,
  mainClassName = ""
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  return (
    <span className={mainClassName} style={{ display: "inline-block" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          style={{ display: "inline-block" }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}