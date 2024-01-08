import { SERVER_URL } from "../../variable/URL";
import axios from "axios";

export const getMoviesAPI = async () =>
    (await axios.get(SERVER_URL + `movie/`)).data;

export const postMovieAPI = async (
    name,
    isMovie,
    isViewed,
    year,
    description,
    seasons,
) =>
    await axios.post(SERVER_URL + `movie/`, {
        name: name,
        isMovie: isMovie,
        isViewed: isViewed,
        year: year,
        description: description,
        seasons: seasons,
    });

export const putMovieAPI = async (
    movieId,
    name,
    isMovie,
    isViewed,
    year,
    description,
    seasons,
) =>
    await axios.put(SERVER_URL + `movie/${movieId}`, {
        name: name,
        isMovie: isMovie,
        isViewed: isViewed,
        year: year,
        description: description,
        seasons: seasons,
    });

export const deleteMovieAPI = async (movieId) =>
    await axios.delete(SERVER_URL + `movie/${movieId}`);
