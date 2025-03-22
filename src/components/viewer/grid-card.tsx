import { IFilmView } from "@/domain/Filme";
import { ArrowRight, Building2, Users } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  film: IFilmView;
  asPublic?: boolean;
};

function GridCard({ film, asPublic = false }: Props) {
  return (
    <div
      key={film.id}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-video relative">
        <img
          src={film.images[0]}
          alt={film.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
          <h3 className="text-white text-lg font-semibold">{film.title}</h3>
          <p className="text-white/80 text-sm">{film.year}</p>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>{film.directors}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Building2 className="h-4 w-4 mr-2" />
          <span>{film.filmLibrary}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className={`px-3 py-1 rounded-full text-sm ${
            film.available
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {film.available ? 'Disponible' : 'No disponible'}
          </div>
          <Button>
            <Link href={asPublic ? `/search/${film.id}` : `/admin/viewer/${film.id}`} className="flex items-center text-blue-600 hover:text-blue-800">
              Ver más
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GridCard;
