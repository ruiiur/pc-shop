<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mb} from './common/browser'
export default {
  name: 'App',
  mounted () {
    if (mb=='IE') {
      window.addEventListener('hashchange', () => {
        let currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
    else{
      console.log('mbmbmb',mb);
    }
  }

}
</script>

<style>
/* @import './assets/css/common.scss'; */
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#app{
  height: 100%;
}
</style>
