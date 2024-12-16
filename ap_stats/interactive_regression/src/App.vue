<template>
  <div id="app">
    <h1>Interactive Linear Regression</h1>
    <LinearRegression />
  </div>
</template>

<script>
import LinearRegression from "./components/LinearRegression";

export default {
  components: {
    LinearRegression,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}
</style>
