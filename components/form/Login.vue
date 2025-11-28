<template>
  <form class="form-auth" @submit.prevent="submitLoginForm">
    <FormInput
      label="Электронная почта"
      type="email"
      name="emailField"
      placeholder="example@email.com"
      v-model:value="v$.emailField.$model"
      :error="v$.emailField.$errors"
      @clearInput="emailField = null"
      @click="clearErrorMessage"
    />
    <FormInput
      lastInput="true"
      label="Пароль"
      type="password"
      name="passwordField"
      placeholder="Минимум 6 символов"
      v-model:value="v$.passwordField.$model"
      :error="v$.passwordField.$errors"
      @clearInput="passwordField = null"
      @click="clearErrorMessage"
    />

    <!-- Появляющийся текст ошибки -->
    <!-- <TransitionGroup name="error" tag="ul">
      <FormErrorMessage v-if="loginMessage" :text="loginMessage" />
    </TransitionGroup> -->

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
import { helpers, required, minLength, email } from "@vuelidate/validators";

const { place } = defineProps(["place"]);

const toast = useToast();
const userStore = useUserStore();
const bookStore = useBookStore();

const isLoading = ref(false);
const emailField = ref(null);
const passwordField = ref(null);
const loginMessage = ref(null);

// При клике на инпуте - очищаем в сторе реф ошибки
const clearErrorMessage = () => (loginMessage.value = null);

// Валидация
const rules = computed(() => ({
  emailField: {
    required: helpers.withMessage("Укажите почту", required),
    email: helpers.withMessage("Не корректно", email),
  },
  passwordField: {
    required: helpers.withMessage("Укажите пароль", required),
    minLength: helpers.withMessage("Не менее 6 символов", minLength(6)),
  },
}));

const v$ = useVuelidate(rules, {
  emailField,
  passwordField,
});

const isFromEmpty = computed(() => !emailField.value || !passwordField.value);

const isValid = computed(() => v$.value.$errors);

// Сабмит
const submitLoginForm = async () => {
  isLoading.value = true;

  try {
    if (!isFromEmpty.value && !isValid.value.length) {
      // Собираем пользователя для логина
      const userData = {
        email: emailField.value?.trim(),
        password: passwordField.value?.trim(),
      };

      // Отправляем данные пользователя на логин
      const result = await userStore.loginUser(userData);

      // console.log(result.data.value.user);

      // console.log(result);

      if (!result) {
        return;
      }

      // Если пользователь не залогинился в БД, пишем ошибку
      if (result.status.value === "error") {
        toast.error({
          title: "Ошибка!",
          message: "Имя пользователя или пароль неверные.",
        });
      }

      // Если пользователь залогинился в БД, перенаправляем его на главную
      if (result.status.value === "success") {
        toast.success({
          title: "Успешно!",
          message: "Авторизация прошла успешно.",
        });

        // Находим в БД его книги и записываем в стор
        // bookStore.loadBooks(0, 100, result.data.value.user.id);
        bookStore.loadBooks(result.data.value.user.id);

        return navigateTo("/");
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
