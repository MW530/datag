<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    toCommodity() {
      this.$router.push('commodity');
    },
  },
};
</script>

<style>
html, body{
  margin: 0;
  padding: 0;
}
</style>
