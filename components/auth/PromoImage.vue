<template>
  <div
    :class="[
      'authPromoImage',
      { authPromoImage_register: place === 'register' },
      { authPromoImage_login: place === 'login' },
    ]"
  >
    <div
      :class="[
        'authPromoImage__overlay',
        { authPromoImage__overlay_register: place === 'register' },
        { authPromoImage__overlay_login: place === 'login' },
      ]"
    />
    <img
      src="/images/img-auth-promo.webp"
      alt="Promo Image"
      class="authPromoImage__picture"
    />
  </div>
</template>

<script setup>
const { place } = defineProps(["place"]);
</script>

<style lang="scss" scoped>
.authPromoImage {
  position: relative;
  width: 100%;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-primary);

  &_register {
    height: 320px;
  }

  &_login {
    height: 384px;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &_register {
      background: linear-gradient(
        0deg,
        rgba(89, 22, 139, 0.2) 0%,
        rgba(89, 22, 139, 0) 100%
      );
    }

    &_login {
      background: linear-gradient(
        0deg,
        rgba(11, 79, 74, 0.2) 0%,
        rgba(11, 79, 74, 0) 100%
      );
    }
  }

  &__picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
