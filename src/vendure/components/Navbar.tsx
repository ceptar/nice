import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar() {


  // Value being driven by scrolling (e.g. height)
  const initialValue = 140;
  const finalValue = 88;
  const thresholdY = 170; // set the scroll position where you want the state change

  const speed = 1;
  const scrollDistance = (initialValue - finalValue) / speed;

  const startY = 0; // scroll position when transition starts
  const endY = startY + scrollDistance;

  const { scrollY } = useScroll();
  const scrollOutput = useTransform(
    scrollY,
    [startY, endY, endY],
    [initialValue, finalValue, finalValue],
    {
      clamp: false,
    }
  );

  const [isPastThreshold, setIsPastThreshold] = useState(false);
  useEffect(
    () => scrollY.onChange((latest) => setIsPastThreshold(latest > thresholdY)),
    []
  );

  return (
    <motion.div className="navbar" style={{ height: scrollOutput }}>
      <motion.div
        className="animated"
        initial={{ opacity: 0, backgroundColor: "#fff" }}
        animate={{
          opacity: isPastThreshold ? 1 : 0,
          backgroundColor: isPastThreshold ? "#fff" : "#000",
        }}
      ></motion.div>
    </motion.div>
  );
}
