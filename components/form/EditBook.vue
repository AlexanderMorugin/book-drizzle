<template>
  <form class="form-auth" @submit.prevent="submitEditBook">
    <FormInput
      lastInput="true"
      label="Изменить название книги *"
      type="text"
      name="bookName"
      :placeholder="bookStore.book.name"
      v-model:value="v$.bookNameField.$model"
      :error="v$.bookNameField.$errors"
      @clearInput="bookNameField = null"
    />
    <FormInput
      lastInput="true"
      label="Изменить автора *"
      type="text"
      name="author"
      :placeholder="bookStore.book.author"
      v-model:value="v$.authorField.$model"
      :error="v$.authorField.$errors"
      @clearInput="authorField = null"
    />
    <FormSelectGenre
      label="Изменить жанр"
      :options="genres"
      v-model:value="v$.selectedGenre.$model"
    />

    <!-- Кнопка Сабмит -->
    <FormSubmitButton
      :place="place"
      :isFromEmpty="isFromEmpty"
      :isLoading="isLoading"
    />
  </form>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minLength } from "@vuelidate/validators";

const { place } = defineProps(["place"]);
const emit = defineEmits(["closeModal"]);

const toast = useToast();
const bookStore = useBookStore();

const isLoading = ref(false);
const bookNameField = ref(null);
const authorField = ref(null);
const selectedGenre = ref(null);

const genres = ref([
  { id: 1, name: "Художественная литература" },
  { id: 2, name: "Искусство и культура" },
  { id: 3, name: "Публицистика и история" },
  { id: 4, name: "Философия и религия" },
  { id: 5, name: "Научно-популярная литература" },
  { id: 6, name: "Хобби, увлечения, навыки" },
]);

// Валидация
const rules = computed(() => ({
  bookNameField: {
    required: helpers.withMessage("Укажите название книги", required),
    minLength: helpers.withMessage("Не менее 3 символов", minLength(3)),
  },
  authorField: {
    required: helpers.withMessage("Укажите имя автора", required),
    minLength: helpers.withMessage("Не менее 3 символов", minLength(3)),
  },
  selectedGenre: {
    required: helpers.withMessage("Выберите жанр", required),
  },
}));

const v$ = useVuelidate(rules, {
  bookNameField,
  authorField,
  selectedGenre,
});

const isFromEmpty = computed(
  () => !bookNameField.value && !authorField.value && !selectedGenre.value
);

const isValid = computed(() => v$.value.$errors);

const submitEditBook = async () => {
  try {
    isLoading.value = true;

    if (!isFromEmpty.value && !isValid.value.length) {
      // собираем книгу для деплоя
      const updateBookData = {
        name: bookNameField.value
          ? bookNameField.value.trim()
          : bookStore.book.name,
        author: authorField.value
          ? authorField.value.trim()
          : bookStore.book.author,
        genre: selectedGenre.value
          ? selectedGenre.value.name
          : bookStore.book.genre,
      };

      const result = await bookStore.updateBook(updateBookData);

      if (result.status.value === "error") {
        toast.error({
          title: "Ошибка!",
          message: "Книгу обновить не удалось.",
        });
      }

      if (result.status.value === "success") {
        toast.success({
          title: "Успешно!",
          message: "Книга обновлена.",
        });

        emit("closeModal");
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
