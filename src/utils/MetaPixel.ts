export const trackEvent = (eventName: string, params:{[key: string]: unknown}) => {
  if (typeof window !== "undefined" && window.fbq && typeof window.fbq === "function") {
    try {
      window.fbq("track", eventName, params as Record<string, unknown>);
    } catch (error) {
      console.warn("Facebook Pixel tracking error:", error);
    }
  } else {
    console.warn("Facebook Pixel (fbq) is not available");
  }
};