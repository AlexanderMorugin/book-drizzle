<template>
  <div
    :class="[
      'progressYearBlock',
      {
        progressYearBlock_wide: place === 'home',
      },
    ]"
  >
    <div class="progressYearBlock__titleBox">
      <div class="progressYearBlock__titleIcon">
        <IconProgress v-if="place === 'sidebar'" class="progressIcon" />
        <h2 class="progressYearBlock__title">{{ title }}</h2>
      </div>

      <!-- For Main Content -->
      <div
        v-if="place === 'home' && userStore.user?.book_for_years > 0"
        class="progressYearBlock__starBox"
      >
        <IconStar class="starIcon" />
        <span
          class="progressYearBlock__quantity progressYearBlock__quantity_accent"
          >{{ finishedBooks.length }} /
          {{ userStore.user?.book_for_years }}</span
        >
      </div>
    </div>

    <!-- Если установлена цель на год, показываем этот блок -->
    <!-- For SideBar Content -->
    <div
      v-if="userStore.user?.book_for_years"
      class="progressYearBlock__details"
    >
      <div v-if="place === 'sidebar'" class="progressYearBlock__detailsTop">
        <span class="progressYearBlock__detailsTopTitle">Прогресс</span>
        <span class="progressYearBlock__quantity"
          >{{ finishedBooks.length }} /
          {{ userStore.user?.book_for_years }}</span
        >
      </div>

      <div class="progressYearBlock__detailsMain">
        <ProgressBar :progress="isYearProgress" color="green" />
        <div
          :class="[
            'progressYearBlock__detailsTextBox',
            { progressYearBlock__detailsTextBox_big: place === 'home' },
          ]"
        >
          <!-- For Main Content -->
          <p v-if="place === 'home'">
            {{ finishedBooks.length }} книги прочитаны
          </p>

          <!-- For Main and SideBar Content -->
          <p>{{ isYearProgress }}% выполнено</p>
        </div>
      </div>

      <!-- For Main Content -->
      <p v-if="place === 'home'" class="progressYearBlock__detailsBottom">
        Для достижения цели еще
        {{ userStore.user?.book_for_years - finishedBooks.length }}
        книг!
      </p>
    </div>

    <!-- Если цели на год нет, показываем этот блок -->
    <div v-else>
      <p class="no-info">
        Установите годовую цель по количеству книг
        <NuxtLink to="/add-book" class="link">здесь</NuxtLink>.
      </p>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore();
const bookStore = useBookStore();

const finishedBooks = computed(() =>
  bookStore.books.filter((item) => item.progress === 100)
);

const isYearProgress = computed(() =>
  Math.round(
    (finishedBooks.value.length / userStore.user?.book_for_years) * 100
  )
);

const { place, title } = defineProps(["place", "title"]);
</script>

<style scoped>
.progressYearBlock {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: var(--border-radius-l);
  background: var(--gray-thirdly);
  width: 100%;
  padding: 16px;
}
.progressYearBlock_wide {
  gap: 16px;
  padding: 32px;
  box-shadow: var(--shadow-secondary);
}
.progressYearBlock__titleBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progressYearBlock__titleIcon {
  display: flex;
  align-items: center;
  gap: 8px;
}
.progressYearBlock__title {
  font-family: "Inter-Medium", sans-serif;
  font-size: 15px;
  line-height: 24px;
  color: var(--text-color-primary);
}
.progressYearBlock__details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.progressYearBlock__detailsTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.progressYearBlock__detailsTopTitle {
  font-family: "Inter-Regular", sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-color-secondary);
}
.progressYearBlock__quantity {
  font-family: "Inter-Medium", sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-color-primary);
}
.progressYearBlock__quantity_accent {
  color: var(--yellow-primary);
}
.progressYearBlock__detailsMain {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.progressYearBlock__detailsTextBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-family: "Inter-Regular", sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: var(--text-color-secondary);
}
.progressYearBlock__detailsTextBox_big {
  font-size: 14px;
  line-height: 20px;
}
.progressYearBlock__detailsBottom {
  font-family: "Inter-Regular", sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-color-secondary);
}

.progressYearBlock__starBox {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* .progressYearBlock__link {
  color: var(--blue-primary);
  text-decoration: underline;
  transition: 0.25s ease;
} */

/* .progressYearBlock__link:hover {
  color: var(--red-primary);
} */

.progressIcon {
  color: var(--green-secondary);
}
.starIcon {
  width: 16px;
  height: 16px;
  fill: var(--yellow-primary);
  color: var(--yellow-primary);
}

@media (max-width: 767px) {
  .progressYearBlock_wide {
    padding: 20px 10px;
  }
}
</style>
