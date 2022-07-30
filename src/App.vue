<template>
  <div id="app">
    <nav>
      <router-link to="/c1">TopicNav</router-link> |
      <router-link to="/c2">TopicSearch</router-link> |
      <router-link to="/c3">c3</router-link> |
      <router-link to="/c4">c4</router-link> |
      <router-link to="/c5">c5</router-link> |
      <router-link to="/c6">c6</router-link> |
      <router-link to="/c7">c7</router-link> |
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  text-align: center;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
