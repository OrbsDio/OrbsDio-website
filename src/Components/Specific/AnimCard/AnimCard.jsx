import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimCard = () => {
  const mainText = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Split text into individual characters and wrap each character in a span element
    const splitTextToLetters = (element) => {
      const text = element.textContent;
      const letters = text.split("");
      element.innerHTML = ""; // Clear the existing text
      letters.forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.className =
          "mainhead inline-block opacity-0 transform translate-y-5"; // Tailwind classes for initial state
        element.appendChild(span);
      });
    };

    // Apply splitting to the text
    splitTextToLetters(mainText.current);

    const letters = mainText.current.querySelectorAll("span");

    // Timeline for the reveal animation and image movement
    const tl = gsap.timeline();

    // Animate the image moving horizontally across the text
    tl.fromTo(
      imageRef.current,
      { x: "-200%" },
      {
        x: "250%", // Image moves to the right, off-screen
        rotate: 360,
        duration: 3,
        ease: "power2.inOut",
      }
    )

      .fromTo(
        letters, // Target each letter span
        { opacity: 0, x: 20 }, // Initial state for each letter
        {
          opacity: 1,
          x: 0,
          stagger: 0.04,
          duration: 1,

          ease: "power2.out",
        },
        "-=2" // Overlap with image moving for a smooth effect
      )
      // Move the image to the bottom of the text after revealing the letters
      .to(
        imageRef.current,
        {
          y: 200, // Move the image below the text
          x: "0%",
          duration: 2,
          ease: "power3.out",
        },
        "+=0.5" // Delay for a smoother transition
      );
  }, []);

  return (
    <div className="mainhead w-full h-screen py-20 flex justify-center items-start gap-5 overflow-hidden relative bg-white pt-20">
      <div className="relative flex items-start">
        <h2
          ref={mainText}
          className="text-[6vw] font-serif whitespace-nowrap tracking-[0.5rem]" // Adjust letter spacing
        >
          B e a u t y &nbsp; I n &nbsp; O u r &nbsp; B r a n d
        </h2>
      </div>
      <span className="absolute w-full h-full top-0 left-0 flex justify-center items-start pt-20">
        <img
          ref={imageRef}
          className="w-[15rem] h-auto object-cover rounded-full"
          src="https://imgs.search.brave.com/lAc-sJVB-rSt4r80mPDc9p71niBVgg-3t-4n2_ONTxE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzUxV2kxb1lOUHhM/LmpwZw"
          alt="brand"
          width={500}
          height={500}
        />
      </span>
    </div>
  );
};

export default AnimCard;
