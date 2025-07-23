import React from "react";
import { X, Check } from "lucide-react";

const pickleLevels = ["Beginner", "Intermediate", "Advanced"];

export default function Sports({
  sports,
  selectedSports,
  toggleSportSelection,
  onBack,
  onNext,
  pickleLevel,
  setPickleLevel,
}) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-8 gap-2 sm:gap-0">
        <h2 className="text-2xl sm:text-4xl font-bold text-white">Choose Your Sports</h2>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-[#e7ff00] transition-colors self-end sm:self-auto"
        >
          <X size={24} />
        </button>
      </div>
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 flex-1 max-w-4xl w-full">
          {sports.map((sport) => (
            <div
              key={sport.id}
              onClick={() => toggleSportSelection(sport.id)}
              className={`relative bg-gradient-to-br from-gray-900 to-black border-2 p-6 sm:p-8 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 w-full max-w-sm mx-auto ${
                selectedSports.includes(sport.id) ? 'border-[#e7ff00] shadow-lg shadow-[#e7ff00]/25' : 'border-gray-700 hover:border-[#e7ff00]/50'
              }`}
            >
              {selectedSports.includes(sport.id) && (
                <div className="absolute top-4 right-4 bg-[#e7ff00] text-black rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
              <div className="text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{sport.name}</h3>
                <p className="text-gray-300 text-base sm:text-lg mb-4">{sport.description}</p>
                <div className="text-3xl sm:text-4xl font-bold text-[#e7ff00]">₹{sport.price}</div>
              </div>
              {/* Show level options if Pickle Ball is selected */}
              {sport.id === "pickleball" && selectedSports.includes("pickleball") && (
                <div className="mt-4">
                  <div className="text-gray-200 mb-2">Select Level:</div>
                  <div className="flex flex-wrap gap-2">
                    {pickleLevels.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          setPickleLevel(level);
                        }}
                        className={`px-3 py-1 rounded-full border whitespace-nowrap ${
                          pickleLevel === level
                            ? "bg-[#e7ff00] text-black border-[#e7ff00]"
                            : "bg-black text-white border-gray-600"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedSports.length > 0 && (
        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={() => {
              // If Pickle Ball is selected but no level, do nothing or show alert
              if (selectedSports.includes("pickleball") && !pickleLevel) {
                alert("Please select a Pickle Ball level before proceeding.");
                return;
              }
              onNext();
            }}
            disabled={
              selectedSports.includes("pickleball") && !pickleLevel
            }
            className={`w-full sm:w-auto bg-[#e7ff00] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl hover:shadow-[#e7ff00]/50 transform hover:scale-105 transition-all duration-300
              ${selectedSports.includes("pickleball") && !pickleLevel ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}