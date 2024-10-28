import type { Metadata } from "next";
import { Provider } from "jotai";
import NonSSR from "@/components/NonSSR";
import localFont from "next/font/local";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased md:max-h-[100dvh] md:max-w-[100dvw] p-[env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)]`}
        >
          <div className="flex flex-col py-16 overflow-hidden max-h-[100dvh]">
            <Header />
            <div className="flex-1  overflow-y-auto overflow-x-hidden p-2">
              <main className="mx-auto w-full">{children}</main>
              <NonSSR showInfo={false} />
            </div>
            <NavBar />
          </div>
        </body>
      </html>
    </Provider>
  );
}
