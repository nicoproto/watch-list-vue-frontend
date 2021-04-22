<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Add a List</h2>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <list-form v-else @save-data="saveData"></list-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ListForm from "../../components/lists/ListForm.vue";

export default {
  components: {
    ListForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    ...mapActions({
      registerList: "lists/registerList",
    }),
    handleError() {
      this.error = null;
    },
    async saveData(data) {
      this.isLoading = true;
      try {
        const responseData = await this.registerList(data);
        // TODO: Add conditional here
        this.$router.replace(`/lists/${responseData.id}`);
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
  },
};
</script>
