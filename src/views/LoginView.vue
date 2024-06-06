<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required>
    </div>
    <button type="submit">Log In</button>
  </form>
</template>

<script setup>
import loginUser from '@/composables/userLogin';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const { error, login } = loginUser();


const handleLogin = async () => {
  await login(email.value, password.value);
  if (!error.value) {
    console.log("User successfully logged in!");
    window.location.href = "/"
  } else {
    console.log("Error during login");
  }
};
</script>

<style scoped>
.login-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: grid;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
