import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Revitalizing Serum",
    price: "$29.99",
    image: "https://via.placeholder.com/200",
    description: "A powerful anti-aging serum."
  },
  {
    name: "Moisturizing Cream",
    price: "$19.99",
    image: "https://via.placeholder.com/200",
    description: "A cream that keeps your skin hydrated."
  },
  {
    name: "Cleansing Gel",
    price: "$15.99",
    image: "https://via.placeholder.com/200",
    description: "A gentle cleansing gel for daily use."
  },
  // Add more products...
];

// Individual Product Card Component
const ProductCard = ({ product }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Scroll-trigger animation for cards
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl p-6"
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-bold text-pink-500 mt-4">{product.price}</p>
      </div>
    </div>
  );
};

// Products Component
const Products = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-pink-100 to-purple-300 py-16">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Beauty Products</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
