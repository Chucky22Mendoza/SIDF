import styles from "../page.module.css";
import Navbar from "@/components/Navbar";

export default function CatalogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar
        title="Catálogos"
        description="Gestiona los catálogos de la filmoteca"
      />
      <section className={styles.subcontent} style={{ marginBottom: '0' }}>
        {children}
      </section>
    </>
  );
}