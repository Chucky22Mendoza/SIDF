'use client';

import { FilmList } from "@/components/films/film-list";
import Navbar from "@/components/Navbar";
import styles from "../page.module.css";

export default function RecordsPage() {
  return (
    <>
      <Navbar
        title="Registros"
        description="Gestiona los registros de la filmoteca"
        buttonText="Nuevo registro"
        hrefButton="/admin/records/create"
      />
      <section className={styles.subcontent} style={{ marginBottom: '0' }}>
        <FilmList />
      </section>
    </>
  );
}