<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Editing Movie</h2>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <movie-form
          v-else
          @save-data="saveData"
          :movieValues="{ ...selectedMovie }"
        ></movie-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import MovieForm from "../../components/movies/MovieForm.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["id"],
  components: {
    MovieForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      selectedMovie: "movies/selectedMovie",
    }),
  },
  methods: {
    ...mapActions({
      updateMovie: "movies/updateMovie",
      loadMovie: "movies/loadMovie",
    }),
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.updateMovie(data);
        this.$router.replace(`/movies/${data.id}`);
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    async setMovie() {
      this.isLoading = true;
      try {
        await this.loadMovie({ id: this.id });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.setMovie();
  },
};
</script>
