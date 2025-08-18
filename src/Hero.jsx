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
import onTourLogo from "./assets/OnTourLOGO.PNG";



export default function Hero({ onRegister }) {
  return (
    <>
      <style>{style}</style>
      <div className="relative min-h-screen flex flex-col">
        {/* Top header with logos */}
        <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 sm:p-8 z-20">
          {/* Left side - Alldays branding */}
          <div className="flex items-center">
            <img src={logo} alt="Alldays Logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-2" />
            <span className="text-xl sm:text-2xl font-bold tracking-wider" style={{ color: '#e7ff00', fontFamily: 'Clash Display, sans-serif' }}>Alldays</span>
          </div>
                  {/* Right side - OnTour logo */}
        <div className="flex items-center">
          <img src={onTourLogo} alt="OnTour Logo" className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain" />
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
                      e: '0.01em',
                      lineHeight: 1.05,
                      marginBottom: 0,
                    }}
                  >
                    {/* <span
                      className="block font-clash font-semibold"
                      style={{
                        fontSize: '65%',
                        color: '#6b58cd',
                        marginBottom: '-12px', // Fixed for all screens
                      }}
                    >
                      THE
                    </span> */}
                    OFF TRACK
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
                    by Alldays X OnTour
                  </span>
                </div>
              </div>
            </div>
            {/* Event info line: location and time, mobile-friendly */}
            <div
              className="flex items-center gap-2 sm:gap-4 mt-8 mb-6 px-2 sm:px-6 py-2 rounded-full shadow-md font-semibold text-[0.68rem] sm:text-xl overflow-x-auto whitespace-nowrap max-w-[80vw] sm:max-w-[32rem] backdrop-blur-md border border-white/30"
              style={{
                fontFamily: 'Clash Display, sans-serif',
                color: '#e7ff00',
                WebkitOverflowScrolling: 'touch',
                maxWidth: '80vw',
                fontSize: '0.78rem',
                background: 'rgba(255,255,255,0.18)',
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
              }}
            >
              {/* Location icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#e7ff00" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5c0 7-7 11-7 11s-7-4-7-11a7 7 0 1114 0z"/></svg>
              <span className="mr-2 sm:mr-4">Orangetheory Fitness, Worli</span>
              {/* Date icon */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#e7ff00" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <span className="mr-2 sm:mr-4">3rd August 2025</span> */}
              {/* Time icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#e7ff00" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3"/></svg>
              <span>7:30 AM – 10:30 AM</span>
            </div>
            {/* 50-word white text, same font size as location, no box, max-width as heading */}
            <div
              className="w-full max-w-4xl text-center mt-2 mb-2"
              style={{ color: '#fff', fontFamily: 'Clash Display, sans-serif', fontSize: '0.98rem', fontWeight: 500, lineHeight: 1.5, marginLeft: 'auto', marginRight: 'auto' }}
            >
              Experience the ultimate workout — heart-rate based, science-backed, and powered by Orangetheory Fitness. Sweat it out, push your limits, and end the morning with fun team games, prizes, and good vibes.
            </div>
            {/* CTA Button */}
            <button
              onClick={onRegister}
              className="mt-4 sm:mt-8 px-10 py-4 rounded-full font-semibold text-lg sm:text-xl bg-[#e7ff00] text-black shadow-lg hover:scale-105 transition-all duration-200"
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