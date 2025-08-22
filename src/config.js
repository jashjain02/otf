// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://alldays-c9c62d7851d5.herokuapp.com'
  : 'http://localhost:8000';

export const API_ENDPOINTS = {
  REGISTRATION_COUNTS: `${API_BASE_URL}/registration-counts`,
  EVENT_REGISTRATION: `${API_BASE_URL}/event-registration`,
  REGISTRATIONS: `${API_BASE_URL}/registrations`,
  ORANGETHEORY_REGISTRATION: `${API_BASE_URL}/orangetheory-registration-with-email`,
  SEND_BULK_EMAILS: `${API_BASE_URL}/send-bulk-emails`,
  ALL_REGISTRATIONS_SUMMARY: `${API_BASE_URL}/all-registrations-summary`,
  ALL_REGISTRATIONS: `${API_BASE_URL}/all-registrations`,
};

export default API_BASE_URL;
