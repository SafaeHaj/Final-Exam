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

      <button class="add" type="submit">Ajouter la recette</button>
    </form>
  </div>
</template>

<script>
import { app } from '@/firebase/config.js';
import { getUser } from '@/composables/getUser';

export default {
  data() {
    return {
      name: '',
      description: '',
      ingredients: [
        { nom: '', quantité: '', unité: '' }
      ],
      instructions: [''],
      temps_preparation: 0,
      temps_cuisson: 0,
      regime: '',
      portions: 0,
      tags: [],
      image: ''
    }
  },
  methods: {
    addIngredient() {
      if (this.ingredients.length < 20) {
        this.ingredients.push({ name: '', quantity: '', unit: '' });
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

    async submitForm() {
      const uid = await getUser().uid;
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
        image: this.image,
        authorID: uid
      };
      
      console.log(recipeData);
      const Ref = await app.collection('recipes').add(recipeData);
      const recipeID = Ref.id;
      
      const usersRef = app.collection('users').doc(uid);
      const user = await usersRef.get();
      const currentRecipes = (user.data().recipes == null) ? user.data().recipes : [];

      currentRecipes.push(recipeID);
      await usersRef.update({ recipes: currentRecipes });
      
      this.$router.push("/recipes");
    }
  }
};
</script>

<style scoped>

form {
  max-width: 800px;
  margin: 100px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  height: max-content;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

label {
  width: 100%;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea,
button[type="submit"], select {
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