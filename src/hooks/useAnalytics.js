import { useEffect } from 'react';

export const useAnalytics = () => {
  const trackPageView = (pageName) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-09FHJZ2KS2', {
        page_title: pageName,
        page_location: window.location.href,
        page_path: `/${pageName.toLowerCase().replace(/\s+/g, '-')}`
      });
    }
  };

  const trackEvent = (action, category, label, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  };

  return { trackPageView, trackEvent };
}; 