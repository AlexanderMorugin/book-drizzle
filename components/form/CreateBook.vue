<template>
  <form class="form-auth" @submit.prevent="submitAddBook">
    <FormInput
      lastInput="true"
      label="Название книги *"
      type="text"
      name="bookName"
      placeholder="Введите название книги"
      v-model:value="v$.bookNameField.$model"
      :error="v$.bookNameField.$errors"
      @clearInput="bookNameField = null"
    />
    <FormInput
      lastInput="true"
      label="Автор *"
      type="text"
      name="author"
      placeholder="Введите имя автора"
      v-model:value="v$.authorField.$model"
      :error="v$.authorField.$errors"
      @clearInput="authorField = null"
    />
    <FormInput
      lastInput="true"
      label="Обложка книги"
      type="text"
      name="imageUrl"
      placeholder="Вставьте ссылку на изображение"
      v-model:value="v$.imageUrlField.$model"
      :error="v$.imageUrlField.$errors"
      @clearInput="imageUrlField = null"
    />

    <!-- Кнопка Сабмит -->
    <FormSubmitButton
      :place="place"
      :isFromEmpty="isFromEmpty"
      :isValid="isValid.length"
      :isLoading="isLoading"
    />
  </form>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minLength, url } from "@vuelidate/validators";

const { place } = defineProps(["place"]);

const userStore = useUserStore();
const bookStore = useBookStore();

const isLoading = ref(false);
const bookNameField = ref(null);
const authorField = ref(null);
const imageUrlField = ref(null);

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
  imageUrlField: {
    url: helpers.withMessage("Вставьте ссылку", url),
  },
}));

const v$ = useVuelidate(rules, {
  bookNameField,
  authorField,
  imageUrlField,
});

const isFromEmpty = computed(() => !bookNameField.value || !authorField.value);

const isValid = computed(() => v$.value.$errors);

const submitAddBook = async () => {
  isLoading.value = true;

  try {
    if (!isFromEmpty.value && !isValid.value.length) {
      // собираем книгу для деплоя
      const bookData = {
        name: bookNameField.value.trim(),
        author: authorField.value.trim(),
        // genre: parrentSelectedOption.value.name,
        image: imageUrlField.value,
        // dropedImage: dropedImage.value,
        owner_id: userStore.user.id,
      };

      // console.log(bookData);

      const status = await bookStore.createdBook(bookData);

      return navigateTo("/library");
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
