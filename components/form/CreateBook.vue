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
    <FormSelectGenre
      label="Жанр"
      :options="genres"
      v-model:value="v$.selectedGenre.$model"
    />
    <FormInput
      v-if="!dropedImage"
      lastInput="true"
      label="Обложка книги"
      type="text"
      name="imageUrl"
      placeholder="Вставьте ссылку на изображение"
      v-model:value="v$.imageUrlField.$model"
      :error="v$.imageUrlField.$errors"
      @clearInput="imageUrlField = null"
    />

    <!-- Поле с ручной загрузкой картинки -->
    <ClientOnly>
      <div v-if="!imageUrlField" class="bookUploadImageBlock">
        <div
          :class="[
            'bookUploadImageBlock__background',
            { bookUploadImageBlock__background_isDragging: isDragging },
          ]"
        >
          <div
            v-if="!images.length"
            class="bookUploadImageBlock__container"
            @dragover.prevent="onDragover"
            @dragleave.prevent="onDragleave"
            @drop.prevent="onDrop"
          >
            <!-- Кнопка загрузки картинки -->
            <ButtonUploadImage @click="selectFiles" />

            <span class="bookUploadImageBlock__title"
              >Загрузить обложку книги</span
            >
            <span class="bookUploadImageBlock__subtitle"
              >Перетащите файл или нажмите для выбора • Макс. 5МБ</span
            >

            <input
              name="file"
              type="file"
              ref="fileInput"
              @change="onFileSelect"
              class="bookUploadImageBlock__input"
            />
          </div>

          <div
            v-if="images.length"
            class="bookUploadImageBlock__imageContainer"
          >
            <div
              class="bookUploadImageBlock__imageBox"
              v-for="(image, index) in images"
              :key="index"
            >
              <div
                role="button"
                class="bookUploadImageBlock__imageDelete"
                @click="deleteImage(index)"
              >
                <IconClear />
              </div>
              <img :src="image.url" class="bookUploadImageBlock__image" />
            </div>
          </div>
        </div>

        <span v-if="!images.length" class="bookUploadImageBlock__subtitle"
          >Загрузите файл изображения, вставьте ссылку или используйте кнопку
          "Найти"</span
        >
      </div>
    </ClientOnly>

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
const selectedGenre = ref(null);
const images = ref([]);
const fileInput = ref(null);
const dropedImage = ref(null);
const isDragging = ref(false);

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
  imageUrlField: {
    url: helpers.withMessage("Вставьте ссылку", url),
  },
}));

const v$ = useVuelidate(rules, {
  bookNameField,
  authorField,
  selectedGenre,
  imageUrlField,
});

const isFromEmpty = computed(
  () => !bookNameField.value || !authorField.value || !selectedGenre.value
);

const isValid = computed(() => v$.value.$errors);

// Функции добавления картинки по кнопке
const selectFiles = () => {
  fileInput.value.click();
};

const onFileSelect = (event) => {
  const files = event.target.files;

  if (files.length === 0) return;

  for (let i = 0; i < files.length; i++) {
    if (files[i].type.split("/")[0] != "image") continue;
    if (!images.value.some((e) => e.name === files[i].name)) {
      images.value.push({
        name: files[i].name,
        url: URL.createObjectURL(files[i]),
      });
    }
  }

  dropedImage.value = event.target.files[0];

  // Очищаем инпут ввода картинки в текстовом режиме
  imageUrlField.value = null;
};

const deleteImage = (index) => {
  if (dropedImage.value) {
    dropedImage.value = null;
  }

  images.value.splice(index, 1);
};

// Drag and Drop functions
const onDragover = (event) => {
  event.preventDefault();
  isDragging.value = true;
  event.dataTransfer.dropEffect = "copy";
};

const onDragleave = (event) => {
  event.preventDefault();
  isDragging.value = false;
};

const onDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;

  const files = event.dataTransfer.files;

  dropedImage.value = event.dataTransfer.files[0];

  for (let i = 0; i < files.length; i++) {
    if (files[i].type.split("/")[0] != "image") continue;
    if (!images.value.some((e) => e.name === files[i].name)) {
      images.value.push({
        name: files[i].name,
        url: URL.createObjectURL(files[i]),
      });
    }
  }

  // Очищаем инпут ввода картинки в текстовом режиме
  imageUrlField.value = null;
};

const submitAddBook = async () => {
  isLoading.value = true;

  try {
    if (!isFromEmpty.value && !isValid.value.length) {
      // собираем книгу для деплоя
      const bookData = {
        name: bookNameField.value.trim(),
        author: authorField.value.trim(),
        genre: selectedGenre.value.name,
        image: imageUrlField.value,
        dropedImage: dropedImage.value,
        owner_id: userStore.user.id,
      };

      console.log(bookData);

      // const status = await bookStore.createdBook(bookData);

      // return navigateTo("/library");
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.bookUploadImageBlock {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__background {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    background: var(--white-primary);
    border-radius: var(--border-radius-m);
    border: 2px dashed var(--gray-seventhly);
    min-height: 152px;

    &_isDragging {
      background: var(--green-primary);
      border: 2px dashed var(--green-secondary);
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 26px;
  }

  &__title {
    font-family: "Inter-Medium", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-thirdly);
  }

  &__subtitle {
    font-family: "Inter-Regular", sans-serif;
    font-size: 12px;
    line-height: 16px;
    color: var(--text-color-sixthly);
  }

  &__imageContainer {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  &__imageBox {
    position: relative;
    width: 100px;
    height: 100px;
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-m);
    object-fit: cover;
  }

  &__imageDelete {
    position: absolute;
    top: -10px;
    right: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: var(--border-radius-full);
    background: var(--red-primary);
    transition: 0.25s ease;
    cursor: pointer;

    &:hover {
      background: var(--green-secondary);
    }
  }

  &__input {
    display: none;
  }
}

.clearIcon {
  width: 18px;
  height: 18px;
  color: var(--white-primary);
}
</style>
