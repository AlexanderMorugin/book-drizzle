<template>
  <section class="authFormContainer">
    <slot />
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.authFormContainer {
  grid-area: form;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: fit-content;
  background: var(--white-thirdly);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-primary);
  border-radius: var(--border-radius-l);
  padding: 32px;

  @media (max-width: 1023px) {
    max-width: 100%;
  }

  @media (max-width: 767px) {
    padding: 20px;
  }

  @media (max-width: 379px) {
    box-shadow: none;
    border-radius: 0;
    padding: 40px 10px 20px 10px;
  }
}
</style>
