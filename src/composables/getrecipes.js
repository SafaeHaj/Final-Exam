import { ref } from 'vue';
import { app } from '@/firebase/config';

const getRecipes = () => {
    const recipes = ref([])
    const error = ref(null)

  const load = async () => {
    try {
      const res = await app.collection('recipes').get()
      recipes.value = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
    }
    catch(err) {
      error.value = err.message
    }
  }
  return { recipes, error, load }
};

export default getRecipes;