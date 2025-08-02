import React from "react";
import logo from "./assets/logo.png";
import bgimage from "./assets/bgimage.jpg";
import { CheckCircle, ArrowLeft } from "lucide-react";

const pickleLevels = ["Beginner", "Intermediate", "Advanced"];

export default function Sports({
  sports,
  selectedSports,
  toggleSportSelection,
  onBack,
  onNext,
  pickleLevel,
  setPickleLevel,
  getTotalAmount,
  registrationCounts,
  isLoadingCounts,
}) {
  // Responsive: detect if mobile (for accordion)
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Accessibility: handle keyboard selection
  const handleCardKeyDown = (e, id) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const isAvailable = registrationCounts ? registrationCounts.availability[id]?.available : true;
      if (isAvailable) {
        toggleSportSelection(id);
      }
    }
  };

  const staticSports = [
    {
      id: "pickleball",
      name: "Pickleball Rallies (40 min team slots)",
      description: "Fun rallies and games for all skill levels.",
      timing: "4-8pm",
      price: 800,
    },
    {
      id: "strength",
      name: "Strength Workout with Team Games",
      description: "High-intensity strength workouts with electrifying group energy.",
      timing: "4-5:30pm",
      price: 700,
    },
    {
      id: "breathwork",
      name: "Breathwork & Ice Bath Reset Zone",
      description: "Guided breathwork and ice bath for recovery.",
      timing: "6-8pm",
      price: 1300,
    },
  ];

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
      {/* Sports selection */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-32 pb-32 px-2 sm:px-0">
        <h2
          className="text-2xl sm:text-3xl font-semibold mb-8 text-center"
          style={{ color: "#6b58cd", fontFamily: "Clash Display, sans-serif" }}
        >
          Choose Your Activities
        </h2>
        
        {/* Loading indicator */}
        {isLoadingCounts && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-white/80" style={{ fontFamily: "Poppins, sans-serif" }}>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#e7ff00]"></div>
              Loading availability...
            </div>
          </div>
        )}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          {staticSports.map((sport) => {
            const selected = selectedSports.includes(sport.id);
            // Determine if this is the pickleball card and selected
            const isPickleball = sport.id === "pickleball";
            const pickleballSelected = isPickleball && selected;
            
            // Check availability
            const isAvailable = registrationCounts ? registrationCounts.availability[sport.id]?.available : true;
            const currentCount = registrationCounts ? registrationCounts.availability[sport.id]?.current_count : 0;
            const limit = registrationCounts ? registrationCounts.availability[sport.id]?.limit : 50;
            const remaining = registrationCounts ? registrationCounts.availability[sport.id]?.remaining : 50;
            return (
              <div
                key={sport.id}
                tabIndex={0}
                aria-pressed={selected}
                role="button"
                onClick={() => isAvailable && toggleSportSelection(sport.id)}
                onKeyDown={(e) => handleCardKeyDown(e, sport.id)}
                className={`group relative flex flex-col items-center justify-between p-6 rounded-2xl bg-white/10 backdrop-blur-lg border-2 transition-all duration-300 outline-none
                  w-72 md:w-auto
                  ${
                    !isAvailable
                      ? "border-red-500/50 opacity-60 cursor-not-allowed"
                      : selected
                      ? "border-[#e7ff00] shadow-[0_0_16px_2px_#e7ff00] ring-2 ring-[#e7ff00] cursor-pointer"
                      : "border-white/20 hover:border-[#e7ff00]/60 cursor-pointer"
                  }
                  focus:ring-2 focus:ring-[#e7ff00]
                  ${isPickleball && isMobile ? '' : ''}`}
                style={{
                  minHeight: isMobile
                    ? (isPickleball
                        ? (pickleballSelected ? 280 : 160)
                        : (selectedSports.includes('pickleball') && selectedSports.length === 1 && pickleballSelected
                            ? 280
                            : 160))
                    : (isPickleball
                        ? (pickleballSelected ? 380 : 260)
                        : 260),
                  width: isMobile ? '18rem' : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div className="text-lg font-semibold text-white text-center w-full" style={{ fontFamily: "Clash Display, sans-serif", maxWidth: isMobile ? '15.5rem' : undefined, margin: '0 auto' }}>
                  {sport.name}
                </div>
                <div className="text-sm text-gray-200 text-center mb-2 w-full" style={{ fontFamily: "Poppins, sans-serif", maxWidth: isMobile ? '15.5rem' : undefined, margin: '0 auto' }}>
                  {sport.description}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2 w-full" style={{ maxWidth: isMobile ? '15.5rem' : undefined, margin: '0 auto' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#e7ff00]" fill="none" viewBox="0 0 24 24" stroke="#e7ff00" strokeWidth="2">
                    <circle cx="12" cy="12" r="9"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3"/>
                  </svg>
                  <span className="text-sm font-medium text-[#e7ff00]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {sport.timing}
                  </span>
                </div>
                <div className="text-base font-bold text-[#e7ff00] w-full text-center" style={{ maxWidth: isMobile ? '15.5rem' : undefined, margin: '0 auto' }}>₹{sport.price} per person</div>
                
                {/* Availability info - only for pickle ball */}
                {registrationCounts && sport.id === "pickleball" && (
                  <div className="text-xs text-white/70 text-center mt-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {isAvailable ? (
                      `${remaining} spots remaining`
                    ) : (
                      "SOLD OUT"
                    )}
                  </div>
                )}
                
                {selected && (
                  <CheckCircle className="absolute top-3 right-3 text-[#e7ff00] bg-black/60 rounded-full" size={22} />
                )}
                
                {/* Sold out overlay */}
                {!isAvailable && (
                  <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-red-400 font-bold text-lg" style={{ fontFamily: "Clash Display, sans-serif" }}>
                        SOLD OUT
                      </div>
                    </div>
                  </div>
                )}
                {/* Accordion for mobile: only show if selected, else hide */}
                {isPickleball && isMobile ? (
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden w-full flex flex-col items-center ${pickleballSelected ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0 pointer-events-none'}`}
                    style={{ transitionProperty: 'max-height, opacity, margin-top', willChange: 'max-height, opacity, margin-top' }}
                  >
                    <div className="text-[#e7ff00] font-semibold mb-3 text-center text-base sm:text-lg" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                      Select your Pickleball skill level:
                    </div>
                    <div className="flex flex-wrap w-full max-w-xs mx-auto gap-2">
                      {pickleLevels.map((level, idx) => (
                        <label
                          key={level}
                          className={`flex items-center justify-center px-1.5 py-1.5 rounded-lg cursor-pointer border-2 transition-all text-xs sm:text-sm
                            ${
                              pickleLevel === level
                                ? "border-[#e7ff00] bg-[#e7ff00]/10 text-[#e7ff00] font-bold"
                                : "border-white/20 bg-white/5 text-white hover:border-[#e7ff00]/60"
                            }
                            ${idx < 2 ? 'basis-1/2 grow' : 'basis-full grow'}
                          `}
                          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', lineHeight: 1.1, textAlign: 'center', minWidth: 0 }}
                          onClick={e => e.stopPropagation()}
                        >
                          <input
                            type="radio"
                            name="pickleball-level"
                            value={level}
                            checked={pickleLevel === level}
                            onChange={() => setPickleLevel(level)}
                            className="sr-only"
                          />
                          {level}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden w-full flex flex-col items-center ${pickleballSelected ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0 pointer-events-none'}`}
                    style={{ transitionProperty: 'max-height, opacity, margin-top', willChange: 'max-height, opacity, margin-top' }}
                  >
                    <div className="text-[#e7ff00] font-semibold mb-3 text-center text-base sm:text-lg" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                      Select your Pickleball skill level:
                    </div>
                    <div className="flex flex-wrap w-full max-w-xs mx-auto gap-2">
                      {pickleLevels.map((level, idx) => (
                        <label
                          key={level}
                          className={`flex items-center justify-center px-1.5 py-1.5 rounded-lg cursor-pointer border-2 transition-all text-xs sm:text-sm
                            ${
                              pickleLevel === level
                                ? "border-[#e7ff00] bg-[#e7ff00]/10 text-[#e7ff00] font-bold"
                                : "border-white/20 bg-white/5 text-white hover:border-[#e7ff00]/60"
                            }
                            ${idx < 2 ? 'basis-1/2 grow' : 'basis-full grow'}
                          `}
                          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', lineHeight: 1.1, textAlign: 'center', minWidth: 0 }}
                          onClick={e => e.stopPropagation()}
                        >
                          <input
                            type="radio"
                            name="pickleball-level"
                            value={level}
                            checked={pickleLevel === level}
                            onChange={() => setPickleLevel(level)}
                            className="sr-only"
                          />
                          {level}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
      {/* Sticky total and CTA */}
      <div className="fixed bottom-0 left-0 w-full z-30 flex flex-col items-center bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-4 pb-6">
        <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
          <div className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "Clash Display, sans-serif" }}>
            Total: <span className="text-[#e7ff00]">₹{selectedSports.length > 0
              ? selectedSports.reduce((total, id) => {
                  const sport = staticSports.find((s) => s.id === id);
                  return total + (sport ? sport.price : 0);
                }, 0)
              : 0}
            </span>
          </div>
          <button
            onClick={() => {
              if (selectedSports.length === 0) {
                alert("Please select at least one activity before proceeding.");
                return;
              }
              if (selectedSports.includes("pickleball") && !pickleLevel) {
                alert("Please select a Pickle Ball level before proceeding.");
                return;
              }
              
              // Check if any selected sport is sold out
              const soldOutSports = selectedSports.filter(sportId => {
                return registrationCounts && !registrationCounts.availability[sportId]?.available;
              });
              
              if (soldOutSports.length > 0) {
                alert("One or more selected activities are no longer available. Please refresh the page and select different activities.");
                return;
              }
              
              onNext();
            }}
            disabled={
              selectedSports.length === 0 || 
              (selectedSports.includes("pickleball") && !pickleLevel) ||
              (registrationCounts && selectedSports.some(sportId => !registrationCounts.availability[sportId]?.available))
            }
                          className={`mt-2 sm:mt-0 px-8 py-3 rounded-full font-semibold text-lg sm:text-xl bg-[#e7ff00] text-black shadow-lg hover:scale-105 transition-all duration-200
                ${selectedSports.length === 0 || (selectedSports.includes("pickleball") && !pickleLevel) || (registrationCounts && selectedSports.some(sportId => !registrationCounts.availability[sportId]?.available)) ? "opacity-50 cursor-not-allowed" : ""}
              `}
            style={{ fontFamily: "Clash Display, sans-serif" }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}