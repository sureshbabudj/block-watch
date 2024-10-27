import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sureshbabudj.blockwatch",
  appName: "block-watch",
  webDir: "out",
  server: {
    url: "https://28f9-87-178-161-167.ngrok-free.app/",
  },

  ios: { contentInset: "always", scrollEnabled: true },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
