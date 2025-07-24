import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register({
  userData,
  setUserData,
  errors,
  isSubmitting,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center px-2 px-sm-3"
      style={{
        background: "linear-gradient(to bottom right, #7f00ff, #000000)",
        overflowY: "auto",
      }}
    >
      <div className="card p-4 p-md-4 p-sm-3 shadow position-relative w-100" style={{ maxWidth: "350px", minWidth: 0 }}>
        <button
          type="button"
          className="btn-close position-absolute end-0 top-0 m-2"
          aria-label="Close"
          onClick={onClose}
        />
        <div className="text-center mb-2">
          <div
            className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{ width: "38px", height: "38px" }}
          >
            {/* Use SVG for person-plus icon for best compatibility */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path d="M14 8a.5.5 0 0 1 .5.5V10h1.5a.5.5 0 0 1 0 1H14.5v1.5a.5.5 0 0 1-1 0V11H12a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 14 8z"/>
              <path d="M5.216 14A2.238 2.238 0 0 1 3 11.784c0-.637.527-1.197 1.319-1.58C5.482 9.417 6.73 9 8 9s2.518.417 3.681 1.204C12.473 10.587 13 11.147 13 11.784A2.238 2.238 0 0 1 10.784 14H5.216z"/>
            </svg>
          </div>
          <h3
            className="mt-2 mb-1 fw-bold"
            style={{ fontSize: "1.50rem", letterSpacing: "-0.5px", fontFamily: 'ClashDisplay-Semibold, Clash Display, sans-serif' }}
          >
            Create Account
          </h3>
          <p
            className="text-muted mb-2"
            style={{ fontSize: "0.8rem", fontFamily: 'Poppins-Medium, Arial, sans-serif', fontWeight: 500 }}
          >
            Join us today and get started
          </p>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-2">
            <label
              htmlFor="firstName"
              className="form-label fw-semibold mb-1"
              style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "-0.2px", fontFamily: 'Poppins, Poppins-Light, Arial, sans-serif', fontWeight: 300 }}
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className={`form-control form-control-sm p-2 ${errors.firstName ? "is-invalid" : ""}`}
              style={{ fontSize: "0.85rem", background: "#f8f9fa", border: "0px !important", boxShadow: "0px 0px 1px 0.3px darkgray", borderRadius: "10px !important"}}
              placeholder="Enter Your First Name"
              value={userData.firstName}
              onChange={e => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
              required
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
          <div className="mb-2">
            <label
              htmlFor="lastName"
              className="form-label fw-semibold mb-1"
              style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "-0.2px", fontFamily: 'Poppins, Poppins-Light, Arial, sans-serif', fontWeight: 300 }}
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className={`form-control form-control-sm p-2 ${errors.lastName ? "is-invalid" : ""}`}
              style={{ fontSize: "0.85rem", background: "#f8f9fa", border: "0px !important", boxShadow: "0px 0px 1px 0.3px darkgray", borderRadius: "10px !important" }}
              placeholder="Enter Your Last Name"
              value={userData.lastName}
              onChange={e => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="form-label fw-semibold mb-1"
              style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "-0.2px", fontFamily: 'Poppins, Poppins-Light, Arial, sans-serif', fontWeight: 300 }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`form-control form-control-sm p-2 ${errors.email ? "is-invalid" : ""}`}
              style={{ fontSize: "0.85rem", background: "#f8f9fa", border: "0px !important", boxShadow: "0px 0px 1px 0.3px darkgray", borderRadius: "10px !important" }}
              placeholder="Enter Your Email Address"
              value={userData.email}
              onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="form-label fw-semibold mb-1"
              style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "-0.2px", fontFamily: 'Poppins, Poppins-Light, Arial, sans-serif', fontWeight: 300 }}
            >
              Mobile
            </label>
            <input
              id="phone"
              type="tel"
              className={`form-control form-control-sm p-2 ${errors.phone ? "is-invalid" : ""}`}
              style={{ fontSize: "0.85rem", background: "#f8f9fa", border: "0px !important", boxShadow: "0px 0px 1px 0.3px darkgray", borderRadius: "10px !important" }}
              placeholder="Enter Your Mobile Number"
              value={userData.phone}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="form-check mb-2 text-start">
            <input className="form-check-input" type="checkbox" id="termsCheck" required />
            <label
              className="form-check-label"
              htmlFor="termsCheck"
              style={{ fontSize: "0.72rem", color: "#888", fontFamily: 'Poppins, Poppins-Light, Arial, sans-serif', fontWeight: 300 }}
            >
              I agree to the <a href="#" style={{ fontSize: "0.72rem", fontFamily: 'Poppins, Poppins-Light, Arial, sans-serif', fontWeight: 300 }}>Terms of Service</a> and <a href="#" style={{ fontSize: "0.72rem", fontFamily: 'Poppins, Poppins-Light, Arial, sans-serif', fontWeight: 300 }}>Privacy Policy</a>
            </label>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-sm fw-bold d-flex align-items-center justify-content-center gap-2" disabled={isSubmitting} style={{ fontSize: "1.08rem", padding: "0.55rem 0" }}>
              <i className="bi bi-person-plus-fill me-1" style={{ fontSize: "1.1rem" }}></i>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}