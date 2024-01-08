import { makeAutoObservable, runInAction } from "mobx";
import {deleteMovieAPI, getMoviesAPI, postMovieAPI, putMovieAPI} from "../../api/movie/movieAPI";

class MovieStore {
    movies = [];
    isLoadingMovies = false;

    constructor() {
        makeAutoObservable(this);
    }

    getMovies = async () => {
        try {
            this.isLoadingMovies = true;
            const res = await getMoviesAPI();

            runInAction(() => {
                this.movies = res;
                this.isLoadingMovies = false;
            });
        } catch {
            console.log("error getMovies");
            this.isLoadingMovies = false;
        }
    };

    createMovie = async (name, isMovie, isViewed, year, description, seasons) => {
        try {
            this.isLoadingMovies = true;
            await postMovieAPI(name, isMovie, isViewed, year, description, seasons);
            this.isLoadingMovies = false;
        } catch {
            console.log("error createMovie");
            this.isLoadingMovies = false;
        }
    };

    updateMovie = async (movieId, name, isMovie, isViewed, year, description, seasons) => {
        try {
            this.isLoadingMovies = true;
            await putMovieAPI(movieId, name, isMovie, isViewed, year, description, seasons);
            this.isLoadingMovies = false;
        } catch {
            console.log("error updateMovie");
            this.isLoadingMovies = false;
        }
    };

    deleteMovie = async (movieId) => {
        try {
            this.isLoadingMovies = true;
            await deleteMovieAPI(movieId);
            this.isLoadingMovies = false;
        } catch {
            console.log("error deleteMovie");
            this.isLoadingMovies = false;
        }
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MovieStore();
