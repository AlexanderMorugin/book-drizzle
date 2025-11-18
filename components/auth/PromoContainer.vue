<template>
  <div class="authPromoContainer">
    <LogoBlock :place="place" :title="title" :subtitle="subtitle" />
    <slot />
    <AuthPromoImage :place="place" />
  </div>
</template>

<script setup>
const { place, title, subtitle } = defineProps(["place", "title", "subtitle"]);
</script>

<style lang="scss" scoped>
.authPromoContainer {
  grid-area: promo;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
