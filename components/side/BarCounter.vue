<template>
  <SideBarContainer :padding="padding" :line="line" :place="place">
    <ul class="sideBarCounter">
      <li v-for="item in counter" :key="item.text">
        <SideBarCounterBadge
          :number="item.number"
          :text="item.text"
          :status="item.status"
          :place="place"
        />
      </li>
    </ul>
  </SideBarContainer>
</template>

<script setup>
const bookStore = useBookStore();

const { padding, line, place } = defineProps(["padding", "line", "place"]);

const counter = ref([
  {
    number: computed(
      () => bookStore.books.filter((item) => item.progress === 100).length
    ),
    text: "Прочитано",
    status: "done",
  },
  {
    number: computed(
      () =>
        bookStore.books.filter(
          (item) => item.progress > 0 && item.progress < 100
        ).length
    ),
    text: "Читаю",
    status: "reading",
  },
  {
    number: computed(
      () => bookStore.books.filter((item) => item.progress === 0).length
    ),
    text: "К чтению",
    status: "mustDo",
  },
]);
</script>

<style lang="scss" scoped>
.sideBarCounter {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  column-gap: 12px;
  width: 100%;
}
</style>
