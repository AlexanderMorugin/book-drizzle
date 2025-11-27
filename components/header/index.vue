<template>
  <header class="header">
    <div class="header__titleBox">
      <ButtonIconNavigate
        v-if="isScreenLarge"
        name="menu"
        @handleClick="emit('openMobileSideBar')"
      />

      <ClientOnly>
        <!-- <span class="header__title">{{ headerStore.headerTitle }}</span> -->
        <span class="header__title">{{ pageTitle }}</span>
      </ClientOnly>
    </div>

    <ButtonIconNavigate name="back" @handleClick="goBack" />
  </header>
</template>

<script setup>
// const headerStore = useHeaderStore();
const route = useRoute();
const router = useRouter();
const { isScreenLarge } = useResizeLarge();

const emit = defineEmits(["openMobileSideBar"]);

const pageTitle = computed(() => {
  if (route.path === "/") {
    // headerStore.setHeaderTitle("Главная");
    return "Главная";
  }
  if (route.path === "/library") {
    // headerStore.setHeaderTitle("Главная");
    return "Моя библиотека";
  }
  if (route.path === "/add-book") {
    // headerStore.setHeaderTitle("Главная");
    return "Добавить книгу";
  }
});
// const pageTitle = ref(headerStore.headerTitle);

const goBack = () => router.go(-1);

// await headerStore.headerTitle
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
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__title {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 22px;
    line-height: 28px;
    color: var(--text-color-primary);

    @media (max-width: 1023px) {
      font-size: 18px;
      line-height: 24px;
    }
  }

  @media (max-width: 767px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
