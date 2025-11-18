<template>
  <div class="authPromoText">
    <p class="authPromoText__title">
      {{
        place === "register"
          ? "Присоединяйтесь к сообществу читателей"
          : "Отслеживайте свои книги"
      }}
    </p>
    <p class="authPromoText__subtitle">
      {{
        place === "register"
          ? "Создайте свой персональный трекер книг и начните организовывать свою библиотеку уже сегодня. Ставьте цели и достигайте их!"
          : "Организуйте свою библиотеку, ставьте цели чтения и следите за прогрессом. Создайте идеальную систему для управления вашими книгами."
      }}
    </p>

    <ul v-if="place === 'register'" class="authPromoText__list">
      <li
        v-for="item in registerList"
        :key="item.id"
        class="authPromoText__item"
      >
        <div class="authPromoText__circle" />
        <span class="authPromoText__text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { place } = defineProps(["place"]);

const registerList = ref([
  {
    id: 1,
    text: "Отслеживание прогресса чтения",
  },
  {
    id: 2,
    text: "Организация личной библиотеки",
  },
  {
    id: 3,
    text: "Постановка и достижение целей",
  },
]);
</script>

<style lang="scss" scoped>
.authPromoText {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title {
    font-family: "Inter-Medium", sans-serif;
    font-size: 23px;
    line-height: 32px;
    color: var(--text-color-primary);
  }

  &__subtitle {
    font-family: "Inter-Regular", sans-serif;
    font-size: 17px;
    line-height: 29px;
    color: var(--text-color-secondary);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 8px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-left: 16px;
  }

  &__circle {
    width: 8px;
    height: 8px;
    border-radius: var(--border-radius-full);
    background: var(--violet-thirdly);
  }

  &__text {
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: var(--text-color-thirdly);
  }
}
</style>
