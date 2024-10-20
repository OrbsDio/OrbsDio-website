import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const cardsRef = useRef([]);
  const textRef = useRef(null); // Reference for the text container
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top center", // Trigger when card reaches center of viewport
        end: "bottom center",
        onEnter: () => {
          setActiveCard(index);
          gsap.to(card, { backgroundColor: "#FFD700", duration: 0.5 }); // Change card color
        },
        onLeave: () => {
          gsap.to(card, { backgroundColor: "#FFFFFF", duration: 0.5 }); // Reset card color on leave
        },
        onEnterBack: () => {
          setActiveCard(index);
          gsap.to(card, { backgroundColor: "#FFD700", duration: 0.5 }); // Change card color
        },
        onLeaveBack: () => {
          gsap.to(card, { backgroundColor: "#FFFFFF", duration: 0.5 }); // Reset card color on leave back
        },
      });
    });
  }, []);

  const cardContent = [
    "Fair and Lovely",
    "Skin Care and Treatment",
    "Lips and Lip Care",
    "Hairs and treatment",
  ];

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: "100%", opacity: 0 }, // Start from below with 0 opacity
        { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" } // Move up and fade in
      );
    }
  }, [activeCard]);

  return (
    <div className="craft   section w-full px-10 flex gap-10 justify-between items-start py-10 relative">
      <div className="lText w-[40%] sticky left-0 top-0">
        <h1 className="text-[4.8rem] leading-[6rem] mt-20 font-['PP_Neue_Machina_Plain_Light'] mb-10">
          Our Products
        </h1>
        <div className="w-fit px-10 py-5 relative overflow-hidden">
          <div className="overflow-hidden font-['PP_Neue_Machina_Plain_Light'] mt-[8rem] text-5xl">
            <span className="inline-block" ref={textRef}>
              {activeCard !== null ? cardContent[activeCard] : "Our Solutions"}
            </span>
          </div>
        </div>
      </div>
      <div className="cardsMain flex flex-col gap-10 w-1/2 items-center h-full">
        {cardContent.map((_, index) => (
          <Card key={index} ref={(el) => (cardsRef.current[index] = el)} />
        ))}
      </div>
    </div>
  );
};

const Card = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="cardM w-[30vw] h-[20rem] text-black border border-black max-lg:w-[25vw] max-lg:h-[16rem]"
    >
      This is the card
    </div>
  );
});

export default Products;
