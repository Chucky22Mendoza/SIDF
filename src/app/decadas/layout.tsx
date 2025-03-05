import { Footer } from "@/components/home/components/Footer";
import { Header } from "@/components/home/components/Header";

export default function DecadesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-1 flex-col scroll-smooth">
      <Header hasNavigation={false} />
      {children}
      <Footer />
    </main>
  );
}