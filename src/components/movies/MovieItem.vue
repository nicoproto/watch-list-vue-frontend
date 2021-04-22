<template>
  <li>
    <img :src="poster_url" />
    <div>
      <h3>{{ title }} - {{ rating }} stars</h3>
      <div class="actions">
        <base-button link :to="movieDetailsLink">See details</base-button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "title", "poster_url", "rating"],
  computed: {
    movieDetailsLink() {
      return this.$route.path + "/" + this.id;
    },
  },
};
</script>

<style scoped>
img {
  height: 150px;
  object-fit: contain;
  margin-right: 1rem;
}

li {
  display: flex;
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
