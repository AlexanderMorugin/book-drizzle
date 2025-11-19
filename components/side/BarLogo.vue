<template>
  <SideBarContainer padding="wide" line="bottom">
    <LogoBlock :place="place" />
  </SideBarContainer>
</template>

<script setup>
const { place } = defineProps(["place"]);
</script>
