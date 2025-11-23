<template>
  <div class="bookEditContainer">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.bookEditContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--white-thirdly);
  border-radius: var(--border-radius-l);
  box-shadow: var(--shadow-fourthly);
  backdrop-filter: blur(8px);
  padding: 24px;

  @media (max-width: 767px) {
    padding: 20px 10px;
  }
}
</style>
