import {projectAuthentication } from "@/firebase/config"
import { app } from "@/firebase/config"
import { ref } from "vue"

const error = ref(null)

const signup = async (email, password, username, photoURL) => {
    photoURL = null
    error.value = null
    try {
        const response = await projectAuthentication.createUserWithEmailAndPassword(email, password)

        if(!response)
            throw new Error('Could not signup')
        console.log(response.user)
        
        await response.user.updateProfile({username: username, photoURL: photoURL})
        const userdata = { username: username, photoURL: photoURL, recipes: []};
        console.log(userdata);
        await app.collection('users').doc(response.user.uid).set(userdata);
        
        error.value = null
        return response.message
    } catch (err) {
        console.log(err)
        error.value = err.message
    }
}

const registerUser = () => {
    return {error, signup}
}

export default registerUser