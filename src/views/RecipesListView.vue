<template>
    <div class="container">
        <div class="filters">
            <div class="searchbar">
                <input type="text" v-model="keyword" placeholder="Search..." />
            </div>
            <div class="filter">
                Filtrer par:
                <select v-model="regimefilter">
                    <option value="" disabled selected>Tous</option>
                    <option value="all">Tous</option>
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
                <font-awesome-icon @click="sortRecipes" class="icon" :icon="['fas', 'clock']" />
            </div>
        </div>
        <router-link to="/add-recipe" class="add-recipe">Add a recipe</router-link>
        <div class="recipes-container">
            <div v-for="recipe in filteredRecipes" :key="recipe.id">
                <SingleRecipe :recipe="recipe" />
            </div>
        </div>
    </div>
</template>

<script>
import SingleRecipe from "@/components/SingleRecipe.vue";
import getRecipes from "@/composables/getrecipes";

export default {
    data() {
        return {
            keyword: '',
            recipes: [],
            regimefilter: ''
        };
    },
    async created() {
        await this.getAllRecipes();
    },
    methods: {
        async getAllRecipes() {
            try {
                const { load, recipes } = getRecipes();
                await load();
                this.recipes = recipes.value;
                console.log(recipes);
            } catch (error) {
                console.log(error);
            }
        },
        sortRecipes() {
            this.recipes.sort((a, b) => {
                return a.preparationTime - b.preparationTime;
            });
        }
    },
    computed: {
        filteredRecipes() {
            if (!this.keyword && this.regimefilter == "all") {
                return this.recipes;
            }
            const lowerKeyword = this.keyword.toLowerCase();
            return this.recipes.filter(recipe => {
                const matchesKeyword = (
                    recipe.name.toLowerCase().includes(lowerKeyword) ||
                    recipe.description.toLowerCase().includes(lowerKeyword) ||
                    recipe.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
                );
                const matchesRegimeFilter = !this.regimefilter || recipe.regime.toLowerCase().includes(this.regimefilter);
                return matchesKeyword && matchesRegimeFilter;
            });
        },
        displayedRecipes() {
            return this.filteredRecipes;
        }
    },
    components: {
        SingleRecipe,
    }
};
</script>

<style scoped>
.container {
    background-color: #f7f7f7;
    margin: 0;
    padding: 60px;
    height: 100%;
}

.filter {
    display: flex;
    align-items: center;
    gap: 10px;
}

.icon {color: #ff8c00; cursor: pointer;}

.filter select {
    margin-left: 10px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
    background-color: #ff8c00;
}


body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #f7f7f7;
    color: #333;

}

.searchbar {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.searchbar input {
    width: 100%;
    max-width: 600px;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 30px;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s;
}

.searchbar input:focus {
    border-color: #ffa500;
    outline: none;
}

.add-recipe {
    display: inline-block;
    padding: 10px 20px;
    margin: 20px 0;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #ffa500;
    border: none;
    border-radius: 30px;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.3s;
}

.add-recipe:hover {
    background-color: #ff8c00;
}

.recipes-container {
    overflow-x: scroll;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px;
    height: 100%;
}

.recipe-card {
    background: white;
    height: 500px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.recipe-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recipe-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.recipe-card-content {
    padding: 20px;
    text-align: center;
}

.recipe-card h3 {
    font-size: 20px;
    margin: 10px 0;
}

.recipe-card p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
}
</style>
