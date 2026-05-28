import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Navbar.jsx"; // Navbar component
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Features from "./pages/Feature.jsx";
import About from "./components/AboutPage.jsx";
import ContentPage from "./components/ContactPage.jsx"; // Contact page

function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Floating Navbar across all pages */}
      <Navbar />
      
      {/* Main Routes - Individual pages handle their own padding to prevent top gaps */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContentPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
