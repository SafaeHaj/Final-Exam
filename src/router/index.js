import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecipesListView from '@/views/RecipesListView.vue'
import AddRecipeView from '@/views/AddRecipeView.vue'
import EditRecipeView from '@/views/EditRecipeView.vue'
import RecipeView from '@/views/RecipeView.vue'
import SigninView from '@/views/SigninView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'

import { isLogged, waitForAuthInit } from '@/composables/getUser'; 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {logged: false}
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipesListView,
    meta: {logged: false}
  },
  {
    path: '/add-recipe',
    name: 'addRecipe',
    component: AddRecipeView,
    meta: {logged: true}
  },
  {
    path: '/edit-recipe/:id',
    name: 'editRecipe',
    component: EditRecipeView,
    meta: {logged: true}
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: RecipeView,
    meta: {logged: false}
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfileView,
    meta: {logged: true}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  }
]

const router = createRouter({ 
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const logged = to.matched.some(record => record.meta.logged);

  waitForAuthInit().then(() => {
    if (logged && !isLogged()) {
      alert("You need to be logged in to access this page");
    } else {
      next();
    }
  });
});

export default router
