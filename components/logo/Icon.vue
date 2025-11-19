<template>
  <div
    :class="[
      'logoBox',
      { logoBox_register: place === 'register' },
      { logoBox_login: place === 'login' },
      { logoBox_addBook: place === 'addBook' },
      { logoBox_progressYear: place === 'progressYear' },
    ]"
  >
    <IconProgressYear
      v-if="place === 'progressYear'"
      :class="[
        'logoIcon',
        { logoIcon_progressYearIcon: place === 'progressYear' },
      ]"
    />

    <IconLogo
      v-else
      :class="[
        'logoIcon',
        { logoIcon_register: place === 'register' },
        { logoIcon_login: place === 'login' },
        { logoIcon_addBook: place === 'addBook' },
      ]"
    />
  </div>
</template>

<script setup>
const { place } = defineProps(["place"]);
</script>

<style lang="scss" scoped>
.logoBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-l);
  background: var(--gradient-logo-primary);

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

  &_addBook {
    width: 36px;
    height: 36px;
    border-radius: var(--border-radius-m);
    background: var(--green-primary);

    @media (max-width: 1023px) {
      width: 56px;
      height: 56px;
    }
  }

  &_progressYear {
    width: 36px;
    height: 36px;
    border-radius: var(--border-radius-m);
    background: var(--violet-primary);

    @media (max-width: 1023px) {
      width: 56px;
      height: 56px;
    }
  }
}

.logoIcon {
  width: 24px;
  height: 24px;
  color: var(--white-primary);

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

  &_addBook {
    width: 20px;
    height: 20px;
    color: var(--green-secondary);

    @media (max-width: 1023px) {
      width: 32px;
      height: 32px;
    }
  }

  &_progressYearIcon {
    width: 20px;
    height: 20px;
    color: var(--violet-secondary);

    @media (max-width: 1023px) {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
