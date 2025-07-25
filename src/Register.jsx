import React, { useState } from "react";
import { X, User, Mail, Phone } from "lucide-react";
import bgimage from "./assets/bgimage.jpg";
import logo from "./assets/logo.png";
import { ArrowLeft } from "lucide-react";

// Custom margin for large mobiles
const registerMobileStyle = `
  @media (min-width: 425px) and (max-width: 639px) {
    .register-modal-large-mobile {
      margin-top: 2rem !important;
    }
  }
`;


export default function Register({
  userData,
  setUserData,
  errors,
  isSubmitting,
  onClose,
  onSubmit,
  onShowTerms,
}) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  return (
    <>
      <style>{registerMobileStyle}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6" style={{ overflow: 'auto' }}>
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
        {/* Logo and ALLDAYS branding */}
        <header className="absolute top-0 left-0 w-full flex items-center p-4 sm:p-8 z-20">
          <div className="flex items-center">
            <img src={logo} alt="Alldays Logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-2" />
            <span className="text-xl sm:text-2xl font-bold tracking-wider" style={{ color: '#e7ff00', fontFamily: 'Clash Display, sans-serif' }}>ALLDAYS</span>
          </div>
        </header>
        {/* Modal content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-sm relative shadow-2xl shadow-[#e7ff00]/10 z-10 mt-0 register-modal-large-mobile md:mt-[5%] lg:mt-[3%]">
          <button
            onClick={onClose}
            className="absolute top-2 left-2 sm:top-4 sm:left-4 text-white hover:text-[#e7ff00] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center mb-4 sm:mb-8">
            <h3
              className="text-2xl sm:text-3xl font-semibold mb-2"
              style={{ color: '#6b58cd', fontFamily: 'Clash Display, sans-serif' }}
            >
              Register Now
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">Join the ultimate sports event</p>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={18} />
                <input
                  type="text"
                  placeholder="First Name"
                  value={userData.firstName}
                  onChange={e => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full text-white bg-white/10 backdrop-blur-sm pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e7ff00] focus:outline-none transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}
                />
              </div>
              {errors.firstName && <p className="text-[#e7ff00] text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={18} />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={e => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full text-white bg-white/10 backdrop-blur-sm pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e7ff00] focus:outline-none transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}
                />
              </div>
              {errors.lastName && <p className="text-[#e7ff00] text-sm mt-1">{errors.lastName}</p>}
            </div>
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={userData.email}
                  onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full text-white bg-white/10 backdrop-blur-sm pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e7ff00] focus:outline-none transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}
                />
              </div>
              {errors.email && <p className="text-[#e7ff00] text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={18} />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={userData.phone}
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full text-white bg-white/10 backdrop-blur-sm pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e7ff00] focus:outline-none transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}
                />
              </div>
              {errors.phone && <p className="text-[#e7ff00] text-sm mt-1">{errors.phone}</p>}
            </div>
            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                className="form-checkbox h-5 w-5 accent-[#e7ff00] bg-white/10 border border-[#e7ff00] rounded-lg shadow-sm focus:ring-2 focus:ring-[#e7ff00]"
                style={{ accentColor: '#e7ff00', backgroundClip: 'padding-box' }}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-white select-none" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>
                I agree to the <button type="button" onClick={e => { e.preventDefault(); onShowTerms && onShowTerms(); }} className="underline text-[#e7ff00] hover:text-[#e7ff00] focus:outline-none" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>terms and conditions</button>
              </label>
            </div>
            <button
              onClick={onSubmit}
              disabled={isSubmitting || !agreedToTerms}
              className="w-full bg-[#e7ff00] text-black py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 text-base sm:text-lg"
            >
              {isSubmitting ? 'Creating Account...' : 'Continue to Sports Selection'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}