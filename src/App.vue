<template>
  <div id="app">
    <nav>
      <router-link to="/c1">TopicNav</router-link> |
      <router-link to="/c2">TopicSearch</router-link> |
      <router-link to="/c3">TopicPreview</router-link> |
      <router-link to="/c4">TopicCard</router-link> |
      <router-link to="/c5">PaperCard</router-link> |
      <router-link to="/c6">TCascader</router-link> |
      <router-link to="/c7">SubtopicTree</router-link> |
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
// https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

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
