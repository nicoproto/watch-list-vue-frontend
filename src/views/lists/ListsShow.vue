<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else>
      <section>
        <base-card>
          <h2>{{ headerText }}</h2>
        </base-card>
      </section>
      <section>
        <base-card>
          <header>
            <h3>Actions:</h3>
            <base-button link :to="editLink">Edit</base-button>
            <base-button @click="removeList">Destroy</base-button>
            <base-button link :to="addBookmarkLink">Add Bookmark</base-button>
          </header>
        </base-card>
      </section>
      <section>
        <base-card>
          <header>
            <h3>Bookmarks</h3>
            </header>
          <ul v-if="hasBookmarks">
            <bookmark-item
              v-for="bookmark in bookmarks"
              :key="bookmark.id"
              :id="bookmark.id"
              :comment="bookmark.comment"
              :movie="bookmark.movie"
            ></bookmark-item>
          </ul>
          <p v-else>No bookmarks for this list yet.</p>
        </base-card>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BookmarkItem from "../../components/bookmarks/BookmarkItem.vue";

export default {
  props: ["id"],
  components: {
    BookmarkItem
  },
  data() {
    return {
      isLoading: false,
      error: null,
      list: {},
      bookmarks: [],
    };
  },
  computed: {
    ...mapGetters({
      selectedList: "lists/selectedList",
      listBookmarks: "bookmarks/bookmarks",
      hasBookmarks: "bookmarks/hasBookmarks",
    }),
    editLink() {
      return this.$route.path + "/edit";
    },
    headerText() {
      return this.list.name.charAt(0).toUpperCase() + this.list.name.slice(1) + " movie list"
    },
    addBookmarkLink() {
      return this.$route.path + "/bookmarks/new";
    }
  },
  methods: {
    ...mapActions({
      loadList: "lists/loadList",
      destroyList: "lists/destroyList",
      loadBookmarks: "bookmarks/loadBookmarks",
    }),
    async setList() {
      this.isLoading = true;
      try {
        await this.loadList({ id: this.id });
        this.list = this.selectedList;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    async removeList() {
      this.isLoading = true;
      if (confirm("Do you really want to delete?")) {
        try {
          await this.destroyList({ id: this.id });
          this.$router.replace("/lists");
        } catch (error) {
          this.error = error.message || "Something went wrong!";
        }
      }
      this.isLoading = false;
    },
    async setBookmarks() {
      try {
        await this.loadBookmarks({ list_id: this.id });
        this.bookmarks = this.listBookmarks;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.setList();
    this.setBookmarks();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
