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