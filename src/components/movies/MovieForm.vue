<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !titleIsValid }">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        v-model.trim="movie.title"
        @blur="clearValidity('title')"
      />
    </div>
    <p v-if="!titleIsValid">Title must not be empty.</p>
    <div class="form-control" :class="{ invalid: !overviewIsValid }">
      <label for="overview">Overview</label>
      <textarea
        id="overview"
        rows="5"
        v-model.trim="movie.overview"
        @blur="clearValidity('overview')"
      ></textarea>
    </div>
    <p v-if="!overviewIsValid">Overview must not be empty.</p>
    <div class="form-control" :class="{ invalid: !ratingIsValid }">
      <label for="rating">Rating</label>
      <input
        type="number"
        id="rating"
        v-model.number="movie.rating"
        @blur="clearValidity('rating')"
      />
    </div>
    <p v-if="!ratingIsValid">Rating must be greater than 0.</p>
    <div class="form-control" :class="{ invalid: !poster_urlIsValid }">
      <label for="poster">Poster URL</label>
      <input
        type="text"
        id="poster"
        v-model.trim="movie.poster_url"
        @blur="clearValidity('poster_url')"
      />
    </div>
    <p v-if="!poster_urlIsValid">Poster URL must not be empty.</p>

    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>{{ submitBtnText }} movie</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  props: {
    movieValues: {
      type: Object,
      default: () => ({
        title: "",
        overview: "",
        rating: null,
        poster_url: "",
      }),
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      movie: { ...this.movieValues },
      titleIsValid: true,
      overviewIsValid: true,
      ratingIsValid: true,
      poster_urlIsValid: true,
      formIsValid: true,
    };
  },
  computed: {
    submitBtnText() {
      return this.movie.id ? "Update" : "Create";
    },
  },
  methods: {
    clearValidity(input) {
      this[input + "IsValid"] = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.movie.title == "") {
        this.titleIsValid = false;
        this.formIsValid = false;
      }
      if (this.movie.overview == "") {
        this.overviewIsValid = false;
        this.formIsValid = false;
      }
      if (!this.movie.rating || this.movie.rating < 0) {
        this.ratingIsValid = false;
        this.formIsValid = false;
      }
      if (this.movie.poster_url == "") {
        this.poster_urlIsValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      this.$emit("save-data", this.movie);
      this.movie = {
        title: "",
        overview: "",
        rating: null,
        poster_url: "",
      };
    },
  },
};
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

input:focus,
textarea:focus {
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

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
