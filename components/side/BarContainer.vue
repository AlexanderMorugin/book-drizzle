<template>
  <div
    :class="[
      'sideBarContainer',
      { sideBarContainer_wide: padding === 'wide' },
      { sideBarContainer_slim: padding === 'slim' },
      { sideBarContainer_top: line === 'top' },
      { sideBarContainer_bottom: line === 'bottom' },
      { sideBarContainer_books: place === 'books' },
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
const { padding, line, place } = defineProps(["padding", "line", "place"]);
</script>

<style lang="scss" scoped>
.sideBarContainer {
  display: flex;
  justify-content: center;
  align-items: center;

  &_wide {
    padding: 24px;
  }

  &_slim {
    padding: 16px;
  }

  &_top {
    border-top: 1px solid var(--border-color-primary);
  }

  &_bottom {
    border-bottom: 1px solid var(--border-color-primary);
  }

  &_books {
    border-radius: var(--border-radius-l);
    background: var(--gradient-status-counter);
    padding: 18px;
  }
}
</style>
