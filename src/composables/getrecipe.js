import { ref } from 'vue'
import { app } from '@/firebase/config'

const getRecipe = (id) => {

  const recipe = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      let res = await app.collection('recipes').doc(id).get()

      if (!res.exists) {
        throw Error('Uh oh! This recipe does not exist!')
      }
      recipe.value = { ...res.data(), id: res.id }
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { recipe, error, load } 
}

export default getRecipe