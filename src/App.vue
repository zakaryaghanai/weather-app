<template>
  <router-view/>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      const url = new URL(window.location.href)
      const route = url.searchParams.get('route')
      if (route) {
        this.$router.push(route)
      }
    }
  }
</script>

<style lang="scss">
  * {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    box-sizing: border-box;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  body, html {
    width: 100%;
    height: 100%;
  }
</style>
