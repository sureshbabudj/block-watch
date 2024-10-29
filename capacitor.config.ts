import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sureshbabudj.blockwatch",
  appName: "block-watch",
  webDir: "out",
  server: {
    url: "https://0d7b-62-209-48-172.ngrok-free.app",
  },

  ios: { contentInset: "always", scrollEnabled: true },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
