'use client';

import FilmView from "@/components/viewer/public/film-view";
import { useFilms } from "@/hooks/useFilms";
import { useFilmsListStore } from "@/store/FilmsListStore";
import { useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

function page({ params }: Props) {
  const { performPublicFilm } = useFilms();
  const film = useFilmsListStore((state) => state.film);

  useEffect(() => {
    performPublicFilm(params.id);
  }, [params.id]);

  return (
    <FilmView film={film} />
  );
}

export default page;
