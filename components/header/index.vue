<template>
  <header class="header">
    <div class="header__titleBox">
      <div class="header__titleButton">
        <ButtonIconNavigate
          v-if="isScreenLarge"
          name="menu"
          @handleClick="emit('openMobileSideBar')"
        />
      </div>

      <span class="header__title">{{ pageTitle }}</span>
    </div>

    <ButtonIconNavigate
      v-if="pageTitle === 'Детали книги'"
      name="back"
      @handleClick="goBack"
    />
  </header>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { isScreenLarge } = useResizeLarge();

const emit = defineEmits(["openMobileSideBar"]);

const pageTitle = computed(() => {
  if (route.path === "/") {
    return "Главная";
  }
  if (route.path === "/library") {
    return "Моя библиотека";
  }
  if (route.path === "/add-book") {
    return "Добавить книгу";
  }
  if (route.path === `/library/${route.params.id}`) {
    return "Детали книги";
  }
});

const goBack = () => router.go(-1);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 99px;
  background: var(--white-primary);
  border-bottom: 1px solid var(--border-color-primary);
  backdrop-filter: blur(8px);
  padding-left: 24px;
  padding-right: 24px;

  &__titleBox {
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
  }

  &__titleButton {
    position: absolute;
    left: 0;
    top: 0;
  }

  &__title {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 22px;
    line-height: 28px;
    color: var(--text-color-primary);

    @media (max-width: 1023px) {
      font-size: 18px;
      line-height: 24px;
      padding-left: 60px;
    }
  }

  @media (max-width: 767px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
