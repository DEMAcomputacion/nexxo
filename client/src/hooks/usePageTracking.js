import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname + location.search;

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: url,
      });
    }

    // Meta Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);
}
