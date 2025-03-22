import { IFilmView } from "@/domain/Filme"
import { Building2, Calendar, Ruler, Users, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  film: IFilmView | null;
};

function FilmView({ film }: Props) {
  if (!film) {
    return null;
  }

  const onClickDownload = () => {
    const link = document.createElement('a');
    link.href = film.images[0];
    link.download = film.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg max-w-2xl w-full self-center pt-20">
      <div className="p-6">
        <div className="flex gap-2 items-center">
          <h2 style={{ flex: '2' }} className="text-2xl font-bold text-gray-900 flex justify-center">{film.title}</h2>
        </div>

        <div className="mt-6 space-y-4">
          <div className="aspect-video">
            <img
              src={film.images[0]}
              alt={film.title}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-sm text-gray-600">Año:</span>
                <p className="font-medium">{film.year}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-sm text-gray-600">Director:</span>
                <p className="font-medium">{film.directors}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-sm text-gray-600">Productor:</span>
                <p className="font-medium">{film.productions}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-sm text-gray-600">Filmoteca:</span>
                <p className="font-medium">{film.filmLibrary}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Ruler className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-sm text-gray-600">Formato:</span>
                <p className="font-medium">{film.dimensions} - {film.format}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Archive className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <span className="text-sm text-gray-600">Genero:</span>
                <p className="font-medium">{film.genders}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Elenco principal:</h4>
            <div className="mt-2">
              {film.stars.split(', ').map((star, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2 mb-2"
                >
                  {star}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {
              film.available
                ? (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Disponible para préstamo
                  </span>
                ) : (<span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">No disponible</span>)
            }
            {film.downloadable && (
              <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={onClickDownload}>Descargar</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmView;
