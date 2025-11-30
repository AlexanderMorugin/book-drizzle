<template>
  <NuxtLink
    :to="route"
    :class="['sideBarMenuButton', { sideBarMenuButton_active: isActive }]"
  >
    <div class="sideBarMenuButton__iconBox">
      <component
        :is="
          name === 'home'
            ? IconHome
            : name === 'library'
            ? IconLibrary
            : IconPlus
        "
        :class="['menuIcon', { menuIcon_active: isActive }]"
      />

      <span
        :class="[
          'sideBarMenuButton__title',
          { sideBarMenuButton__title_active: isActive },
        ]"
        >{{ title }}</span
      >
    </div>

    <div
      v-if="number && bookStore.books.length > 0"
      :class="[
        'sideBarMenuButton__number',
        { sideBarMenuButton__number_active: isActive },
      ]"
    >
      {{ bookStore.books.length }}
    </div>
  </NuxtLink>
</template>

<script setup>
import { IconHome } from "#components";
import { IconLibrary } from "#components";
import { IconPlus } from "#components";

const { name, title, number, route, isActive } = defineProps([
  "name",
  "title",
  "number",
  "route",
  "isActive",
]);

const bookStore = useBookStore();
</script>

<style lang="scss" scoped>
.sideBarMenuButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  border-radius: var(--border-radius-l);
  padding: 14px 16px;

  &:hover {
    background: var(--gray-primary);
  }

  &_active {
    background: var(--gray-thirdly);
    box-shadow: var(--shadow-thirdly);
    cursor: auto;
  }

  &__iconBox {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__title {
    font-family: "Inter-Medium", sans-serif;
    font-size: 15px;
    line-height: 24px;
    color: var(--text-color-secondary);
    transition: 0.25s all;

    &_active {
      color: var(--green-secondary);
    }
  }

  &__number {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-s);
    background: var(--gray-fourthly);
    font-family: "Inter-Medium", sans-serif;
    font-size: 12px;
    line-height: 16px;
    color: var(--text-color-seventhly);
    padding: 3px 9px;

    &_active {
      background: var(--green-primary);
      color: var(--green-fourthly);
    }
  }
}

.menuIcon {
  color: var(--text-color-secondary);
  transition: 0.25s all;

  &_active {
    color: var(--green-secondary);
  }
}

.sideBarMenuButton:hover .sideBarMenuButton__title {
  color: var(--violet-secondary);
}
.sideBarMenuButton:hover .menuIcon {
  color: var(--violet-secondary);
  animation: scale 0.3s ease-in-out;
}
.sideBarMenuButton_active:hover {
  background: var(--gray-thirdly);
}
.sideBarMenuButton_active:hover .menuIcon_active {
  color: var(--green-secondary);
  animation: none;
}
.sideBarMenuButton_active:hover .sideBarMenuButton__title_active {
  color: var(--green-secondary);
}
</style>
