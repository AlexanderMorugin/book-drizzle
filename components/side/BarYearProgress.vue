<template>
  <SideBarContainer padding="slim">
    <ProgressYearBlock :place="place" :title="title" />
  </SideBarContainer>
</template>

<script setup>
const { place, title } = defineProps(["place", "title"]);
</script>
