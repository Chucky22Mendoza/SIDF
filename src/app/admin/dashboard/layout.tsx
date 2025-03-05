import styles from "../page.module.css";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar
        title="Reportes"
        description="Gestiona los registros de la filmoteca"
      />
      <section className={styles.subcontent} style={{ marginBottom: '0' }}>
        {children}
      </section>
    </>
  );
}