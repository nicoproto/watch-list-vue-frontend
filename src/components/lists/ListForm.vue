<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !nameIsValid }">
      <label for="title">Name</label>
      <input
        type="text"
        id="title"
        v-model.trim="list.name"
        @blur="clearValidity('title')"
      />
      <p v-if="!nameIsValid">Name must not be empty.</p>
    </div>
    <base-button>{{ submitBtnText }} list</base-button>
  </form>
</template>

<script>
export default {
  props: {
    listValues: {
      type: Object,
      default: () => ({
        name: "",
      }),
    },
  },
  data() {
    return {
      formIsValid: true,
      nameIsValid: true,
      list: { ...this.listValues },
    };
  },
  computed: {
    submitBtnText() {
      return this.list.id ? "Update" : "Create";
    },
  },
  methods: {
    clearValidity(input) {
      this[input] = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.list.name == "") {
        this.nameIsValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      this.$emit("save-data", this.list);
      this.list = {
        name: "",
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

.invalid input {
  border: 1px solid red;
}
</style>
