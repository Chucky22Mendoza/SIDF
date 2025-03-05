import styles from "../page.module.css";
import Navbar from "@/components/Navbar";

export default function ViewerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar
        title="Visor de imágenes"
        description="Visualiza las imágenes de tu inventario"
      />
      <section className={styles.subcontent} style={{ marginBottom: '0' }}>
        {children}
      </section>
    </>
  );
}