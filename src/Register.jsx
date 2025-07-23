import React from "react";
import { X, User, Mail, Phone } from "lucide-react";

export default function Register({
  userData,
  setUserData,
  errors,
  isSubmitting,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-6">
      <div className="bg-gray-900 rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md relative border border-[#e7ff00]/20 shadow-2xl shadow-[#e7ff00]/10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-[#e7ff00] transition-colors"
        >
          <X size={24} />
        </button>
        <div className="text-center mb-4 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Register Now</h3>
          <p className="text-gray-400 text-sm sm:text-base">Join the ultimate sports event</p>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e7ff00]" size={18} />
              <input
                type="text"
                placeholder="First Name"
                value={userData.firstName}
                onChange={e => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full bg-black text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e7ff00] focus:outline-none transition-colors"
              />
            </div>
            {errors.firstName && <p className="text-[#e7ff00] text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e7ff00]" size={18} />
              <input
                type="text"
                placeholder="Last Name"
                value={userData.lastName}
                onChange={e => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full bg-black text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e7ff00] focus:outline-none transition-colors"
              />
            </div>
            {errors.lastName && <p className="text-[#e7ff00] text-sm mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e7ff00]" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                value={userData.email}
                onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-black text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e7ff00] focus:outline-none transition-colors"
              />
            </div>
            {errors.email && <p className="text-[#e7ff00] text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e7ff00]" size={18} />
              <input
                type="tel"
                placeholder="Phone Number"
                value={userData.phone}
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-black text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e7ff00] focus:outline-none transition-colors"
              />
            </div>
            {errors.phone && <p className="text-[#e7ff00] text-sm mt-1">{errors.phone}</p>}
          </div>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#e7ff00] text-black py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 text-base sm:text-lg"
          >
            {isSubmitting ? 'Creating Account...' : 'Continue to Sports Selection'}
          </button>
        </div>
      </div>
    </div>
  );
}