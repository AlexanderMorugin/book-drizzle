<template>
  <section class="authPromoContainer">
    <!-- Лого блок показывается при ширине более 1024px -->
    <LogoBlock
      v-if="!isScreenLarge"
      :place="place"
      :title="title"
      :subtitle="subtitle"
    />
    <slot />
    <AuthPromoImage :place="place" />
  </section>
</template>

<script setup>
const { isScreenLarge } = useResizeLarge();

const { place, title, subtitle } = defineProps(["place", "title", "subtitle"]);
</script>

<style lang="scss" scoped>
.authPromoContainer {
  grid-area: promo;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1023px) {
    max-width: 100%;
  }
}
</style>
