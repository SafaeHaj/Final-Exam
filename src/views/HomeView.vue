<template>
  <div class="home-container">
    <div class="content">
      <h2 class="welcome">
        "One cannot think well, love well, sleep well, if one has not dined well." -
        <span class="author">Virginia Woolf</span>
      </h2>
    </div>
  </div>
</template>


<style scoped>
.home-container {
  padding: 0;
  margin: 0;
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  z-index: 1;
  text-align: center;
}

.welcome {
  font-size: 3rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 20px;
  max-width: 80%;
  margin: 0 auto;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

/* Remove specific author styling */
.author {
  color: #ffcb05;
}

/* Responsive styling */
@media (max-width: 768px) {
  .welcome {
    font-size: 2rem;
  }
}
</style>
