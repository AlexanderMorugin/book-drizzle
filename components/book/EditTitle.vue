<template>
  <div class="bookEditTitle">
    <h2 class="bookEditTitle__text">
      {{ title }}
    </h2>
    <ButtonIconNavigate :name="name" @handleClick="emit('handleClick')" />
  </div>
</template>

<script setup>
const { title, name } = defineProps(["title", "name"]);
const emit = defineEmits(["handleClick"]);
</script>

<style lang="scss" scoped>
.bookEditTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;

  &__text {
    font-family: "Inter-Medium", sans-serif;
    font-size: 19px;
    line-height: 28px;
    color: var(--text-color-primary);
  }
}
</style>
