<template>
  <div>
    <span class="authConditionsText"
      >Создавая аккаунт, вы соглашаетесь с нашими
    </span>
    <NuxtLink to="#" class="authConditionsLink"
      >Условиями использования</NuxtLink
    >
    <span class="authConditionsText"> и </span>
    <NuxtLink to="#" class="authConditionsLink"
      >Политикой конфиденциальности</NuxtLink
    >
  </div>
</template>

<style lang="scss" scoped>
.authConditionsText {
  font-family: "Inter-Regular", sans-serif;
  font-size: 12px;
  line-height: 24px;
  color: var(--text-color-sixthly);
  text-align: center;
  vertical-align: bottom;
}
.authConditionsLink {
  font-family: "Inter-Medium", sans-serif;
  font-size: 15px;
  line-height: 24px;
  color: var(--violet-secondary);
  transition: 0.25s ease;

  &:hover {
    color: var(--violet-thirdly);
  }
}
</style>
