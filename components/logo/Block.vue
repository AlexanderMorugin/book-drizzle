<template>
  <div
    :class="[
      'logoBlock',
      {
        logoBlock_login:
          place === 'register' ||
          place === 'login' ||
          place === 'addBook' ||
          place === 'progressYear',
      },
    ]"
  >
    <LogoIcon :place="place" />

    <div>
      <h1
        v-if="place === 'addBook'"
        class="logoBlock__title logoBlock__title_addBook"
      >
        Добавить новую книгу
      </h1>
      <h2
        v-if="place === 'progressYear'"
        class="logoBlock__title logoBlock__title_addBook"
      >
        Цель чтения
      </h2>
      <div
        v-if="place === 'register' || place === 'login' || place === 'sidebar'"
        class="logoBlock__title logoBlock__title_login"
      >
        Book Drizzle
      </div>

      <div
        :class="[
          'logoBlock__subtitle',
          {
            logoBlock__subtitle_login:
              place === 'register' || place === 'login',
          },
          {
            logoBlock__subtitle_addBook:
              place === 'addBook' || place === 'progressYear',
          },
        ]"
      >
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup>
const { place } = defineProps(["place"]);

const subtitle = ref("Ваш читательский журнал");

const setSubtitle = () => {
  if (place === "sidebar") subtitle.value = "Ваш читательский журнал";
  if (place === "register") subtitle.value = "Начните свой читательский путь";
  if (place === "login") subtitle.value = "Ваш персональный трекер чтения";
  if (place === "addBook") subtitle.value = "Пополните свою библиотеку";
  if (place === "progressYear")
    subtitle.value = "Установите годовую цель по количеству книг";
};

setSubtitle();
</script>

<style lang="scss" scoped>
.logoBlock {
  display: flex;
  align-items: center;
  gap: 12px;

  &__title {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 18px;
    line-height: 28px;
    color: var(--text-color-primary);

    &_login {
      font-size: 28px;
      line-height: 36px;
    }

    &_addBook {
      font-size: 19px;
      line-height: 28px;

      @media (max-width: 1023px) {
        font-size: 28px;
        line-height: 36px;
      }
    }

    @media (max-width: 1023px) {
      text-align: center;
    }

    &__subtitle {
      font-family: "Inter-Regular", sans-serif;
      font-size: 14px;
      line-height: 20px;
      color: var(--text-color-secondary);

      &_login {
        font-size: 17px;
        line-height: 28px;
      }

      &_addBook {
        font-size: 16px;
        line-height: 24px;

        @media (max-width: 1023px) {
          font-size: 17px;
          line-height: 28px;
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 1023px) {
    flex-direction: column;
  }

  @media (max-width: 379px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
