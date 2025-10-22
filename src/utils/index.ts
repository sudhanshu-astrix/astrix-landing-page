import { ScrollTrigger } from "gsap/ScrollTrigger";

// Temporarily disable all pinning (e.g. when user clicks a nav link)
export const disableScrollPinning = () => {
  ScrollTrigger.getAll().forEach((st) => {
    if (st.pin) st.disable(false, true); // disable without killing
  });
};

// Re-enable them after navigation completes
export const enableScrollPinning = () => {
  ScrollTrigger.getAll().forEach((st) => {
    if (st.pin) st.enable(false, true);
  });
};

// iOS Safari detection and optimization utilities
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
};

export const isOldIOS = (): boolean => {
  return /OS [1-9]_|OS 10_|OS 11_/.test(navigator.userAgent);
};

export const isIOSSafari = (): boolean => {
  return isIOS() && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
};

// Memory management for iOS Safari
export const optimizeForIOS = () => {
  if (isIOSSafari()) {
    // Reduce memory pressure
    if (isOldIOS()) {
      // For old iOS, be extra conservative
      document.body.style.willChange = 'auto';
      
      // Pause all videos when page becomes hidden
      const handleVisibilityChange = () => {
        const videos = document.querySelectorAll('video');
        if (document.hidden) {
          videos.forEach(video => {
            if (!video.paused) {
              video.pause();
            }
          });
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Clean up on page unload
      window.addEventListener('beforeunload', () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          video.pause();
          video.src = '';
          video.load();
        });
      });
    }
  }
};