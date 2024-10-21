import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "John Doe",
    content: "This product is amazing! I highly recommend it.",
    role: "Customer",
  },
  {
    name: "Jane Smith",
    content: "Excellent service, very satisfied!",
    role: "Client",
  },
  {
    name: "Sam Wilson",
    content: "Love this company, will definitely be back.",
    role: "Customer",
  },
];

const TestimonialCard = ({ testimonial, isCenter }) => {
  const cardRef = useRef(null);

  // Handle 3D tilt effect based on mouse position
  const handleMouseMove = (event) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left; // Mouse X relative to card
    const y = event.clientY - rect.top; // Mouse Y relative to card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 500,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  // Reset card tilt when mouse leaves
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`testimonial-card bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 p-10 rounded-3xl shadow-2xl text-center mx-4 transform transition-all duration-700 ease-out hover:shadow-2xl hover:scale-105 
      ${isCenter ? "scale-125 z-20" : "scale-85 z-10"} h-96`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <p className="text-xl italic text-white mb-4">"{testimonial.content}"</p>
      <h3 className="mt-4 text-2xl font-semibold text-white">
        {testimonial.name}
      </h3>
      <p className="text-white opacity-90">{testimonial.role}</p>
    </div>
  );
};

const TestimonialsSlider = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  // Slick slider settings
  const settings = {
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    infinite: true,
    autoplay: true, // Auto-slide feature
    autoplaySpeed: 3000, // Time delay for auto-sliding
    speed: 800, // Slide transition speed
    focusOnSelect: true,
    draggable: true,
    beforeChange: (current, next) => handleScale(next),
  };

  // GSAP scaling of center slide
  const handleScale = (centerIndex) => {
    const cards = gsap.utils.toArray(".testimonial-card");
    cards.forEach((card, index) => {
      gsap.to(card, {
        scale: index === centerIndex ? 1.25 : 0.85, // Larger scaling difference
        duration: 0.5,
        zIndex: index === centerIndex ? 20 : 10, // Raise center card to front
        ease: "power3.out",
      });
    });
  };

  useEffect(() => {
    handleScale(1); // Initial scale of center card

    const sections = gsap.utils.toArray(".testimonial-card");

    // Scroll-triggered animations
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 150, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 20%",
            scrub: true, // Parallax effect on scroll
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      className="h-screen bg-gray-100 py-20 overflow-hidden"
      ref={containerRef}
    >
      <h2 className="text-4xl text-center mb-12 font-bold">
        What Our Clients Say
      </h2>
      <Slider {...settings} ref={sliderRef} className="relative z-0">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            isCenter={index === 1}
          />
        ))}
      </Slider>
    </section>
  );
};

export default TestimonialsSlider;
