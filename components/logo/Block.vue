<template>
  <div class="logoBlock">
    <LogoIcon :place="place" />
    <div class="logoBlock__text">
      <span
        :class="[
          'logoBlock__title',
          { logoBlock__title_auth: place === 'register' || place === 'login' },
        ]"
        >{{ title }}</span
      >
      <span
        :class="[
          'logoBlock__subtitle',
          {
            logoBlock__subtitle_auth: place === 'register' || place === 'login',
          },
        ]"
        >{{ subtitle }}</span
      >
    </div>
  </div>
</template>

<script setup>
const { place, title, subtitle } = defineProps(["place", "title", "subtitle"]);
</script>

<style lang="scss" scoped>
.logoBlock {
  display: flex;
  align-items: center;
  gap: 12px;
  width: fit-content;

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__title {
    color: var(--text-color-primary);

    &_auth {
      font-family: "Inter_SemiBold", sans-serif;
      font-size: 28px;
      line-height: 36px;
    }
  }

  &__subtitle {
    color: var(--text-color-secondary);

    &_auth {
      font-family: "Inter-Regular", sans-serif;
      font-size: 17px;
      line-height: 28px;
    }
  }
}
</style>
