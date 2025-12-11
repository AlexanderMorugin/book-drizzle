<template>
  <div class="infoBlock">
    <h1 class="infoBlock__title">О проекте Book Drizzle</h1>
    <p class="infoBlock__text">
      О проекте Book Drizzle О проекте Book Drizzle О проекте Book Drizzle О
      проекте Book Drizzle
    </p>
    <p class="infoBlock__text">
      О проекте Book Drizzle О проекте Book Drizzle О проекте Book Drizzle О
      проекте Book Drizzle О проекте Book Drizzle О проекте Book Drizzle О
      проекте Book Drizzle О проекте Book Drizzle О проекте Book Drizzle О
      проекте Book Drizzle О проекте Book Drizzle О проекте Book Drizzle О
      проекте Book Drizzle О проекте Book Drizzle О проекте Book Drizzle О
      проекте Book Drizzle О проекте Book Drizzle О проекте Book Drizzle О
      проекте Book Drizzle О проекте Book Drizzle
    </p>
    <p class="infoBlock__text">
      О проекте Book Drizzle О проекте Book Drizzle О проекте Book Drizzle О
      проекте Book Drizzle
    </p>
  </div>
</template>

<style lang="scss" scoped>
.infoBlock {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 1152px;

  &__title {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 28px;
    line-height: 36px;
    color: var(--text-color-primary);
  }

  &__text {
    font-family: "Inter-Regular", sans-serif;
    font-size: 17px;
    line-height: 29px;
    color: var(--text-color-secondary);
  }
}
</style>
