<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      {{ error }}
    </base-dialog>
    <section>
      <base-card>
        <h2>Editing List</h2>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <list-form
          v-else
          @save-data="saveData"
          :listValues="{ ...selectedList }"
        ></list-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ListForm from "../../components/lists/ListForm.vue";

export default {
  props: ["id"],
  components: {
    ListForm,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      selectedList: "lists/selectedList",
    }),
  },
  methods: {
    ...mapActions({
      updateList: "lists/updateList",
      loadList: "lists/loadList",
    }),
    handleError() {
      this.error = null;
    },
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.updateList(data);
        this.$router.replace(`/lists/${data.id}`);
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    async setList() {
      this.isLoading = true;
      try {
        await this.loadList({ id: this.id });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.setList();
  },
};
</script>
