<template>
  <p v-if="bookComment" class="bookComment">
    {{ bookComment }}
  </p>

  <p v-else class="bookComment">Комментария пока нет.</p>
</template>

<script setup>
const { bookComment } = defineProps(["bookComment"]);
</script>

<style lang="scss" scoped>
.bookComment {
  font-family: "Inter-Regular", sans-serif;
  font-size: 16px;
  line-height: 26px;
  color: var(--text-color-thirdly);
}
</style>
