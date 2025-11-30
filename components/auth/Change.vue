<template>
  <div class="authChange">
    <div class="authChange__top">
      <div class="authChange__line" />
      <span class="authChange__textTop">или</span>
      <div class="authChange__line" />
    </div>

    <span class="authChange__textMiddle">
      {{ place === "register" ? "Уже есть аккаунт?" : "Нет аккаунта?" }}
    </span>

    <AuthAccountButton :place="place" @click="goToAuthPage" />
  </div>
</template>

<script setup>
const { place } = defineProps(["place"]);

const goToAuthPage = () => {
  if (place === "register") {
    return navigateTo("/login");
  } else {
    return navigateTo("/register");
  }
};
</script>

<style lang="scss" scoped>
.authChange {
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__line {
    width: 100%;
    height: 1px;
    background: var(--border-color-primary);
  }

  &__textTop {
    font-family: "Inter-Regular", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-sixthly);
  }

  &__textMiddle {
    font-family: "Inter-Regular", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-secondary);
    text-align: center;
    margin-top: 16px;
  }
}
</style>
