<template>
  <main class="authLayout">
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
  </main>
</template>

<style lang="scss" scoped>
.authLayout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: var(--gradient-primary);
  padding: 40px 10px;

  @media (max-width: 1023px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (max-width: 767px) {
    align-items: flex-start;
    padding-left: 10px;
    padding-right: 10px;
  }

  @media (max-width: 379px) {
    padding: 0 0 30px 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
