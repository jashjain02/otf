import React, { useState, useEffect } from "react";
import bgImage from "./assets/bgimage.jpg";
import Hero from "./Hero";
import Register from "./Register";
import Sports from "./Sports";
import Checkout from "./Checkout";
import TermsAndConditions from "./termsandcondtions";
import Confirmation from "./Confirmation";
import { useAnalytics } from "./hooks/useAnalytics";
import { API_ENDPOINTS } from "./config";

const sports = [
  {
    id: "orangetheory",
    name: "Alldays x OnTour Run Club – Orangetheory Fitness Session",
    description: "60-minute workout session combining treadmill, rowers, and strength training. Partner team games after the workout, with prizes for the winning teams.",
    timing: "7:30 AM – 10:30 AM",
    price: 1200,
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState("hero");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [selectedSports, setSelectedSports] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickleLevel, setPickleLevel] = useState("");
  const [playType, setPlayType] = useState("individual");
  const [playerNames, setPlayerNames] = useState(['', '', '']);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registrationCounts, setRegistrationCounts] = useState(null);
  const [isLoadingCounts, setIsLoadingCounts] = useState(false);
  
  const { trackPageView, trackEvent } = useAnalytics();

  // Track page views when step changes
  useEffect(() => {
    if (showConfirmation) {
      trackPageView("Confirmation");
    } else {
      switch (currentStep) {
        case "hero":
          trackPageView("Hero");
          break;
        case "register":
          trackPageView("Registration");
          break;
        case "terms":
          trackPageView("Terms and Conditions");
          break;
        case "sports":
          trackPageView("Sports Selection");
          break;
        case "checkout":
          trackPageView("Checkout");
          break;
        default:
          trackPageView("Hero");
      }
    }
  }, [currentStep, showConfirmation, trackPageView]);

  // Fetch registration counts when reaching sports step
  useEffect(() => {
    if (currentStep === "sports") {
      fetchRegistrationCounts();
      
      // Set up periodic refresh every 30 seconds while on sports page
      const interval = setInterval(() => {
        fetchRegistrationCounts();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const fetchRegistrationCounts = async () => {
    setIsLoadingCounts(true);
    try {
      const response = await fetch('https://alldays-c9c62d7851d5.herokuapp.com/registration-counts');
      if (response.ok) {
        const data = await response.json();
        setRegistrationCounts(data);
      } else {
        console.error('Failed to fetch registration counts');
        // Set default availability if API fails
        setRegistrationCounts({
          availability: {
            orangetheory: { available: true, current_count: 0, limit: 50, remaining: 50 }
          }
        });
      }
    } catch (error) {
      console.error('Error fetching registration counts:', error);
      // Set default availability if API fails
      setRegistrationCounts({
        availability: {
          orangetheory: { available: true, current_count: 0, limit: 50, remaining: 50 }
        }
      });
    } finally {
      setIsLoadingCounts(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!userData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!userData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(userData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async () => {
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    trackEvent("registration_completed", "User Action", "Registration Form Submitted", 1);
    setCurrentStep("sports");
    // Refresh availability data after registration
    setTimeout(() => fetchRegistrationCounts(), 500);
  };

  const toggleSportSelection = (sportId) => {
    // Commented out availability check
    /*
    if (registrationCounts && !registrationCounts.availability[sportId]?.available) {
      alert(`${sportId.charAt(0).toUpperCase() + sportId.slice(1)} is currently sold out. Please choose another activity.`);
      return;
    }
    */
    
    const isSelected = selectedSports.includes(sportId);
    setSelectedSports((prev) =>
      isSelected
        ? prev.filter((id) => id !== sportId)
        : [...prev, sportId]
    );
    
    // Track sport selection/deselection
    trackEvent(
      isSelected ? "sport_deselected" : "sport_selected", 
      "Sports Selection", 
      sportId, 
      isSelected ? 0 : 1
    );
  };

  const getTotalAmount = () => {
    return selectedSports.reduce((total, sportId) => {
      const sport = sports.find((s) => s.id === sportId);
      return total + (sport?.price || 0);
    }, 0);
  };

  const handlePayment = async () => {
    alert("Payment integration would be handled here with Razorpay");
    // Refresh availability data after payment
    setTimeout(() => fetchRegistrationCounts(), 500);
  };

  const handleBackToHome = () => {
    trackEvent("back_to_home", "Navigation", "Returned to Home", 1);
    setCurrentStep("hero");
    setShowConfirmation(false);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setSelectedSports([]);
    setPickleLevel("");
    setRegistrationCounts(null);
  };

  return (
    <>
      {/* Global Back Arrow Button (top left, just below ALLDAYS logo, not on hero) - fixed to viewport */}
      {currentStep !== "hero" && (
        <button
          onClick={() => {
            if (currentStep === "register") setCurrentStep("hero");
            else if (currentStep === "terms") setCurrentStep("register");
            else if (currentStep === "sports") setCurrentStep("register");
            else if (currentStep === "checkout") setCurrentStep("sports");
          }}
          className="absolute left-4 sm:left-10 top-20 sm:top-24 z-[100] bg-black/40 rounded-full font-bold shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center"
          aria-label="Back"
          style={{ fontFamily: 'Clash Display, sans-serif', width: 36, height: 36, minWidth: 0, minHeight: 0, padding: 0, backdropFilter: 'blur(2px)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e7ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
      )}
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div
          className="fixed inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        <div className="relative z-10">
          {currentStep === "hero" && (
            <Hero onRegister={() => setCurrentStep("register")} />
          )}
          {currentStep === "register" && (
            <Register
              userData={userData}
              setUserData={setUserData}
              errors={errors}
              isSubmitting={isSubmitting}
              onClose={() => setCurrentStep("hero")}
              onSubmit={handleRegisterSubmit}
              onShowTerms={() => setCurrentStep("terms")}
            />
          )}
          {currentStep === "terms" && (
            <TermsAndConditions onBack={() => setCurrentStep("register")} />
          )}
          {currentStep === "sports" && (
            <Sports
              sports={sports}
              selectedSports={selectedSports}
              toggleSportSelection={toggleSportSelection}
              onBack={() => setCurrentStep("register")}
              onNext={() => setCurrentStep("checkout")}
              pickleLevel={pickleLevel}
              setPickleLevel={setPickleLevel}
              playType={playType}
              setPlayType={setPlayType}
              playerNames={playerNames}
              setPlayerNames={setPlayerNames}
              registrationCounts={registrationCounts}
              isLoadingCounts={isLoadingCounts}
            />
          )}
          {currentStep === "checkout" && !showConfirmation && (
            <Checkout
              userData={userData}
              selectedSports={selectedSports}
              sports={sports}
              getTotalAmount={getTotalAmount}
              onBack={() => setCurrentStep("sports")}
              onPayment={handlePayment}
              pickleLevel={pickleLevel}
              playType={playType}
              playerNames={playerNames}
              onSuccess={() => setShowConfirmation(true)}
            />
          )}
          {showConfirmation && (
            <Confirmation
              userData={userData}
              selectedSports={selectedSports}
              sports={sports}
              getTotalAmount={getTotalAmount}
              pickleLevel={pickleLevel}
              onBackToHome={handleBackToHome}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;