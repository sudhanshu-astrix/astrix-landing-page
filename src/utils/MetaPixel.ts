export const trackEvent = (eventName: string, params:{[key: string]: unknown}) => {
  if (typeof window !== "undefined") {
    window.fbq("track", eventName, params as Record<string, unknown>);
  }
};