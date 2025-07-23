import React from "react";
import { X, CreditCard } from "lucide-react";

export default function Checkout({
  userData,
  selectedSports,
  sports,
  getTotalAmount,
  onBack,
  onPayment,
  pickleLevel,
}) {
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-6">
      <div className="bg-gray-900 rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-lg border border-[#e7ff00]/20 shadow-2xl shadow-[#e7ff00]/10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Checkout Summary</h2>
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-[#e7ff00] transition-colors self-end sm:self-auto"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Participant Details</h3>
            <p className="text-gray-300">{userData.firstName} {userData.lastName}</p>
            <p className="text-gray-300">{userData.email}</p>
            <p className="text-gray-300">{userData.phone}</p>
          </div>
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Selected Sports</h3>
            {selectedSports.map(sportId => {
              const sport = sports.find(s => s.id === sportId);
              if (!sport) return null;
              return (
                <div key={sportId} className="flex justify-between text-gray-300">
                  <span>
                    {sport.name}
                    {sport.id === "pickleball" && pickleLevel
                      ? ` (${pickleLevel})`
                      : ""}
                  </span>
                  <span className="text-[#e7ff00]">₹{sport.price}</span>
                </div>
              );
            })}
          </div>
          <div className="text-xl font-bold flex justify-between">
            <span className="text-white">Total Amount:</span>
            <span className="text-[#e7ff00]">₹{getTotalAmount()}</span>
          </div>
        </div>
        <button
          onClick={onPayment}
          className="w-full bg-[#e7ff00] text-black py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#e7ff00]/25 text-base sm:text-lg"
        >
          <CreditCard size={20} />
          Proceed to Razorpay
        </button>
      </div>
    </div>
  );
}