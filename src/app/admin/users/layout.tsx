import styles from "../page.module.css";
import Navbar from "@/components/Navbar";

export default function ReportsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar
        title="Usuarios"
        description="Gestiona los usuarios de la filmoteca"
      />
      <section className={styles.subcontent} style={{ marginBottom: '0' }}>
        {children}
      </section>
    </>
  );
}