import React from "react";
import bgimage from "./assets/bgimage.jpg";
import logo from "./assets/logo.png";
import { ArrowLeft } from "lucide-react";

const terms = [
  {
    title: "Participation is Voluntary",
    text: "All sessions including pickleball, team workouts, breathwork, and ice baths are optional. You know your limits best — join in only if it feels right for you.",
  },
  {
    title: "Health and Physical Readiness",
    text: "By attending, you confirm that you're in good health and capable of participating in movement-based activities. If unsure, it's best to check with your doctor beforehand.",
  },
  {
    title: "Liability Waiver",
    text: "While we've taken care to create a safe space, Alldays and its partners are not responsible for any injury, accident, or health concern that may arise during the event.",
  },
  {
    title: "Media & Content Usage",
    text: "Photos and videos will be captured during the event for marketing and social media purposes. By attending, you agree to potentially be featured. If you'd prefer not to be, just let our team know.",
  },
  {
    title: "Code of Conduct",
    text: "We’re all here to have a good time. Please be respectful toward others, follow the event guidelines, and keep the vibe positive. Disruptive behavior may result in removal from the event.",
  },
  {
    title: "Age Requirement",
    text: "Participants must be 18 years or older. Anyone under 18 must be accompanied by a legal guardian.",
  },
];

const firstHalf = terms.slice(0, Math.ceil(terms.length / 2));
const secondHalf = terms.slice(Math.ceil(terms.length / 2));

export default function TermsAndConditions({ onBack }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6" style={{ minHeight: '100vh', overflow: 'auto' }}>
      {/* Background image and overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black opacity-80" />
      </div>
      {/* Logo and Alldays branding */}
      <header className="absolute top-0 left-0 w-full flex items-center p-4 sm:p-8 z-20">
        <div className="flex items-center">
          <img src={logo} alt="Alldays Logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-2" />
          <span className="text-xl sm:text-2xl font-bold tracking-wider" style={{ color: '#e7ff00', fontFamily: 'Clash Display, sans-serif' }}>Alldays</span>
        </div>
      </header>
      {/* Glassmorphic Terms Container */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-4 py-6 sm:px-10 sm:py-10 w-full max-w-4xl relative shadow-2xl shadow-[#e7ff00]/10 z-10 mt-20 flex flex-col h-[90vh] overflow-y-auto" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>
        {/* Modal header with arrow and title */}
        <div className="flex items-center justify-center relative mb-4">
          <button
            onClick={onBack}
            className="absolute left-0 top-1 text-white hover:text-[#e7ff00] transition-colors"
            aria-label="Back to Register"
            style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}
          >
            <ArrowLeft size={28} />
          </button>
          <h2 className="text-xl sm:text-2xl font-semibold text-center pl-8 pr-4" style={{ color: '#6b58cd', fontFamily: 'Clash Display, sans-serif' }}>
            Alldays Prelaunch Event – Terms & Disclaimer
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-6 h-full overflow-y-auto" style={{ flex: 1 }}>
          <ul className="flex-1 space-y-3 sm:space-y-4">
            {firstHalf.map((item, idx) => (
              <li key={idx}>
                <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: '#e7ff00', fontFamily: 'Clash Display, sans-serif' }}>{item.title}</h3>
                <p className="text-white text-xs sm:text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>{item.text}</p>
              </li>
            ))}
          </ul>
          <ul className="flex-1 space-y-3 sm:space-y-4">
            {secondHalf.map((item, idx) => (
              <li key={idx}>
                <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: '#e7ff00', fontFamily: 'Clash Display, sans-serif' }}>{item.title}</h3>
                <p className="text-white text-xs sm:text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 text-center text-white text-sm sm:text-base" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>
          Incase of any questions or assistance, kindly mail us on <a href="mailto:alldaysapp@gmail.com" className="underline text-[#e7ff00]">alldaysapp@gmail.com</a> or contact us on <a href="tel:+917208003656" className="underline text-[#e7ff00]">+91-7208003656</a>
        </div>
      </div>
    </div>
  );
} 