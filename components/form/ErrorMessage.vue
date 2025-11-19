<template>
  <div class="errorMessage">{{ text }}</div>
</template>

<script setup>
const { text } = defineProps(["text"]);
</script>

<style scoped lang="scss">
.errorMessage {
  font-family: "Inter-Medium", sans-serif;
  font-size: 16px;
  line-height: 26px;
  color: var(--red-primary);
  text-align: center;
  padding: 20px;
}
</style>
