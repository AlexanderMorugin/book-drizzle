<template>
  <SideBarContainer padding="slim">
    <ul class="sideBarMenu">
      <li v-for="button in menuButtons" :key="button.id">
        <SideBarMenuButton
          :name="button.name"
          :title="button.title"
          :number="button.number"
          :route="button.path"
          :isActive="
            button.path === route.path
              ? (button.status = true)
              : (button.status = false)
          "
          @click="emit('closeMobileSideBar')"
        />
      </li>
    </ul>
  </SideBarContainer>
</template>

<script setup>
// const headerStore = useHeaderStore();
const route = useRoute();

const emit = defineEmits(["closeMobileSideBar"]);

const menuButtons = ref([
  {
    id: 1,
    name: "home",
    title: "Главная",
    number: false,
    status: false,
    path: "/",
  },
  {
    id: 2,
    name: "library",
    title: "Моя библиотека",
    number: true,
    status: false,
    path: "/library",
  },
  {
    id: 3,
    name: "addBook",
    title: "Добавить книгу",
    number: false,
    status: false,
    path: "/add-book",
  },
]);

// headerStore.setHeaderTitle();
</script>

<style lang="scss" scoped>
.sideBarMenu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
</style>
