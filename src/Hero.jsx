import React from "react";
import logo from "./assets/logo.png";

export default function Hero({ onRegister }) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <header className="flex flex-col sm:flex-row sm:justify-between items-center p-4 sm:p-6 gap-4 sm:gap-0">
        <div className="flex items-center">
          <img src={logo} alt="Alldays Logo" className="h-12 w-12 xs:h-16 xs:w-16 mr-2 xs:mr-3" />
          <div className="text-xl xs:text-2xl font-bold tracking-wider" style={{ color: '#e7ff00' }}>ALLDAYS</div>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center w-full max-w-2xl md:max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            THE ULTIMATE
            <span className="block bg-gradient-to-r from-[#e7ff00] to-[#e7ff00] bg-clip-text text-transparent">
              SPORTS EVENT
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 font-medium">
            Join the most exciting multi-sport championship of the year
          </p>
          <button
            onClick={onRegister}
            className="w-full sm:w-auto bg-[#e7ff00] text-black px-6 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:shadow-2xl hover:shadow-[#e7ff00]/50 transform hover:scale-105 transition-all duration-300"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}