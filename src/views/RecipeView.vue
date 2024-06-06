<template>
  <div v-if="recipe" class="recipe-card">
    <router-link class="edit" :to="`/edit-recipe/${recipe.id}`">Edit</router-link>
    <h2 class="recipe-title">{{ recipe.name }}</h2>
    <img class="recipe-image" :src="recipe.image" alt="Image of Baked Salmon with Roasted Asparagus">
    <p class="recipe-description">{{ recipe.description }}</p>

    <div class="recipe-details">
      <ul class="recipe-ingredients">
        <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
          {{ ingredient.name }} - {{ ingredient.quantity }} {{ ingredient.unit }}
        </li>
      </ul>

      <div class="recipe-instructions">
        <h3>Instructions:</h3>
        <ol>
          <li v-for="instruction in recipe.instructions" :key="instruction">
            {{ instruction }}
          </li>
        </ol>
      </div>

      <div class="recipe-meta">
        <p>Preparation time: {{ recipe.temps_preparation }} minutes</p>
        <p>Cooking time: {{ recipe.temps_cuisson }} minutes</p>
        <p>Diet: {{ recipe.regime }}</p>
        <p>Serves: {{ recipe.portions }}</p>
        <ul class="recipe-tags">
          <li v-for="tag in recipe.tags" :key="tag">{{ tag }}</li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import getRecipe from "@/composables/getrecipe";

export default {
  data() {
    return {
      recipe: null,
    };
  },
  computed: {
    recipeId() {
      return this.$route.params.id;
    }
  },
  async created() {
    try {
      const { recipe, error, load } = getRecipe(this.recipeId);
      await load();
      this.recipe = recipe.value
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<style scoped>
.recipe-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 100px auto;
  padding: 20px;
  background-color: #fff;
  position: relative;
}

.edit {
  text-decoration: none;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  position: absolute;
  top: 20px;
  right: 20px;
}
.recipe-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.recipe-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.recipe-description {
  font-size: 16px;
  margin-bottom: 15px;
  color: #666;
}

.recipe-details {
  margin-top: 20px;
}

.recipe-section {
  margin-bottom: 20px;
}

.recipe-section h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.recipe-ingredients li,
.recipe-instructions li,
.recipe-meta p {
  font-size: 14px;
  color: #444;
}

.recipe-tags {
  display: flex;
  flex-wrap: wrap;
}

.recipe-tags li {
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 12px;
  color: #555;
}

ul {
  list-style-type: none;
  padding: 0;
}

.edit-link {
  display: block;
  text-align: right;
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.edit-link:hover {
  text-decoration: underline;
}
</style>