<template>
  <aside class="sideBar">
    <div>
      <SideBarLogo place="sidebar" />
      <SideBarAuth />
      <SideBarMenu @closeMobileSideBar="emit('closeMobileSideBar')" />
      <SideBarYearProgress
        v-if="!isMobileSideBar"
        place="sidebar"
        title="Цель 2025"
      />
      <SideBarReadingProgress
        v-if="!isMobileSideBar"
        place="sidebar"
        title="Сейчас читаю"
      />
    </div>

    <SideBarCounter padding="slim" line="top" />
  </aside>
</template>

<script setup>
const { isMobileSideBar } = defineProps(["isMobileSideBar"]);
const emit = defineEmits(["closeMobileSideBar"]);
</script>

<style lang="scss" scoped>
.sideBar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
  min-height: 100vh;
  background: var(--white-primary);

  @media (max-width: 1023px) {
    max-width: 100%;
    border-right: none;
  }
}
</style>
