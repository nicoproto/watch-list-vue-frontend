import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

import NotFound from "../views/NotFound.vue";
import MoviesIndex from "../views/movies/MoviesIndex.vue";
import MoviesNew from "../views/movies/MoviesNew.vue";
import MoviesShow from "../views/movies/MoviesShow.vue";
import MoviesEdit from "../views/movies/MoviesEdit.vue";

import ListsIndex from "../views/lists/ListsIndex.vue";
import ListsShow from "../views/lists/ListsShow.vue";
import ListsNew from "../views/lists/ListsNew.vue";
import ListsEdit from "../views/lists/ListsEdit.vue";

import BookmarksNew from "../views/bookmarks/BookmarksNew.vue";

const routes = [
  {
    path: "/movies",
    component: MoviesIndex,
  },
  {
    path: "/movies/:id",
    component: MoviesShow,
    props: true,
  },
  {
    path: "/movies/:id/edit",
    component: MoviesEdit,
    props: true,
  },
  {
    path: "/movies/new",
    component: MoviesNew,
  },
  {
    path: "/:notFound(.*)",
    component: NotFound,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/lists",
    component: ListsIndex,
  },
  {
    path: "/lists/:id",
    component: ListsShow,
    props: true,
  },
  {
    path: "/lists/new",
    component: ListsNew,
  },
  {
    path: "/lists/:id/edit",
    component: ListsEdit,
    props: true,
  },
  {
    path: "/lists/:list_id/bookmarks/new",
    component: BookmarksNew,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
