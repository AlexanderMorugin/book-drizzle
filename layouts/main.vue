<template>
  <div class="mainLayout">
    <!-- Сайдбар для десктопа -->
    <ClientOnly>
      <SideBar v-if="!isScreenLarge" />
    </ClientOnly>

    <!-- Сайдбар для мобилки -->
    <SideBarMobile
      :isMobileSideBarOpen="isMobileSideBarOpen"
      @closeMobileSideBar="closeMobileSideBar"
    >
      <SideBar v-if="isScreenLarge" @closeMobileSideBar="closeMobileSideBar" />
    </SideBarMobile>

    <div class="mainLayout__content">
      <Header @openMobileSideBar="openMobileSideBar" />
      <main class="mainLayout__main">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
const { isScreenLarge } = await useResizeLarge();

const isMobileSideBarOpen = ref(false);

const openMobileSideBar = () => (isMobileSideBarOpen.value = true);
const closeMobileSideBar = () => (isMobileSideBarOpen.value = false);
</script>

<style lang="scss" scoped>
.mainLayout {
  display: flex;
  width: 100%;
  max-width: var(--screen-xxl);
  min-height: 100vh;
  border-left: 1px solid var(--border-color-primary);
  border-right: 1px solid var(--border-color-primary);
  margin: 0 auto;

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
  }

  &__main {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1598px;
    height: 100%;
    background: var(--gradient-primary);
    border-left: 1px solid var(--border-color-primary);
    padding: 32px;

    @media (max-width: 767px) {
      padding: 20px 10px;
    }
  }
}
</style>
