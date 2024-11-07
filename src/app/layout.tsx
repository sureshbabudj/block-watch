import type { Metadata } from "next";
import { Provider } from "jotai";
import NonSSR from "@/components/NonSSR";
import { Barlow } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const barlow = Barlow({ weight: "500", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Block Watch",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </head>
        <body
          className={cn(barlow.className, `antialiased`)}
          style={{
            padding:
              "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
          }}
        >
          {children}
          <NonSSR showInfo={false} />
        </body>
      </html>
    </Provider>
  );
}
