import { IFilmView } from "@/domain/Filme";
import GridCard from "./grid-card";
import { useMemo } from "react";
import EmptyTable from "../ui/EmptyTable";

type Props ={
  films: IFilmView[];
};

function GridImages({ films }: Props) {
  const listRender = useMemo(() => (
    films.map((film) => <GridCard key={film.id} film={film} />)
  ), [films]);

  return (
    <>
      {
        films.length > 0
          ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listRender}
            </div>
          )
          : <EmptyTable />
      }
    </>
  );
}

export default GridImages;
