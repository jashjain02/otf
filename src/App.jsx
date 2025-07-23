import React, { useState } from 'react';
import { X, Check, CreditCard, User, Mail, Phone, Calendar } from 'lucide-react';
import logo from './assets/logo.png';
import bgImage from './assets/bgimage.jpg';

const sports = [
  {
    id: 'football',
    name: 'Football',
    description: 'Join the ultimate football championship',
    price: 1500,
    gradient: 'from-gray-900 to-black'
  },
  {
    id: 'basketball',
    name: 'Basketball',
    description: 'Slam dunk your way to victory',
    price: 1200,
    gradient: 'from-gray-900 to-black'
  },
  {
    id: 'cricket',
    name: 'Cricket',
    description: 'Hit it out of the park',
    price: 1800,
    gradient: 'from-gray-900 to-black'
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState('hero');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [selectedSports, setSelectedSports] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!userData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!userData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!userData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(userData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setCurrentStep('sports');
  };

  const toggleSportSelection = (sportId) => {
    setSelectedSports(prev => 
      prev.includes(sportId) 
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    );
  };

  const getTotalAmount = () => {
    return selectedSports.reduce((total, sportId) => {
      const sport = sports.find(s => s.id === sportId);
      return total + (sport?.price || 0);
    }, 0);
  };

  const handlePayment = async () => {
    // Simulate Razorpay integration
    const options = {
      key: 'rzp_test_key',
      amount: getTotalAmount() * 100,
      currency: 'INR',
      name: 'Alldays Sports Event',
      description: 'Sports Registration Payment',
      prefill: {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        contact: userData.phone
      }
    };
    
    alert('Payment integration would be handled here with Razorpay');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image with Dark Overlay - now global */}
      <div
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      {/* All app content stays above */}
      <div className="relative z-10">
        {/* Hero Section */}
        {currentStep === 'hero' && (
          <div className="relative z-10 min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:justify-between items-center p-4 sm:p-6 gap-4 sm:gap-0">
              <div className="flex items-center">
                <img src={logo} alt="Alldays Logo" className="h-12 w-12 xs:h-16 xs:w-16 mr-2 xs:mr-3" />
                <div className="text-xl xs:text-2xl font-bold tracking-wider" style={{ color: '#e7ff00' }}>ALLDAYS</div>
              </div>
              {/* Removed the right-aligned ALLDAYS */}
            </header>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
              <div className="text-center w-full max-w-2xl md:max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  THE ULTIMATE
                  <span className="block bg-gradient-to-r from-[#e7ff00] to-[#e7ff00] bg-clip-text text-transparent">
                    SPORTS EVENT
                  </span>
                </h1>
                
                <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 font-medium">
                  Join the most exciting multi-sport championship of the year
                </p>
                
                <button
                  onClick={() => setCurrentStep('register')}
                  className="w-full sm:w-auto bg-[#e7ff00] text-black px-6 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:shadow-2xl hover:shadow-[#e7ff00]/50 transform hover:scale-105 transition-all duration-300"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Registration Modal */}
        {currentStep === 'register' && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-6">
            <div className="bg-gray-900 rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md relative border border-[#e7ff00]/20 shadow-2xl shadow-[#e7ff00]/10">
              <button
                onClick={() => setCurrentStep('hero')}
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
                      onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
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
                      onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
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
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
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
                      onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-black text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e7ff00] focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.phone && <p className="text-[#e7ff00] text-sm mt-1">{errors.phone}</p>}
                </div>

                <button
                  onClick={handleRegisterSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#e7ff00] text-black py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 text-base sm:text-lg"
                >
                  {isSubmitting ? 'Creating Account...' : 'Continue to Sports Selection'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sports Selection */}
        {currentStep === 'sports' && (  
          <div className="relative z-10 min-h-screen flex flex-col p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-8 gap-2 sm:gap-0">
              <h2 className="text-2xl sm:text-4xl font-bold text-white">Choose Your Sports</h2>
              <button
                onClick={() => setCurrentStep('register')}
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
                  </div>
                ))}
              </div>
            </div>
            {selectedSports.length > 0 && (
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  onClick={() => setCurrentStep('checkout')}
                  className="w-full sm:w-auto bg-[#e7ff00] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl hover:shadow-[#e7ff00]/50 transform hover:scale-105 transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Checkout */}
        {currentStep === 'checkout' && (
          <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-6">
            <div className="bg-gray-900 rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-lg border border-[#e7ff00]/20 shadow-2xl shadow-[#e7ff00]/10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Checkout Summary</h2>
                <button
                  onClick={() => setCurrentStep('sports')}
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
                    return sport ? (
                      <div key={sportId} className="flex justify-between text-gray-300">
                        <span>{sport.name}</span>
                        <span className="text-[#e7ff00]">₹{sport.price}</span>
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="text-xl font-bold flex justify-between">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-[#e7ff00]">₹{getTotalAmount()}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-[#e7ff00] text-black py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#e7ff00]/25 text-base sm:text-lg"
              >
                <CreditCard size={20} />
                Proceed to Razorpay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;