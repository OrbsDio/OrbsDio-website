import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./Components/Loader/Loader"; // Initial loader
import Navbar from "./Components/Specific/Navbar";
import "./App.css";
import Products from "./Pages/Products";

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
            <Route exact path="/products" element={<Products />} />
          </Routes>
        </Suspense>
      </>
      {/* )} */}
    </Router>
  );
};

export default App;
