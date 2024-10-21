import React, { useEffect } from "react";
import { gsap, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    const AllText = document.querySelector(".textPara").textContent.split("");
    let clutter = "";

    AllText.forEach((text) => {
      if (clutter === " ") {
        clutter += `<span>&nbsp;</span>`;
      }
      clutter += `<span>${text}</span>`;
    });

    const textPara = document.querySelector(".textPara");
    textPara.innerHTML = clutter;

    gsap.set(".textPara span", { opacity: 0.1 });
    gsap.to(".textPara span", {
      opacity: 1,
      stagger: 0.03,
      ease: Power4,
      scrollTrigger: {
        trigger: ".para",
        top: "top 10%",
        end: "bottom 90%",
        scrub: 2,
      },
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="para py-16 section w-full h-screen  relative font-['PP_Neue_Machina_Plain_Light']">
      <h2 className="text-6xl text-center w-full pb-16">About:</h2>
      <div className="flex w-[100%] flex-row items-center justify-around sticky top-0">
        {/* Text Section */}
        <div className="text w-[45%] flex flex-col items-start justify-center ml-5">
          <h3 className="textPara text-3xl font-light leading-[2.8rem] max-lg:text-xl">
            Working with the Significo team has been such a pleasure! We took on
            a significant project to rebuild our entire platform and the team
            approached the project with our best interests in mind. They
            continue to prioritize the end user experience and offer amazing
            expertise in all of the areas we lack internally. I would personally
            be lost without this team, their ability to problem solve, their
            openness to feedback and desire to build the product like it is
            their own.
          </h3>
        </div>
        {/* Image Section */}
        <div className="imagee w-[40%] h-full bg-red-500  overflow-hidden ">
          <img
            className=" w-full object-cover h-[60vh]"
            src="https://imgs.search.brave.com/osJGMcr4DTDx8ZbQ0uaDyfXmqyjQOTjbuEepAbtgsuQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODE3/MTE0MDcvcGhvdG8v/ZG9jdG9yLWluLWhv/c3BpdGFsLWNvcnJp/ZG9yLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1tNWRNb2Fw/NUJfTlNjN2QxRjky/SFgxckFYck80VzJB/NnN5M2I0aWNURENz/PQ"
            alt="Miranda Ernst"
            width={400}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
