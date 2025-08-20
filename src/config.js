// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://alldays-c9c62d7851d5.herokuapp.com'
  : 'http://localhost:8000';

export const API_ENDPOINTS = {
  REGISTRATION_COUNTS: `${API_BASE_URL}/registration-counts`,
  EVENT_REGISTRATION: `${API_BASE_URL}/event-registration`,
  REGISTRATIONS: `${API_BASE_URL}/registrations`,
};

export default API_BASE_URL;
