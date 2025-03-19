'use client';

import FilmView from "@/components/viewer/film-view";
import { useFilms } from "@/hooks/useFilms";
import { useFilmsListStore } from "@/store/FilmsListStore";
import { useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

function page({ params }: Props) {
  const { performFilm } = useFilms();
  const film = useFilmsListStore((state) => state.film);

  useEffect(() => {
    performFilm(params.id);
  }, [params.id])

  return (
    <FilmView film={film} />
  );
}

export default page;
