import React, { useRef, useState } from "react";
import logo from "./assets/logo.png";
import qr from "./assets/qr.jpeg";
import bgimage from "./assets/bgimage.jpg";

const UPI_ID = "alldaysapp@upi";

// AWS S3 upload placeholders
const S3_BUCKET = 'your-s3-bucket-name';
const S3_REGION = 'your-region';
const S3_ACCESS_KEY = 'YOUR_AWS_ACCESS_KEY';
const S3_SECRET_KEY = 'YOUR_AWS_SECRET_KEY';

export default function Checkout({
  userData,
  selectedSports,
  sports,
  getTotalAmount,
  onBack,
  onPayment,
  pickleLevel,
}) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef();
  const [feedback, setFeedback] = useState("");

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

  // S3 upload function (placeholder, use AWS SDK or presigned URL in production)
  const uploadToS3 = async (file) => {
    // Placeholder: In production, use a presigned URL or AWS SDK
    // Return a fake URL for now
    return `https://s3.${S3_REGION}.amazonaws.com/${S3_BUCKET}/${file.name}`;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setFeedback("");
    // 1. Register event
    const payload = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      selected_sports: selectedSports,
      pickleball_level: selectedSports.includes("pickleball") ? pickleLevel : null,
    };
    try {
      const res = await fetch("http://localhost:8000/event-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Registration failed");
      // 2. Upload file to S3 (placeholder)
      let fileUrl = null;
      if (file) {
        fileUrl = await uploadToS3(file);
      }
      setFeedback("Registration successful!" + (fileUrl ? " Screenshot uploaded." : ""));
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
      <header className="absolute top-0 left-0 w-full flex items-center p-4 sm:p-8 z-20">
        <div className="flex items-center">
          <img src={logo} alt="Alldays Logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-2" />
          <span
            className="text-xl sm:text-2xl font-bold tracking-wider"
            style={{ color: "#e7ff00", fontFamily: "Clash Display, sans-serif" }}
          >
            ALLDAYS
          </span>
        </div>
      </header>
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8 mt-24 md:mt-32 relative z-10">
        {/* Left: Checkout Details */}
        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl shadow-[#e7ff00]/10 min-w-[280px]">
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
                  <li key={id} className="flex justify-between items-center text-white">
                    <span style={{ fontFamily: "Poppins, sans-serif" }}>{sport?.name}{sport?.id === "pickleball" && pickleLevel ? ` (${pickleLevel})` : ""}</span>
                    <span className="text-[#e7ff00] font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>₹{sport?.price}</span>
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
        <div className="flex-1 flex flex-col items-center justify-start bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl shadow-[#e7ff00]/10 min-w-[280px]">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center" style={{ color: "#6b58cd", fontFamily: "Clash Display, sans-serif" }}>
            UPI Payment
          </h2>
          <img src={qr} alt="UPI QR" className="w-40 h-40 rounded-lg mx-auto mb-8 border-4 border-[#e7ff00] bg-white" />
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
            className="w-full mt-auto bg-gradient-to-r from-black via-[#e7ff00] to-black text-black font-bold py-3 rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50"
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