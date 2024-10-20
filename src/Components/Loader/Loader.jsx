import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Loader = ({ setLoading }) => {
  const loaderRef = useRef();
  const lettersRef = useRef([]);
  const progressRef = useRef();
  const [progress, setProgress] = useState(0); // State to track progress percentage

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoading(false), // Set loading to false after completion
    });

    // Animate loader scale
    tl.to(loaderRef.current, {
      duration: 1.5,
      scale: 1,
      ease: "power3.inOut",
      delay: 0.5,
    })

    // Animate letters scaling up and changing color
    .to(lettersRef.current, {
      duration: 1,
      scale: 3,
      opacity: 1,
      color: "#47e79c",
      ease: "power3.out",
      stagger: 0.1,
    })

    // Animate progress bar filling
    gsap.to(progressRef.current, {
      duration: 4, // Duration matches total loading time
      width: "100%",
      ease: "linear",
      onUpdate: function () {
        const currentProgress = Math.round(this.progress() * 100);
        setProgress(currentProgress); // Update progress percentage state
      },
    });

    // Animate loader height to 0 and move up letters
    tl.to(loaderRef.current, {
      duration: 0.9,
      height: 0,
      ease: "expo",
    }).to(lettersRef.current, {
      duration: 0.5,
      opacity: 0,
      y: -20, // Move letters up
      stagger: 0.1, // Stagger letters going up
    }, "<"); // "<" makes this start at the same time as the previous to()

  }, [setLoading]);

  // Helper function to break the text into spans for animation
  const renderLetters = () => {
    const text = "ORBsDIO";
    return text.split("").map((letter, i) => (
      <span
        key={i}
        ref={(el) => (lettersRef.current[i] = el)}
        className="inline-block text-white text-6xl font-bold tracking-[.75em] mx-4 font-dancing"
      >
        {letter}
      </span>
    ));
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50"
    >
      {/* Render animated letters */}
      <h1 className="animate-pulse">{renderLetters()}</h1>

      {/* Progress Bar */}
      <div className="mt-20 w-[80vw] bg-gray-700 rounded h-5 overflow-hidden">
        <div
          ref={progressRef}
          className="bg-[#47e79c] h-full"
          style={{ width: "0%" }} // Progress bar starts at 0%
        />
      </div>

      {/* Loading percentage text */}
      <p className="text-white mt-4 font-dancing text-lg">{progress}%</p>
    </div>
  );
};

export default Loader;
