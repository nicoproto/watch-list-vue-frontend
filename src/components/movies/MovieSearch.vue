<template>
  <base-card>
    <h2>Search by name</h2>
    <input type="text" v-model="filterValue" />
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filterValue: "",
    };
  },
  watch: {
    filterValue() {
      this.$emit("update-filter", this.filterValue);
    },
  },
};
</script>
