<template>
  <div
    :class="[
      'progressBar',
      { progressBar_green: color === 'green' },
      { progressBar_blue: color === 'blue' || color === 'red' },
    ]"
  >
    <span
      :class="[
        'progressBar__indicator',
        { progressBar__indicator_green: color === 'green' },
        { progressBar__indicator_blue: color === 'blue' },
        { progressBar__indicator_red: color === 'red' },
      ]"
      :style="{ width: `${progress}%` }"
    ></span>
  </div>
</template>

<script setup>
const { progress, color } = defineProps(["progress", "color"]);
</script>

<style lang="scss" scoped>
.progressBar {
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: var(--border-radius-s);

  &_green {
    background: var(--green-primary);
  }

  &_blue {
    background: var(--border-color-primary);
  }

  &__indicator {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    border-radius: var(--border-radius-s);
    transition: all 0.3s;

    &_green {
      background: var(--gradient-form-login);
    }

    &_blue {
      background: var(--gradient-progress-blue);
    }

    &_red {
      background: var(--gradient-user-icon-box);
    }
  }
}
</style>
