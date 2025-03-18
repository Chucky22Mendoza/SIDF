import { IFilm } from "@/domain/Filme";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function getProcessData(id: string): Promise<IFilm | null> {
  try {
    const { success, data } = await fetchWithAuth<IFilm>(`/api/admin/film/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (success) return data as IFilm;

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
