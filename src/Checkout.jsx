  {/* Fixed Back Arrow Button (only if onBack is provided, bottom left) */}
  {typeof onBack === 'function' && (
    <button
      onClick={onBack}
      className="fixed bottom-4 left-4 z-50 bg-[#e7ff00] text-black rounded-full p-3 font-bold shadow-lg hover:scale-105 transition-all duration-200"
      aria-label="Back"
      style={{ fontFamily: 'Clash Display, sans-serif' }}
    >
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </span>
    </button>
  )}
  

import React, { useRef, useState } from "react";
import logo from "./assets/logo.png";
import onTourLogo from "./assets/OnTourLOGO.PNG";
import qr from "./assets/qr.jpeg";
import bgimage from "./assets/bgimage.jpg";

const UPI_ID = "dhvani.shah0610-1@okaxis";

export default function Checkout({
  userData,
  selectedSports,
  sports,
  getTotalAmount,
  onBack,
  onPayment,
  pickleLevel,
  playType,
  playerNames,
  onSuccess,
}) {
  // Track checkout page view
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        event_category: 'Ecommerce',
        event_label: 'Checkout Started',
        value: getTotalAmount()
      });
    }
  }, [getTotalAmount]);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef();
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  // File upload handlers
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  // Copy UPI ID to clipboard
  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error('Failed to copy UPI ID:', err);
    }
  };



  // Submit registration and file to backend
  const handleSubmit = async () => {
    setSubmitting(true);
    setFeedback("");
    const formData = new FormData();
    formData.append("first_name", userData.firstName);
    formData.append("last_name", userData.lastName);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("selected_sports", JSON.stringify(selectedSports));
    formData.append(
      "orangetheory_batch",
      selectedSports.includes("orangetheory") ? playType : ""
    );
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch(
        "https://alldays-c9c62d7851d5.herokuapp.com/event-registration",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Registration failed");
      }
      // Track successful purchase
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase', {
          event_category: 'Ecommerce',
          event_label: 'Registration Completed',
          value: getTotalAmount(),
          currency: 'INR'
        });
      }
      
      // Redirect to confirmation page immediately
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setFeedback("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-2 py-8 relative overflow-hidden">
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
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 sm:p-8 z-20">
        {/* Left side - Alldays branding */}
        <div className="flex items-center">
          <img src={logo} alt="Alldays Logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-2" />
          <span
            className="text-xl sm:text-2xl font-bold tracking-wider"
            style={{ color: "#e7ff00", fontFamily: "Clash Display, sans-serif" }}
          >
            Alldays
          </span>
        </div>
        {/* Right side - OnTour logo */}
        <div className="flex items-center">
          <img src={onTourLogo} alt="OnTour Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
        </div>
      </header>
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8 mt-24 md:mt-32 relative z-10 items-center">
        {/* Left: Checkout Details */}
        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl shadow-[#e7ff00]/10 min-w-[280px] w-[22rem] md:w-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: "#6b58cd", fontFamily: "Clash Display, sans-serif" }}>
            Checkout Details
          </h2>
          <div className="mb-4">
            <div className="text-white font-semibold mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Name:</div>
            <div className="text-[#e7ff00] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{userData.firstName} {userData.lastName}</div>
            <div className="text-white font-semibold mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Email:</div>
            <div className="text-[#e7ff00] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{userData.email}</div>
            <div className="text-white font-semibold mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Phone:</div>
            <div className="text-[#e7ff00]" style={{ fontFamily: "Poppins, sans-serif" }}>{userData.phone}</div>
          </div>
          <div className="mb-4">
            <div className="text-white font-semibold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Selected Events:</div>
            <ul className="space-y-2">
              {selectedSports.map((id) => {
                const sport = sports.find((s) => s.id === id);
                return (
                  <li key={id} className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center text-white">
                      <span style={{ fontFamily: "Poppins, sans-serif" }}>
                        {sport?.name}
                        {sport?.id === "orangetheory" && playType ? (
                          <>
                            {playType === "batch1" ? " (Batch 1: 7:30-8:30 AM)" : 
                             playType === "batch2" ? " (Batch 2: 9:00-10:00 AM)" : ""}
                          </>
                        ) : ""}
                      </span>
                      <span className="text-[#e7ff00] font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>₹{sport?.price}</span>
                    </div>
                    {/* Commented out old group members display */}
                    {/*
                    {sport?.id === "pickleball" && playType === "group" && (
                      <div className="text-sm text-gray-300 ml-4">
                        <div style={{ fontFamily: "Poppins, sans-serif" }}>Group Members:</div>
                        {playerNames.map((name, index) => (
                          <div key={index} className="ml-2 text-[#e7ff00]" style={{ fontFamily: "Poppins, sans-serif" }}>
                            • {name || `Player ${index + 1}`}
                          </div>
                        ))}
                      </div>
                    )}
                    */}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-6 text-lg font-bold text-white flex justify-between items-center" style={{ fontFamily: "Clash Display, sans-serif" }}>
            Total: <span className="text-[#e7ff00] text-2xl">₹{getTotalAmount()}</span>
          </div>
        </div>
        {/* Right: Payment & Upload */}
        <div className="flex-1 flex flex-col items-center justify-start bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl shadow-[#e7ff00]/10 min-w-[280px] w-[22rem] md:w-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center" style={{ color: "#6b58cd", fontFamily: "Clash Display, sans-serif" }}>
            UPI Payment
          </h2>
          <img src={qr} alt="UPI QR" className="w-40 h-40 rounded-lg mx-auto mb-4 border-4 border-[#e7ff00] bg-white" />
          {/* UPI ID with Copy Button */}
          <div className="flex items-center justify-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-[#e7ff00]/30">
            <span className="text-white font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
              {copied ? "Copied!" : UPI_ID}
            </span>
            <button
              onClick={handleCopyUPI}
              className="p-1 hover:scale-110 transition-all duration-200"
              aria-label="Copy UPI ID"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={copied ? "#10b981" : "#e7ff00"} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {copied ? (
                  <path d="M20 6L9 17l-5-5"/>
                ) : (
                  <>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </>
                )}
              </svg>
            </button>
          </div>
          {/* File Upload */}
          <div
            className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 mb-4 transition-all duration-200
              ${dragActive ? "border-[#e7ff00] bg-[#e7ff00]/10" : "border-white/20 bg-white/5"}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current.click()}
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="text-white text-sm mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              {file ? (
                <span className="flex items-center gap-2">
                  <span className="text-[#e7ff00] font-semibold">{file.name}</span>
                  <span className="text-green-400">✓</span>
                </span>
              ) : (
                <>
                  Drag & drop or <span className="underline text-[#e7ff00]">click to upload</span> payment screenshot
                </>
              )}
            </div>
          </div>
          {/* Submit Button */}
          <button
            className="w-full mt-auto bg-[#e7ff00] text-black font-bold py-3 rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50"
            style={{ fontFamily: "Clash Display, sans-serif" }}
            disabled={!file || submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
          {feedback && (
            <div className="mt-4 text-center text-white text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}