<template>
  <div class="bookStarRating">
    <div v-for="i in maxStars" :key="i" @click="setRating(i)">
      <button>
        <IconStar :class="['starIcon', i <= rating ? 'starIconActive' : '']" />
      </button>
    </div>
  </div>
</template>

<script setup>
const { value, maxStars } = defineProps(["value", "maxStars"]);
const emit = defineEmits(["update:value"]);

const rating = ref(value);

const setRating = (newRating) => {
  rating.value = newRating;
  emit("ratingData", newRating);
};
</script>

<style scoped>
.bookStarRating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.starIcon {
  width: 24px;
  height: 24px;
  color: var(--gray-seventhly);
}

.starIconActive {
  width: 24px;
  height: 24px;
  fill: var(--yellow-primary);
  color: var(--yellow-primary);
}
</style>
