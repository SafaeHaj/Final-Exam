<template>
    <div class="container">
      <h2> Welcome <span class="user">{{ username }}</span></h2>
      <div class="user-info">
        <div class="user-details">
          <p><strong>User Email:</strong> {{ userEmail }}</p>
          <p><strong>Member since:</strong> {{ userJoinedDate }}</p>
        </div>
      </div>

      <div v-if="recipes.length > 0" class="added-recipes">
        <h2>Recipes:</h2>
        <div class="recipe-list">
          <div v-for="recipe in recipes" :key="recipe.name" class="recipe-item">
            <h3>{{ recipe.name }}</h3>
            <p>{{ recipe.description }}</p>
            <ul class="ingredient-list">
              <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
                {{ ingredient.name }}: {{ ingredient.quantity }} {{ ingredient.unit }}
              </li>
            </ul>
            <p>Preparation Time: {{ recipe.temps_preparation }} mins</p>
            <p>Cooking Time: {{ recipe.temps_cuisson }} mins</p>
            <p>Portions: {{ recipe.portions }}</p>
            <p>Tags: {{ recipe.tags.join(', ') }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>You have no recipes yet, go to recipes to add one!</p>
      </div>
    </div>
</template>

<script>
import { app, projectAuthentication } from "@/firebase/config";
import { waitForAuthInit } from "@/composables/getUser";

export default {
  name: "ProfileView",
  data() {
    return {
      username: '',
      photoUrl: '',
      userEmail: '',
      userJoinedDate: '',
      recipes: []
    };
  },
  methods: {
    async fetchData() {
      const user = projectAuthentication.currentUser;
      const ref = await app.collection('users').doc(user.uid).get();
      const recipelist = ref.data().recipes;
      for (const recipeId of recipelist) {
        try{
          const res = await app.collection('recipes').doc(recipeId).get()
          const recipey = res.data();
          this.recipes.push(recipey);
        }
        catch (err){
          console.log(err);
        }
      }
      if (user) {
        const actual_user = ref.data();
        this.username = actual_user.username;
        this.photoUrl = user.photoURL;
        this.userEmail = user.email;
        this.userJoinedDate = new Date(user.metadata.creationTime).toLocaleDateString();
      }
    }
  },
  mounted() {
    waitForAuthInit().then(() => {
      this.fetchData();
    })
  }
};
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: left;
  min-height: 100vh;
  width: 90%;
  max-width: 800px; 
  padding: 60px 100px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
  background-color: #ffffff;
  border-radius: 10px; 
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px; 
}


.name {
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.user-details {
  flex: 1;
  padding-left: 20px;
}

.user {
  color: #ff8c00; 
}

.user-details p {
  font-size: 1em;
  color: #555;
}

.added-recipes h2 {
  color: #ff8c00; /* Orange for headers */
  font-size: 1.5em;
  margin-bottom: 10px;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid layout */
  gap: 20px;
}

.recipe-item {
  padding: 15px;
  background-color: #fefbd8; /* Very light yellow */
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.ingredient-list {
  padding: 0;
  list-style-type: none; /* Removes bullet points */
  margin-top: 10px;
}

.ingredient-list li {
  font-size: 0.9em;
  color: #666;
}

p {
  margin: 5px 0;
  color: #666;
}
</style>

