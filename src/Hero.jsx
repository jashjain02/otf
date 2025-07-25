  // Responsive tagline font size for mobile (original behavior)
  const style = `
    @media (max-width: 640px) {
      .tagline-responsive {
        font-size: 50% !important;
      }
    }
    @media (min-width: 641px) and (max-width: 1024px) {
      .tagline-responsive {
        font-size: 70% !important;
      }
    }
  `;
import React from "react";
import logo from "./assets/logo.png";



export default function Hero({ onRegister }) {
  return (
    <>
      <style>{style}</style>
      <div className="relative min-h-screen flex flex-col">
        {/* Top-left logo and branding */}
        <header className="absolute top-0 left-0 w-full flex items-center p-4 sm:p-8 z-20">
          <div className="flex items-center">
            <img src={logo} alt="Alldays Logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-2" />
            <span className="text-xl sm:text-2xl font-bold tracking-wider" style={{ color: '#e7ff00', fontFamily: 'Clash Display, sans-serif' }}>ALLDAYS</span>
          </div>
        </header>
        {/* Background image with overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(./assets/bgimage.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        {/* Centered tagline and CTA */}
        <main className="relative z-10 flex justify-content-center" style={{ height: '100vh' }}>
          <div className="flex flex-col items-center justify-content-center w-full px-4 tagline-margin-tablet" style={{ justifyContent: 'center'}}>
            {/* Tagline - vertical arrangement: THE above FIRST MOVE, by Alldays below and right-aligned */}
            <div className="flex flex-col items-center w-full max-w-4xl">
              <div className="w-full flex justify-center">
                <div className="flex flex-col tagline-responsive" style={{ minWidth: 'min-content' }}>
                  <span
                    className="font-clash font-semibold block text-left"
                    style={{
                      color: '#6b58cd',
                      fontSize: '600%',
                      letterSpacing: '0.01em',
                      lineHeight: 1.05,
                      marginBottom: 0,
                    }}
                  >
                    <span
                      className="block font-clash font-semibold"
                      style={{
                        fontSize: '65%',
                        color: '#6b58cd',
                        marginBottom: '-12px', // Fixed for all screens
                      }}
                    >
                      THE
                    </span>
                    FIRST MOVE
                  </span>
                  <span
                    className="font-clash font-semibold block text-right"
                    style={{
                      color: '#e7ff00',
                      fontSize: '200%',
                      marginTop: '-14px', // Fixed for all screens
                      marginRight: '0.05em',
                    }}
                  >
                    by Alldays
                  </span>
                </div>
              </div>
            </div>
            {/* CTA Button */}
            <button
              onClick={onRegister}
              className="mt-8 sm:mt-10 px-10 py-4 rounded-full font-semibold text-lg sm:text-xl bg-[#e7ff00] text-black shadow-lg hover:scale-105 transition-all duration-200"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Register Now
            </button>
          </div>
        </main>
      </div>
    </>
  );
}