<template>
    <div class="recipe-card">
        <button class="delete-button" @click="deleteRecipe">×</button>
        <div class="image-container">
            <img class="recipe-image" :src="recipe.image" alt="Image of Baked Salmon with Roasted Asparagus">
        </div>
        <h2 class="recipe-title">{{ recipe.name }}</h2>
        <p class="recipe-description">{{ recipe.description }}</p>
        <router-link class="read" :to="`/recipe/${recipe.id}`">Read more...</router-link>
        <ul class="recipe-tags">
            <li v-for="tag in recipe.tags" :key="tag">{{ tag }}</li>
        </ul>
    </div>
</template>

<script>
import { app } from '@/firebase/config.js';
export default {
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            name: this.recipe.name,
            description: this.recipe.description.substring(0, 100) + "...",
            tags: this.recipe.tags,
            image: this.recipe.image
        };
    },
    methods: {
        deleteRecipe() {
            app.collection('recipes').doc(this.recipe.id).delete();
            location.replace(location.href);
        }
    }
}
</script>

<style scoped>
.recipe-card {
    position: relative;
    max-width: 400px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px auto;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.image-container {
    width: 100%;
    height: 200px; /* Reserve space for the image */
    background-color: #f0f0f0; /* Placeholder background color */
    border-radius: 10px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.recipe-image {
    width: 100%;
    height: auto;
    display: block;
}

.recipe-title {
    color: #ff9500;
    font-size: 24px;
    margin-bottom: 15px;
    font-weight: bold;
}

.recipe-description {
    color: #333533;
    font-size: 16px;
    margin-bottom: 15px;
}

.recipe-tags {
    list-style-type: none;
    padding: 0;
    margin: 0 0 15px 0;
}

.recipe-tags li {
    display: inline-block;
    background-color: #f1ba0a;
    color: #333533;
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 5px;
    font-size: 14px;
}

.read {
    color: #f1ba0a;
    text-decoration: none;
    font-weight: bold;
}

.read:hover {
    text-decoration: underline;
}

.delete-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: #f44336;
    color: #fff;
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete-button:hover {
    background-color: #d32f2f;
}
</style>
