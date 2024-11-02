import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col py-16 overflow-hidden max-h-[100dvh]">
      <Header />
      <div className="flex-1  overflow-y-auto overflow-x-hidden p-2">
        <main className="mx-auto w-full">{children}</main>
      </div>
      <NavBar />
    </div>
  );
}
