<template>
  <div id="app">
    <router-view/>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import Vue from 'vue'
import Application from './Application'
export default {
  name: 'App',
  mounted() {
    Vue.use(new Application())
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding:0;
  cursor: url("assets/cur/Normal.cur"),default;
}

#canvas{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
}
</style>
