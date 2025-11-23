<template>
  <div class="bookStatus">
    <component
      :is="
        isStatusReading
          ? IconLogo
          : isStatusDone
          ? IconDone
          : isStatusPlanned
          ? IconMustDo
          : ''
      "
      :class="[
        'icon',
        { icon_mustDo: isStatusPlanned },
        { icon_reading: isStatusReading },
        { icon_done: isStatusDone },
      ]"
    />
    <span
      :class="[
        'bookStatus__text',
        { bookStatus__text_mustDo: isStatusPlanned },
        { bookStatus__text_reading: isStatusReading },
        { bookStatus__text_done: isStatusDone },
      ]"
      >{{
        isStatusPlanned
          ? "Запланировано"
          : isStatusReading
          ? "Читаю"
          : isStatusDone
          ? "Прочитано"
          : ""
      }}</span
    >
  </div>
</template>

<script setup>
import { IconLogo } from "#components";
import { IconDone } from "#components";
import { IconMustDo } from "#components";

const { progress } = defineProps(["progress"]);

const { isStatusPlanned, isStatusReading, isStatusDone } = useStatus(progress);
</script>

<style lang="scss" scoped>
.bookStatus {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;

  &__text {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-s);
    padding: 3px 9px;
    font-family: "Inter-Medium", sans-serif;
    font-size: 12px;
    line-height: 16px;

    &_reading {
      background: var(--blue-thirdly);
      color: var(--blue-secondary);
    }

    &_done {
      background: var(--blue-thirdly);
      color: var(--green-seventhly);
    }

    &_mustDo {
      background: var(--yellow-secondary);
      color: var(--brown-secondary);
    }
  }
}

.icon {
  width: 16px;
  height: 16px;

  &_reading {
    color: var(--blue-fourthly);
  }

  &_done {
    color: var(--green-sixthly);
  }

  &_mustDo {
    color: var(--yellow-primary);
  }
}
</style>
