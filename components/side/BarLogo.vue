<template>
  <SideBarContainer padding="wide" line="bottom">
    <NuxtLink to="/">
      <LogoBlock :place="place" />
    </NuxtLink>
  </SideBarContainer>
</template>

<script setup>
const { place } = defineProps(["place"]);
</script>
