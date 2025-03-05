import Sidebar from "@/components/Sidebar";
import styles from "./page.module.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        {children}
      </div>
    </main>
  );
}