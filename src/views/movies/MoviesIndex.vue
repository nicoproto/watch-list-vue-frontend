<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <movie-filter @change-filter="setFilters"></movie-filter>
      <movie-search @update-filter="filterLists"></movie-search>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadMovies(true)"
            >Refresh</base-button
          >
          <base-button link to="/movies/new">Add new movie</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasMovies">
          <movie-item
            v-for="movie in filteredMovies"
            :key="movie.id"
            :id="movie.id"
            :rating="movie.rating"
            :title="movie.title"
            :poster_url="movie.poster_url"
          ></movie-item>
        </ul>
        <h3 v-else>No movies found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import MovieItem from "../../components/movies/MovieItem.vue";
import MovieFilter from "../../components/movies/MovieFilter.vue";
import MovieSearch from '../../components/movies/MovieSearch.vue';
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    MovieItem,
    MovieFilter,
    MovieSearch,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        "high-rating": true,
        "mid-rating": true,
        "low-rating": true,
      },
      textFilter: "",
    };
  },
  computed: {
    ...mapGetters({
      movies: "movies/movies",
    }),
    filteredMovies() {
      const movies = this.movies.filter((movie) => {
        if (this.activeFilters["high-rating"] && movie.rating > 9) {
          return true;
        }
        if (
          this.activeFilters["mid-rating"] &&
          movie.rating > 7 &&
          movie.rating <= 9
        ) {
          return true;
        }
        if (this.activeFilters["low-rating"] && movie.rating <= 7) {
          return true;
        }
      });

      if (this.textFilter != "") {
        return movies.filter((movie) => {
          return movie.title.toLowerCase().includes(this.textFilter.toLowerCase());
        });
      }
      return movies;
    },
    hasMovies() {
      // TODO: Update this getter with mapGetters
      return !this.isLoading && this.$store.getters["movies/hasMovies"];
    },
  },
  created() {
    this.setMovies();
  },
  methods: {
    ...mapActions({
      loadMovies: "movies/loadMovies",
    }),
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async setMovies(refresh = false) {
      this.isLoading = true;
      try {
        await this.loadMovies({ forceRefresh: refresh });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    filterLists(updatedTextFilter) {
      this.textFilter = updatedTextFilter;
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
