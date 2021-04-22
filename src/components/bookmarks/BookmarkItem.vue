<template>
  <li>
    <img :src="movie.poster_url">
    <div>
      <h3>{{ movie.title }}</h3>
      <p>Comment: {{ comment }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "comment", "movie"],
}
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
</style>