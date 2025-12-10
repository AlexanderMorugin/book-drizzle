<template>
  <button
    :class="[
      'buttonIconNavigate',
      { buttonIconNavigate_close: name === 'close' },
      { buttonIconNavigate_image: name === 'image' },
    ]"
    @click="emit('handleClick')"
  >
    <IconMenu v-if="name === 'menu'" class="icon" />
    <IconArrow v-if="name === 'back'" class="icon" />
    <IconClear v-if="name === 'clear' || name === 'close'" class="icon" />
    <IconLogout v-if="name === 'logout'" class="icon" />
    <IconEdition
      v-if="name === 'edit' || name === 'image'"
      class="editionIcon"
    />
  </button>
</template>

<script setup>
const { name } = defineProps(["name"]);

const emit = defineEmits(["handleClick"]);
</script>

<style lang="scss" scoped>
.buttonIconNavigate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid transparent;
  border-radius: var(--border-radius-s);
  transition: 0.25s ease;

  &:hover {
    border: 1px solid var(--border-color-primary);
  }

  &_close {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  &_image {
    position: absolute;
    top: 12px;
    right: 12px;
    background: var(--white-primary);
    box-shadow: var(--shadow-thirdly);
  }
}

.menuIcon {
  width: 20px;
  height: 20px;
  color: var(--text-color-primary);
}
.icon {
  color: var(--text-color-primary);
}
.buttonIconNavigate:hover .icon {
  animation: scale 0.3s ease-in-out;
}
.editionIcon {
  width: 16px;
  height: 16px;
  color: var(--text-color-eighthly);
}
.buttonIconNavigate:hover .editionIcon {
  animation: scale 0.3s ease-in-out;
}
</style>
