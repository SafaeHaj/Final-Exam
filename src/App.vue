<template>
  <div class="black">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}

#app::before {
  content: "";
  position: absolute;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background: url('@/assets/pexels-chanwalrus-958545.jpg') no-repeat center center fixed;
  background-size: cover;
  filter: blur(8px);
  z-index: -1;
}

.black {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(8, 7, 7, 0.8);
}
</style>
