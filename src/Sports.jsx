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
      toggleSportSelection(id);
    }
  };

  const staticSports = [
    {
      id: "pickleball",
      name: "Pickleball Rallies (1-hour team slots)",
      description: "Fun rallies and games for all skill levels.",
      price: 800,
    },
    {
      id: "strength",
      name: "Strength Workout with Team Games",
      description: "Team-based strength and fitness challenges.",
      price: 700,
    },
    {
      id: "breathwork",
      name: "Breathwork & Ice Bath Reset Zone",
      description: "Guided breathwork and ice bath for recovery.",
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
            ALLDAYS
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
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          {staticSports.map((sport) => {
            const selected = selectedSports.includes(sport.id);
            // Determine if this is the pickleball card and selected
            const isPickleball = sport.id === "pickleball";
            const pickleballSelected = isPickleball && selected;
            return (
              <div
                key={sport.id}
                tabIndex={0}
                aria-pressed={selected}
                role="button"
                onClick={() => toggleSportSelection(sport.id)}
                onKeyDown={(e) => handleCardKeyDown(e, sport.id)}
                className={`group relative flex flex-col items-center justify-between p-6 rounded-2xl bg-white/10 backdrop-blur-lg border-2 transition-all duration-300 cursor-pointer outline-none
                  w-72 md:w-auto
                  ${
                    selected
                      ? "border-[#e7ff00] shadow-[0_0_16px_2px_#e7ff00] ring-2 ring-[#e7ff00]"
                      : "border-white/20 hover:border-[#e7ff00]/60"
                  }
                  focus:ring-2 focus:ring-[#e7ff00]
                  ${isPickleball && isMobile ? '' : ''}`}
                style={{
                  minHeight: isMobile
                    ? (isPickleball
                        ? (pickleballSelected ? 240 : 120)
                        : (selectedSports.includes('pickleball') && selectedSports.length === 1 && pickleballSelected
                            ? 240
                            : 120))
                    : (isPickleball
                        ? (pickleballSelected ? 340 : 220)
                        : 220),
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
                <div className="text-base font-bold text-[#e7ff00] w-full text-center" style={{ maxWidth: isMobile ? '15.5rem' : undefined, margin: '0 auto' }}>₹{sport.price} per person</div>
                {selected && (
                  <CheckCircle className="absolute top-3 right-3 text-[#e7ff00] bg-black/60 rounded-full" size={22} />
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
      <div className="fixed bottom-0 left-0 w-full z-30 flex flex-col items-center bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-4 pb-6">
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
              if (selectedSports.includes("pickleball") && !pickleLevel) {
                alert("Please select a Pickle Ball level before proceeding.");
                return;
              }
              onNext();
            }}
            disabled={selectedSports.includes("pickleball") && !pickleLevel}
            className={`mt-2 sm:mt-0 px-8 py-3 rounded-full font-semibold text-lg sm:text-xl bg-[#e7ff00] text-black shadow-lg hover:scale-105 transition-all duration-200
              ${selectedSports.includes("pickleball") && !pickleLevel ? "opacity-50 cursor-not-allowed" : ""}
            `}
            style={{ fontFamily: "Clash Display, sans-serif" }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      {/* Back button for accessibility (optional) */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-40 text-white hover:text-[#e7ff00] transition-colors bg-black/40 rounded-full p-2"
        aria-label="Back"
        style={{ fontFamily: "Clash Display, sans-serif" }}
      >
        <ArrowLeft size={28} />
      </button>
    </div>
  );
}