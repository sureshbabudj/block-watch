import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sureshbabudj.blockwatch",
  appName: "block-watch",
  webDir: "out",
  server: {
    url: "https://8e86-2003-c9-8f21-e3c7-498c-e807-318f-2cdf.ngrok-free.app",
  },

  ios: { contentInset: "always", scrollEnabled: true },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
