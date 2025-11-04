import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!;
let isInitialized = false;

export const initMixpanel = () => {
  if (typeof window === "undefined" || isInitialized) return;

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV !== "production",
    track_pageview: true,
  });

  isInitialized = true;
};

export default mixpanel;
