<template>
  <SideBarContainer padding="slim">
    <ProgressReadingBlock :place="place" :title="title" />
  </SideBarContainer>
</template>

<script setup>
const { place, title } = defineProps(["place", "title"]);
</script>

<style lang="scss" scoped>
.sideBarReadingProgress {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
</style>
