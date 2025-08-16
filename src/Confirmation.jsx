import React from "react";
import logo from "./assets/logo.png";
import bgimage from "./assets/bgimage.jpg";
import { CheckCircle, Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

export default function Confirmation({ userData, selectedSports, sports, getTotalAmount, pickleLevel, onBackToHome }) {
  const getSelectedSportsDetails = () => {
    return selectedSports.map(id => {
      const sport = sports.find(s => s.id === id);
      return {
        name: sport?.name || id,
        price: sport?.price || 0,
        level: id === "pickleball" && pickleLevel ? ` (${pickleLevel})` : ""
      };
    });
  };

  const totalAmount = getTotalAmount();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background and overlay */}
      <div
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex items-center p-4 sm:p-8 z-20">
        <div className="flex items-center">
          <img src={logo} alt="Alldays Logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-2" />
          <span
            className="text-xl sm:text-2xl font-bold tracking-wider"
            style={{ color: "#e7ff00", fontFamily: "Clash Display, sans-serif" }}
          >
            Alldays
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-32 pb-32 px-4 sm:px-8">
        <div className="w-full max-w-2xl">
          {/* Success Icon and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#e7ff00] rounded-full mb-6 shadow-lg">
              <CheckCircle className="w-12 h-12 text-black" />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "#6b58cd", fontFamily: "Clash Display, sans-serif" }}
            >
              Registration Successful!
            </h1>
            <p className="text-white text-lg sm:text-xl opacity-90" style={{ fontFamily: "Poppins, sans-serif" }}>
              You're all set for the Alldays Pre-Launch Experience
            </p>
          </div>

          {/* Confirmation Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#e7ff00]/10 mb-8">
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6 text-center"
              style={{ color: "#6b58cd", fontFamily: "Clash Display, sans-serif" }}
            >
              Registration Details
            </h2>

            {/* User Information */}
            <div className="mb-6">
              <h3 className="text-[#e7ff00] font-semibold mb-3 text-lg" style={{ fontFamily: "Clash Display, sans-serif" }}>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Name</span>
                  <p className="text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {userData.firstName} {userData.lastName}
                  </p>
                </div>
                <div>
                  <span className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Email</span>
                  <p className="text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {userData.email}
                  </p>
                </div>
                <div>
                  <span className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Phone</span>
                  <p className="text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {userData.phone}
                  </p>
                </div>
                <div>
                  <span className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Total Amount</span>
                  <p className="text-[#e7ff00] font-bold text-lg" style={{ fontFamily: "Clash Display, sans-serif" }}>
                    ₹{totalAmount}
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Activities */}
            <div className="mb-6">
              <h3 className="text-[#e7ff00] font-semibold mb-3 text-lg" style={{ fontFamily: "Clash Display, sans-serif" }}>
                Selected Activities
              </h3>
              <div className="space-y-3">
                {getSelectedSportsDetails().map((sport, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {sport.name}{sport.level}
                    </span>
                    <span className="text-[#e7ff00] font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                      ₹{sport.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Event Details Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#e7ff00]/10 mb-8">
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6 text-center"
              style={{ color: "#6b58cd", fontFamily: "Clash Display, sans-serif" }}
            >
              Event Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#e7ff00]" />
                <div>
                  <span className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Venue</span>
                  <p className="text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Orangetheory Fitness, Worli 
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#e7ff00]" />
                <div>
                  <span className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Date</span>
                  <p className="text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                    24th August 2025
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#e7ff00]" />
                <div>
                  <span className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Time</span>
                  <p className="text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                    7:30 AM to 10:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#e7ff00]/10 mb-8">
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6 text-center"
              style={{ color: "#6b58cd", fontFamily: "Clash Display, sans-serif" }}
            >
              What's Next?
            </h2>
            
            <div className="space-y-4">
              {/* <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#e7ff00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                  You'll receive a confirmation email with all the details
                </p>
              </div> */}
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#e7ff00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Arrive 15 minutes before your scheduled activities
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#e7ff00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Bring comfortable workout clothes and a water bottle
                </p>
              </div>
              
              {/* <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#e7ff00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Enjoy hydration drinks, coffee & matcha, and DJ RARA's beats!
                </p>
              </div> */}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={onBackToHome}
              className="px-8 py-4 rounded-full font-semibold text-lg sm:text-xl bg-[#e7ff00] text-black shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
              style={{ fontFamily: "Clash Display, sans-serif" }}
            >
              Back to Home
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 