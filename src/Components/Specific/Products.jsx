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
          gsap.to(card.querySelector("img"), { filter: "none", duration: 0.5 }); // Make the image colorful
        },
        onLeave: () => {
          gsap.to(card.querySelector("img"), {
            filter: "grayscale(100%)",
            duration: 0.5,
          }); // Make the image black and white on leave
        },
        onEnterBack: () => {
          setActiveCard(index);
          gsap.to(card.querySelector("img"), { filter: "none", duration: 0.5 }); // Make the image colorful
        },
        onLeaveBack: () => {
          gsap.to(card.querySelector("img"), {
            filter: "grayscale(100%)",
            duration: 0.5,
          }); // Make the image black and white on leave back
        },
      });
    });
  }, []);

  const cardContent = [
    {
      title: "Fair and Lovely",
      image:
        "https://imgs.search.brave.com/jRbX20omhCcTC3QOZMfDndJfrl_DLnP7JtaK0fBo1Sc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS52b2d1ZS5jby51/ay9waG90b3MvNjZj/MzY4YTFkOGUxZDJj/YTgzMmY1ZTg5LzE6/MS9wYXNzL3VuZGVm/aW5lZA",
    },
    {
      title: "Skin Care and Treatment",
      image:
        "https://imgs.search.brave.com/Ylljx-sJnilbvLfTBsqgLNPjjxQ3vK46ySMEWun7v4Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jcmVk/b2JlYXV0eS5jb20v/Y2RuL3Nob3AvZmls/ZXMvQ0JfV2Vic2l0/ZV9TaG9wX0J5X0Nh/dGVnb3J5X0ZhbGxX/b3JsZG9mQ3JlZG9f/SGFpci5wbmc_dj0x/NzI0MTk4MDMzJndp/ZHRoPTQwMA",
    },
    {
      title: "Lips and Lip Care",
      image:
        "https://imgs.search.brave.com/2EdAj34eHIBKB5CW4JPA_rkb-TCI-jVAJA10GkYuhpQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jcmVk/b2JlYXV0eS5jb20v/Y2RuL3Nob3AvZmls/ZXMvQ0JfV2Vic2l0/ZV9TaG9wX0J5X0Nh/dGVnb3J5X0ZhbGxX/b3JsZG9mQ3JlZG9f/TWFrZXVwLnBuZz92/PTE3MjQxOTgwMzMm/d2lkdGg9NDAw", // Replace with your image URLs
    },
    {
      title: "Hairs and Treatment",
      image:
        "https://imgs.search.brave.com/ri33slqB3BtYKGIlQtJzjdsVIeeUe9eH4k8Bklkcygg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hbGx1cmUuY29t/L3Bob3Rvcy82NjE4/OTVmYWU3MGY5M2Y3/OTBhYThkZDYvMTox/L3dfMTYwMCxjX2xp/bWl0L2tlcmF0ZXNl/X2FiYl9hcHJpbF9w/cm9kdWN0X3Jldmll/d3MuanBn", // Replace with your image URLs
    },
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
    <div className="craft section w-full px-10 flex gap-10 justify-around items-start py-10 relative">
      <div className="lText w-[40%] sticky left-0 top-0">
        <h1 className="text-[4.8rem] leading-[6rem] mt-20 font-['PP_Neue_Machina_Plain_Light'] mb-10">
          Our Products
        </h1>
        <div className="w-fit px-10 py-5 relative overflow-hidden">
          <div className="overflow-hidden font-['PP_Neue_Machina_Plain_Light'] mt-[8rem] text-5xl">
            <span className="inline-block" ref={textRef}>
              {activeCard !== null
                ? cardContent[activeCard].title
                : "Our Solutions"}
            </span>
          </div>
        </div>
      </div>
      <div className="cardsMain flex flex-col gap-10  items-center h-full">
        {cardContent.map((card, index) => (
          <Card
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            imageSrc={card.image}
          />
        ))}
      </div>
    </div>
  );
};

const Card = React.forwardRef(({ imageSrc }, ref) => {
  return (
    <div
      ref={ref}
      className="cardM w-[30vw] h-[20rem] text-black border border-black max-lg:w-[25vw] max-lg:h-[16rem] flex flex-col items-center justify-center overflow-hidden"
    >
      <img
        src={imageSrc}
        alt="Product"
        className="w-full h-full object-cover transition duration-500 ease-in-out filter grayscale" // Start with grayscale filter
      />
    </div>
  );
});

export default Products;
