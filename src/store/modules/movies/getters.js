export default {
  movies(state) {
    return state.movies;
  },
  hasMovies(state) {
    return state.movies && state.movies.length > 0;
  },
  selectedMovie(state) {
    return state.selectedMovie;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60;
  },
};
