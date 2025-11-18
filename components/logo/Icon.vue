<template>
  <div
    :class="[
      'logoIcon',
      { logoIcon_register: place === 'register' },
      { logoIcon_login: place === 'login' },
    ]"
  >
    <IconLogo
      :class="[
        'iconLogo',
        { iconLogo_register: place === 'register' },
        { iconLogo_login: place === 'login' },
      ]"
    />
  </div>
</template>

<script setup>
const { place } = defineProps(["place"]);
</script>

<style lang="scss" scoped>
.logoIcon {
  display: flex;
  justify-content: center;
  align-items: center;

  &_register {
    width: 56px;
    height: 56px;
    border-radius: var(--border-radius-xl);
    background: var(--violet-primary);
  }

  &_login {
    width: 56px;
    height: 56px;
    border-radius: var(--border-radius-xl);
    background: var(--green-primary);
  }
}
.iconLogo {
  // width: 24px;
  // height: 24px;
  // color: var(--white-primary);

  &_register {
    width: 32px;
    height: 32px;
    color: var(--violet-secondary);
  }

  &_login {
    width: 32px;
    height: 32px;
    color: var(--green-secondary);
  }
}
</style>
