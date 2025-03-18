import Sidebar from "@/components/Sidebar";
import styles from "./page.module.css";
import DeleteModal from "@/components/ui/DeleteModal";

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
      <DeleteModal />
    </main>
  );
}