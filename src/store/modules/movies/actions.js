export default {
  async registerMovie(context, payload) {
    // TODO: Check to clean this up
    const movieData = {
      title: payload.title,
      overview: payload.overview,
      poster_url: payload.poster_url,
      rating: payload.rating,
    };
    const response = await fetch("http://localhost:3000/api/v1/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie: movieData }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to create movie!"
      );
      throw error;
    }

    context.commit("registerMovie", {
      ...movieData,
      id: responseData.id,
    });

    return responseData;
  },
  async loadMovies(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch("http://localhost:3000/api/v1/movies");

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch movies!"
      );
      throw error;
    }

    const movies = [];

    for (const key in responseData) {
      const movie = {
        id: responseData[key].id,
        title: responseData[key].title,
        poster_url: responseData[key].poster_url,
        rating: responseData[key].rating,
      };

      movies.push(movie);
    }

    context.commit("setMovies", movies);
    context.commit("setFetchTimestamp");
  },
  async loadMovie(context, payload) {
    const response = await fetch(
      `http://localhost:3000/api/v1/movies/${payload.id}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch movie!");
      throw error;
    }

    context.commit("setMovie", responseData);
  },
  async destroyMovie(context, payload) {
    const response = await fetch(
      `http://localhost:3000/api/v1/movies/${payload.id}`,
      {
        method: "DELETE",
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to destroy movie!"
      );
      throw error;
    }

    context.commit("destroyMovie", {
      id: payload.id,
    });
  },
  async updateMovie(context, payload) {
    const movieData = {
      title: payload.title,
      overview: payload.overview,
      poster_url: payload.poster_url,
      rating: payload.rating,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/movies/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie: movieData,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to update movie!"
      );
      throw error;
    }

    context.commit("updateMovie", {
      ...movieData,
      id: payload.id,
    });
  },
};
