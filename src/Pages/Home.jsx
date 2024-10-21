import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimCard from "../Components/Specific/AnimCard/AnimCard";
import Products from "../Components/Specific/Products";
import About from "../Components/Specific/About/About";
import Testimonials from "../Components/Specific/Testimonials";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  return (
    <div className="w-screen h-full relative  pt-[5rem]">
      {/* section one start */}
      {/* <div className="flex w-full relative h-[100%] py-10"> */}
      <AnimCard />
      {/* </div> */}
      {/* section one end */}

      {/* section two start */}
      <Products />
      {/* section two end */}

      {/* section about start */}
      <About />
      {/* section about end */}

      {/* section two start */}
      <Testimonials />
      {/* section two end */}
    </div>
  );
};

export default Home;
