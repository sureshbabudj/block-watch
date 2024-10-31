import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sureshbabudj.blockwatch",
  appName: "block-watch",
  webDir: "out",
  server: {
    url: "https://shy-cars-lie.loca.lt",
  },

  ios: { contentInset: "always", scrollEnabled: true },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
