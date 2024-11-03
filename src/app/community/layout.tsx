import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-sm:overflow-hidden">
      <Header />
      <main className="max-sm:py-16 max-sm:h-[100dvh] max-sm:overflow-y-auto px-2">
        {children}
      </main>
      <NavBar />
    </div>
  );
}
