export default {
  bookmarks(state) {
    return state.bookmarks;
  },
  hasBookmarks(state) {
    return state.bookmarks && state.bookmarks.length > 0;
  },
};