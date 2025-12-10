<template>
  <div
    :class="[
      'pageContainer',
      { pageContainer_home: width === 'home' },
      { pageContainer_wide: width === 'wide' },
      { pageContainer_normal: width === 'normal' },
      { pageContainer_narrow: width === 'narrow' },
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
const { width } = defineProps(["width"]);
</script>

<style lang="scss" scoped>
.pageContainer {
  display: flex;
  flex-direction: column;
  width: 100%;

  &_home {
    max-width: 1216px;
    gap: 32px;

    @media (max-width: 767px) {
      gap: 20px;
    }
  }

  &_wide {
    max-width: 1216px;
    gap: 32px;
  }

  &_normal {
    max-width: 832px;
    gap: 32px;
  }

  &_narrow {
    max-width: 608px;
    gap: 32px;
  }
}
</style>
