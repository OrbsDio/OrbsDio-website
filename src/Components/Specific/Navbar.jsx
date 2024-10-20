import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import HamburgerMenu from "react-hamburger-menu"; // Import react-hamburger-menu
import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const fullRef = useRef(null);
  const navRef = useRef(null); // Create a ref for the navbar
  const tl = useRef(null); // Create a ref for the timeline
  const [scrollDirection, setScrollDirection] = useState("up"); // Track scroll direction

  // Set up GSAP timeline
  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });

    // Set initial position before any animation
    fullRef.current.style.right = "-40%";

    // Slide-in animation for #full
    tl.current.to(fullRef.current, {
      right: 0,
      top: "10%",
      duration: 0.6,
      ease: "power3.inOut",
    });

    // Animate h4 elements
    tl.current.fromTo(
      fullRef.current.querySelectorAll("h4"),
      { x: 150, opacity: 0 }, // Starting values
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.2 } // Ending values
    );

    // Control the timeline based on isOpen state
    if (isOpen) {
      tl.current.play(); // Play the timeline to open
    } else {
      tl.current.reverse(); // Reverse the timeline to close
    }

    // Reset position after closing
    tl.current.eventCallback("onReverseComplete", () => {
      fullRef.current.style.right = "-40%";
    });
  }, [isOpen]);

  const handleMenuClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setIsOpen((prev) => !prev); // Toggle the state
  };

  // Scroll detection
  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Determine scroll direction
      if (scrollTop > lastScrollTop) {
        setScrollDirection("down"); // Scrolling down
        gsap.to(navRef.current, { y: "-100%", duration: 0.3 }); // Move navbar up
      } else {
        setScrollDirection("up"); // Scrolling up
        gsap.to(navRef.current, { y: "0%", duration: 0.3 }); // Move navbar down
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, []);

  return (
    <nav
      ref={navRef}
      className="nav w-screen fixed flex items-center justify-between top-0  px-[4rem] py-[2rem] z-[9999] transition-transform duration-300"
    >
      <h1>LOGO</h1>

      <div className="w-[80%] flex gap-[4.5rem] items-center justify-end text-2xl relative">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">About</NavLink>
        <NavLink to="/">Products</NavLink>
        <NavLink to="/">Contact</NavLink>
      </div>

      <HamburgerMenu
        isOpen={isOpen}
        menuClicked={handleMenuClick}
        width={28}
        height={18}
        strokeWidth={3}
        rotate={0}
        color="black"
        borderRadius={0}
        animationDuration={0.5}
        id="open" // Assign ID to differentiate click detection
      />

      <div
        id="full"
        ref={fullRef}
        style={{ position: "absolute" }} // Corrected position property
      >
        <NavLink to="/">
          <h4>Home</h4>
        </NavLink>
        <NavLink to="/">
          <h4>About</h4>
        </NavLink>
        <NavLink to="/">
          <h4>Products</h4>
        </NavLink>
        <NavLink to="/">
          <h4>Courses</h4>
        </NavLink>
        <NavLink to="/">
          <h4>Contact</h4>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
