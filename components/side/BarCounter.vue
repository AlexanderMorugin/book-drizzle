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
// const bookStore = useBookStore()

const { padding, line, place } = defineProps(["padding", "line", "place"]);

const counter = ref([
  {
    number: 10,
    text: "Прочитано",
    status: "done",
  },
  {
    number: 2,
    text: "Читаю",
    status: "reading",
  },
  {
    number: 5,
    text: "К чтению",
    status: "mustDo",
  },
]);

// onMounted(() => {
//   bookStore.loadPlanedBooks()
//   bookStore.loadReadingBooks()
//   bookStore.loadDoneBooks()
// })
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
