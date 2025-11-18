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
      font-family: "Inter-SemiBold", sans-serif;
      font-size: 28px;
      line-height: 36px;
    }

    @media (max-width: 1023px) {
      text-align: center;
    }
  }

  &__subtitle {
    color: var(--text-color-secondary);

    &_auth {
      font-family: "Inter-Regular", sans-serif;
      font-size: 17px;
      line-height: 28px;
    }

    @media (max-width: 1023px) {
      text-align: center;
    }
  }

  @media (max-width: 1023px) {
    flex-direction: column;
    width: 100%;
  }

  @media (max-width: 379px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
