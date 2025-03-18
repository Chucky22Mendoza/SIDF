'use client';

import { FilmForm } from "@/components/films/film-form";
import Navbar from "@/components/Navbar";
import styles from "../../page.module.css";
import { getProcessData } from "./actions";
import { IFilm } from "@/domain/Filme";
import { accesibilityDefault, characteristicsDefault, descriptionDefault, generalDefault, useFilmeStore } from "@/store/FilmeStore";

type Props = {
  params: {
    id: string;
  };
};

async function loadData(id: string | undefined = undefined) {
  let film: IFilm = {
    general: generalDefault,
    description: descriptionDefault,
    characteristics: characteristicsDefault,
    accesibility: accesibilityDefault,
  };

  if (id) {
    film = await getProcessData(id) as IFilm;
  }
  if (!film) return;
  const stateFilme = useFilmeStore.getState();

  stateFilme.setFilmeId(id);
  stateFilme.setGeneral(film.general);
  stateFilme.setDescription(film.description);
  stateFilme.setCharacteristics(film.characteristics);
  stateFilme.setAccesibility(film.accesibility);
}

export default async function Page({ params }: Props) {
  await loadData(params.id === 'create' ? undefined : params.id);

  return (
    <>
      <Navbar
        title={
          params.id === 'create'
            ? 'Nuevo Registro'
            : 'Editar Registro'
        }
        description={
          params.id === 'create'
            ? 'Crea un nuevo registro de la filmoteca'
            : 'Edita el registro de la filmoteca'
        }
      />
      <section className={styles.subcontent} style={{ marginBottom: '0' }}>
        <FilmForm />
      </section>
    </>
  );
}