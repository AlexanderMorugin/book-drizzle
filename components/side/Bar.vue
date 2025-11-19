<template>
  <aside class="sideBar">
    <div>
      <SideBarLogo place="sidebar" />
      <SideBarAuth />

      <!-- 
      <SideBarMenu @closeMobileSideBar="emit('closeMobileSideBar')" />
      <SideBarYearProgress
        v-if="userStore.user.length && isYearProgress"
        place="sidebar"
        title="Цель 2024"
      />
      <SideBarReadingProgress
        v-if="bookStore.books.length && isReadingBooks"
        place="sidebar"
        title="Сейчас читаю"
      /> -->
    </div>

    <!-- <SideBarCounter padding="slim" line="top" /> -->
  </aside>
</template>

<style lang="scss" scoped>
.sideBar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
  min-height: 100vh;
  background: var(--bg-color-primary);
  border-right: 1px solid var(--border-color-primary);

  @media (max-width: 1023px) {
    max-width: 100%;
    border-right: none;
  }
}
</style>
