import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const PageTransition = ({ children }) => {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    return () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: "-100vh",
        duration: 0.5,
        ease: "power3.in",
      });
    };
  }, []);

  return <div className="h-full" ref={containerRef}>{children}</div>;
};

export default PageTransition;
