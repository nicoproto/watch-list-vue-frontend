<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>{{ selectedMovie.title }}</h2>
        <h3>Rating: {{ selectedMovie.rating }} stars</h3>
      </base-card>
    </section>
    <section>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <base-card v-else class="movie-info">
        <img :src="selectedMovie.poster_url" />
        <p>{{ selectedMovie.overview }}</p>
      </base-card>
    </section>
    <section>
      <base-card v-if="!isLoading">
        <header>
          <h3>Actions:</h3>
          <base-button link :to="editLink">Edit</base-button>
          <base-button @click="removeMovie">Destroy</base-button>
        </header>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["id"],
  data() {
    return {
      isLoading: false,
      error: null,
      selectedMovie: {},
    };
  },
  computed: {
    ...mapGetters({
      selectedStoreMovie: "movies/selectedMovie",
    }),
    editLink() {
      return this.$route.path + "/edit";
    },
    destroyLink() {
      return this.$route.path;
    },
    title() {
      return this.selectedMovie.title;
    },
    overview() {
      return this.selectedMovie.overview;
    },
    poster_url() {
      return this.selectedMovie.poster_url;
    },
    rating() {
      return this.selectedMovie.rating;
    },
  },
  methods: {
    ...mapActions({
      loadMovie: "movies/loadMovie",
      destroyMovie: "movies/destroyMovie",
    }),
    async setMovie() {
      try {
        await this.loadMovie({ id: this.id });
        this.selectedMovie = this.selectedStoreMovie;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    async removeMovie() {
      this.isLoading = true;
      if (confirm("Do you really want to delete?")) {
        try {
          await this.destroyMovie({ id: this.id });
          this.$router.replace("/movies");
        } catch (error) {
          this.error = error.message || "Something went wrong!";
        }
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.setMovie();
  },
};
</script>

<style scoped>
img {
  height: 150px;
  margin-right: 1rem;
}

.movie-info {
  display: flex;
}
</style>
