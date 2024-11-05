import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="max-sm:overflow-hidden ">
        <main className="max-sm:my-20 max-sm:h-[calc(100dvh - 10rem)] max-sm:overflow-y-auto">
          {children}
        </main>
      </div>
      <NavBar />
    </>
  );
}
