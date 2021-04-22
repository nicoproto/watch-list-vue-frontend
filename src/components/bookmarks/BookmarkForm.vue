<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !movieIsValid }">
      <label for="movie">Movie</label>
      <select v-model="bookmark.movie_id" @blur="clearValidity('movie')">
        <option disabled value="">Please select one</option>
        <option v-for="movie in movies" :key="movie.id" :value="movie.id"> {{ movie.title }}</option>
      </select>
      <p v-if="!movieIsValid">Movie must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !commentIsValid }">
      <label for="comment">Comment</label>
      <input
        type="text"
        id="comment"
        v-model.trim="bookmark.comment"
        @blur="clearValidity('comment')"
      />
      <p v-if="!commentIsValid">Comment must not be empty.</p>
    </div>
    <base-button>Create Bookmark</base-button>
  </form>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      default: () => []
    },
    bookmarkValues: {
      type: Object,
      default: () => ({
        comment: "",
        movie_id: null,
      }),
    },
  },
  data() {
    return {
      commentIsValid: true,
      movieIsValid: true,
      formIsValid: true,
      bookmark: { ...this.bookmarkValues },
    };
  },
  methods: {
    clearValidity(input) {
      this[input + "IsValid"] = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.bookmark.comment == "") {
        this.commentIsValid = false;
        this.formIsValid = false;
      }

      if (!this.movie_id) {
        this.movieIsValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      this.$emit("save-data", this.bookmark);
      this.bookmark = {
        movie_id: null,
        comment: "",
      };
    }
  }
}
</script>

<style scoped>
form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input, .invalid select {
  border: 1px solid red;
}
</style>