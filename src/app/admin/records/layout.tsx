import styles from "../page.module.css";
import Navbar from "@/components/Navbar";

export default function RecordsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar
        title="Registros"
        description="Gestiona los registros de la filmoteca"
        buttonText="Nuevo registro"
        hrefButton="/admin/records/new"
      />
      <section className={styles.subcontent} style={{ marginBottom: '0' }}>
        {children}
      </section>
    </>
  );
}