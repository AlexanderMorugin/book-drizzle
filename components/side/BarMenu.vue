<template>
  <SideBarContainer padding="slim">
    <ul class="sideBarMenu">
      <li v-for="button in menuButtons" :key="button.id">
        <ClientOnly>
          <SideBarMenuButton
            :name="button.name"
            :title="button.title"
            :number="button.number"
            :route="button.route"
            :isActive="
              button.title === headerStore.headerTitle
                ? (button.status = true)
                : (button.status = false)
            "
            @click="emit('closeMobileSideBar')"
          />
        </ClientOnly>
      </li>
    </ul>
  </SideBarContainer>
</template>

<script setup>
const headerStore = useHeaderStore();
// const bookStore = useBookStore()

const emit = defineEmits(["closeMobileSideBar"]);

const menuButtons = ref([
  {
    id: 1,
    name: "home",
    title: "Главная",
    number: null,
    status: false,
    route: "/",
  },
  {
    id: 2,
    name: "library",
    title: "Моя библиотека",
    number: null,
    status: false,
    route: "/library",
  },
  {
    id: 3,
    name: "addBook",
    title: "Добавить книгу",
    number: null,
    status: false,
    route: "/add-book",
  },
]);

// onMounted(() => {
//   bookStore.loadBooks()
// })
</script>

<style lang="scss" scoped>
.sideBarMenu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
</style>
