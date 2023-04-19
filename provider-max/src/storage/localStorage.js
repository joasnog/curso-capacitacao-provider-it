export const getFromLocalStorage = (key) => {
    const stringJsonMovies = localStorage.getItem(key);
    return JSON.parse(stringJsonMovies);
}

export const saveToLocalStorage = (key, jsonMovieList) => {
    const stringJsonMovie = JSON.stringify(jsonMovieList);
    return localStorage.setItem(key, stringJsonMovie);
}

