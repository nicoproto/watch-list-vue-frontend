<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Adding bookmark for '{{ selectedList.name }}'</h2>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <bookmark-form
          v-else
          :movies="movies"
          @save-data="saveData"
        ></bookmark-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BookmarkForm from "../../components/bookmarks/BookmarkForm.vue";

export default {
  props: ["list_id"],
  components: {
    BookmarkForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  computed: {
    ...mapGetters({
      selectedList: "lists/selectedList",
      movies: "movies/movies",
    }),
  },
  methods: {
    ...mapActions({
      loadList: "lists/loadList",
      loadMovies: "movies/loadMovies",
      registerBookmark: "bookmarks/registerBookmark",
    }),
    handleError() {
      this.error = null;
    },
    async setList() {
      this.isLoading = true;
      try {
        await this.loadList({ id: this.list_id });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    async setMovies() {
      this.isLoading = true;
      try {
        await this.loadMovies({ forceRefresh: true });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    async saveData(data) {
      console.log(data);
      this.isLoading = true;
      try {
        const responseData = await this.registerBookmark({...data, list_id: parseInt(this.list_id, 10)});
        this.$router.replace(`/lists/${responseData.list_id}`);
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    }
  },
  created() {
    this.setList();
    this.setMovies();
  }
}
</script>