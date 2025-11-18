<template>
  <div class="authContainer">
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.authContainer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "promo form";
  gap: 32px;
  align-items: center;
  width: 100%;
  max-width: 1152px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    grid-template-areas: "form" "promo";
    gap: 62px;
  }
}
</style>
