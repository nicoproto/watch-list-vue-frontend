<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Add a Movie</h2>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <movie-form v-else @save-data="saveData"></movie-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MovieForm from "../../components/movies/MovieForm.vue";

export default {
  components: {
    MovieForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    ...mapActions({
      registerMovie: "movies/registerMovie",
    }),
    async saveData(data) {
      this.isLoading = true;
      try {
        const responseData = await this.registerMovie(data);
        this.$router.replace(`/movies/${responseData.id}`);
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
