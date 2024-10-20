import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./Components/Loader/Loader"; // Initial loader
import Navbar from "./Components/Specific/Navbar";
import "./App.css";

// Lazy loaded pages
const Home = lazy(() => import("./Pages/Home"));

const App = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <Router>
      {/* {loading ? (
        <Loader setLoading={handleLoadingComplete} />
      ) : ( */}
      <>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </>
      {/* )} */}
    </Router>
  );
};

export default App;
