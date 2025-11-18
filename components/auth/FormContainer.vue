<template>
  <div class="authFormContainer">
    <slot />
  </div>
</template>

<script setup></script>

<style scoped>
.authFormContainer {
  grid-area: form;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid blue;
}
</style>
