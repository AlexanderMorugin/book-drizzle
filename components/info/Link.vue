<template>
  <NuxtLink
    to="/about"
    :class="['infoLink', { infoLink_header: place === 'header' }]"
    >О проекте</NuxtLink
  >
</template>

<script setup>
const { place } = defineProps(["place"]);
</script>

<style lang="scss" scoped>
.infoLink {
  grid-area: info;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: var(--gradient-user-icon-box);
  box-shadow: var(--shadow-thirdly);
  border-radius: var(--border-radius-s);
  font-family: "Inter-SemiBold", sans-serif;
  font-size: 23px;
  line-height: 32px;
  color: var(--white-primary);
  padding: 18px;
  transition: 0.35s ease;

  &:hover {
    box-shadow: var(--shadow-secondary);
    animation: shine 3s infinite;
    background-image: -webkit-gradient(
      linear,
      left center,
      right center,
      from var(--violet-thirdly),
      color-stop(0.5, var(--violet-secondary)),
      to var(--violet-thirdly)
    );
    background-image: -webkit-linear-gradient(
      left,
      var(--violet-thirdly) 0%,
      var(--violet-secondary) 50%,
      var(--violet-thirdly) 100%
    );
  }

  &_header {
    max-width: 250px;
    font-size: 18px;
    line-height: 22px;
    padding: 12px;

    @media (max-width: 767px) {
      max-width: 120px;
      font-size: 16px;
      line-height: 20px;
    }
  }
}
</style>
