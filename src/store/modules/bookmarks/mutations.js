export default {
  setBookmarks(state, payload) {
    state.bookmarks = payload;
  },
  registerBookmark(_, payload) {
    console.log(payload);
  }
};