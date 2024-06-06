<template>
  <div id="app">
    <form @submit.prevent="submitForm">
      <label for="nom">Nom:</label>
      <input type="text" id="nom" v-model="name">

      <label for="description">Description:</label>
      <textarea id="description" v-model="description"></textarea>

      <label for="ingredients">Ingrédients:</label>
      
      <ul class="ingredients-list">
        <button class="add" type="button" @click="addIngredient" v-if="ingredients.length < 20">Ajouter un ingrédient</button>
        <li class="ingredient" v-for="(ingredient, index) in ingredients" :key="index">
          <div class="other-cont">
            <label for="nom">Nom</label>
            <input type="text" v-model="ingredient.name">
          </div>
          <div class="other-cont">
            <label for="quantity">Quantité</label>
            <input type="text" v-model="ingredient.quantity">
          </div>
          <div class="other-cont">
            <label for="unit">Unité</label>
            <input type="text" v-model="ingredient.unit">
          </div>
          <button type="button" @click="removeIngredient(index)" v-if="ingredients.length > 1">x</button>
        </li>
      </ul>

      <label for="instructions">Instructions:</label>
      <div class="instructions">
        <button class="add" type="button" @click="addInstruction" v-if="instructions.length < 30">Ajouter une
          instruction</button>
        <ol>
          <li v-for="(instruction, index) in instructions" :key="index">
            <input type="text" class="instruction">
            <button type="button" @click="removeInstruction(index)" v-if="instructions.length > 1">x</button>
          </li>
        </ol>
      </div>

      <div class="other">
        <div class="other-cont">
          <label for="temps_preparation">Temps de préparation:</label>
          <input type="number" id="temps_preparation" v-model="temps_preparation">
        </div>
        <div class="other-cont">
          <label for="temps_cuisson">Temps de cuisson:</label>
          <input type="number" id="temps_cuisson" v-model="temps_cuisson">
        </div>
        <div class="other-cont">
          <label for="regime">Régime:</label>
          <select v-model="regime">
            <option value="" disabled selected>Select Diet Regime</option>
            <option value="omnivore">Omnivore</option>
            <option value="vegetarian">Végétarien</option>
            <option value="vegan">Végétalien</option>
            <option value="pescatarian">Pescétarien</option>
            <option value="flexitarian">Flexitarien</option>
            <option value="fruitarian">Fruitarien</option>
            <option value="raw">Crudivore</option>
            <option value="paleo">Paleo</option>
            <option value="keto">Cétogène</option>
            <option value="gluten-free">Sans gluten</option>
        </select>
        </div>
        <div class="other-cont">
          <label for="portions">Portions:</label>
          <input type="number" id="portions" v-model="portions">
        </div>
        <div class="other-cont">
          <label for="tags">Tags:</label>
          <input type="text" id="tags" v-model="tags">
        </div>
        <div class="other-cont">
          <label for="image">Image:</label>
          <input type="text" id="image" v-model="image">
        </div>
      </div>

      <button class="add" type="submit">Modifier la recette</button>
    </form>
  </div>
</template>

<script>
import { app } from '@/firebase/config.js';
import getRecipe from "@/composables/getrecipe";
export default {
  data() {
    return {
      name: '',
      description: '',
      ingredients: [
        { name: '', quantity: '', unit: '' }
      ],
      instructions: [''],
      temps_preparation: 0,
      temps_cuisson: 0,
      regime: '',
      portions: 0,
      tags: [],
      image: '',
    }
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
      this.name = recipe.value.name;
      this.description = recipe.value.description;
      this.ingredients = recipe.value.ingredients;
      this.instructions = recipe.value.instructions;
      this.temps_preparation = recipe.value.temps_preparation;
      this.temps_cuisson = recipe.value.temps_cuisson;
      this.regime = recipe.value.regime;
      this.portions = recipe.value.portions;
      this.tags = recipe.value.tags;
      this.image = recipe.value.image;
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addIngredient() {
      if (this.ingredients.length < 20) {
        this.recipe.ingredients.push({ nom: '', quantité: '', unité: '' });
      }
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addInstruction() {
      if (this.instructions.length < 30) {
        this.instructions.push('');
      }
    },
    removeInstruction(index) {
      this.instructions.splice(index, 1);
    },
    submitForm() {
      const recipeData = {
        name: this.name,
        description: this.description,
        ingredients: this.ingredients,
        instructions: this.instructions,
        temps_preparation: this.temps_preparation,
        temps_cuisson: this.temps_cuisson,
        regime: this.regime,
        portions: this.portions,
        tags: this.tags.split(',').map(tag => tag.trim()),
        image: this.image
      };
      const recipeRef = app.collection('recipes').doc(this.recipeId);
      async function updateRecipe() {
        await recipeRef.update(recipeData);
      }
      updateRecipe();
      this.name = '';
      this.description = '';
      this.ingredients = [
        { name: '', quantity: '', unit: '' }
      ];
      this.instructions = [''];
      this.temps_preparation = 0;
      this.temps_cuisson = 0;
      this.regime = '';
      this.portions = 0;
      this.tags = [];
      this.image = '';
      this.$router.push({ path: '/recipe/' + this.recipeId });
    }
  }
};
</script>

<style scoped>
body {
  background-color: #f8f8f8;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

label {
  width: 100%;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea, select,
button[type="submit"] {
  flex: 1;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="button"],
button[type="submit"] {
  background-color: #ff8800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  background-color: #ff8800;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.other {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.other-cont {
  display: flex;
  flex-direction: column;
}

.ingredient {
  display: flex;
  gap: 5px;
}

.add {
  font-weight: 600;
  margin: 10px;
}
</style>