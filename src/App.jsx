import React, { useState } from "react";
import bgImage from "./assets/bgimage.jpg";
import Hero from "./Hero";
import Register from "./Register";
import Sports from "./Sports";
import Checkout from "./Checkout";
import TermsAndConditions from "./termsandcondtions";

const sports = [
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
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setCurrentStep("sports");
  };

  const toggleSportSelection = (sportId) => {
    setSelectedSports((prev) =>
      prev.includes(sportId)
        ? prev.filter((id) => id !== sportId)
        : [...prev, sportId]
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
  };

  return (
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
          />
        )}
        {currentStep === "checkout" && (
          <Checkout
            userData={userData}
            selectedSports={selectedSports}
            sports={sports}
            getTotalAmount={getTotalAmount}
            onBack={() => setCurrentStep("sports")}
            onPayment={handlePayment}
            pickleLevel={pickleLevel}
          />
        )}
      </div>
    </div>
  );
}

export default App;