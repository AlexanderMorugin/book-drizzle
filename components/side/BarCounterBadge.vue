<template>
  <div class="sideBarCounterBadge">
    <span
      :class="[
        'sideBarCounterBadge__number',
        { sideBarCounterBadge__number_done: status === 'done' },
        { sideBarCounterBadge__number_reading: status === 'reading' },
        { sideBarCounterBadge__number_mustDo: status === 'mustDo' },
        {
          sideBarCounterBadge__number_booksDone:
            place === 'books' && status === 'done',
        },
        {
          sideBarCounterBadge__number_booksReading:
            place === 'books' && status === 'reading',
        },
        {
          sideBarCounterBadge__number_booksMustDo:
            place === 'books' && status === 'mustDo',
        },
      ]"
      >{{ number }}</span
    >
    <span class="sideBarCounterBadge__text">{{ text }}</span>
  </div>
</template>

<script setup>
const { number, text, status, place } = defineProps([
  "number",
  "text",
  "status",
  "place",
]);
</script>

<style lang="scss" scoped>
.sideBarCounterBadge {
  display: flex;
  flex-direction: column;

  &__number {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 18px;
    line-height: 28px;
    text-align: center;

    &_done {
      color: var(--green-fifthly);
    }

    &_reading {
      color: var(--blue-primary);
    }

    &_mustDo {
      color: var(--brown-primary);
    }

    &_booksDone {
      font-size: 24px;
      line-height: 32px;
      color: var(--green-eighthly);
    }

    &_booksReading {
      font-size: 24px;
      line-height: 32px;
      color: var(--blue-primary);
    }

    &_booksMustDo {
      font-size: 24px;
      line-height: 32px;
      color: var(--brown-primary);
    }
  }

  &__text {
    font-family: "Inter-Regular", sans-serif;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: var(--text-color-secondary);
  }
}
</style>
