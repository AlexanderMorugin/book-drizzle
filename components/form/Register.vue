<template>
  <form class="form-auth" @submit.prevent="submitRegisterForm">
    <FormInput
      label="Имя"
      type="text"
      name="name"
      placeholder="Ваше имя"
      v-model:value="v$.nameField.$model"
      :error="v$.nameField.$errors"
      @clearInput="nameField = null"
      @click="clearErrorMessage"
    />
    <FormInput
      label="Электронная почта"
      type="email"
      name="email"
      placeholder="example@email.com"
      v-model:value="v$.emailField.$model"
      :error="v$.emailField.$errors"
      @clearInput="emailField = null"
      @click="clearErrorMessage"
    />
    <FormInput
      label="Пароль"
      type="password"
      name="password"
      placeholder="Минимум 6 символов"
      v-model:value="v$.passwordField.$model"
      :error="v$.passwordField.$errors"
      @clearInput="passwordField = null"
      @click="clearErrorMessage"
    />
    <FormInput
      lastInput="true"
      label="Подтвердите пароль"
      type="password"
      name="confirmPassword"
      placeholder="Повторите пароль"
      v-model:value="v$.confirmPasswordField.$model"
      :error="v$.confirmPasswordField.$errors"
      @clearInput="confirmPasswordField = null"
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
import {
  helpers,
  required,
  minLength,
  email,
  sameAs,
} from "@vuelidate/validators";

const { place } = defineProps(["place"]);

const toast = useToast();
const userStore = useUserStore();

const isLoading = ref(false);
const nameField = ref(null);
const emailField = ref(null);
const passwordField = ref(null);
const confirmPasswordField = ref(null);
const registerMessage = ref(null);

// При клике на инпуте - очищаем в сторе реф ошибки
const clearErrorMessage = () => (registerMessage.value = null);

// Валидация
const rules = computed(() => ({
  nameField: {
    required: helpers.withMessage("Укажите имя", required),
    minLength: helpers.withMessage("Не менее 3 символов", minLength(3)),
  },
  emailField: {
    required: helpers.withMessage("Укажите почту", required),
    email: helpers.withMessage("Не корректно", email),
  },
  passwordField: {
    required: helpers.withMessage("Укажите пароль", required),
    minLength: helpers.withMessage("Не менее 6 символов", minLength(6)),
  },
  confirmPasswordField: {
    required: helpers.withMessage("", required),
    sameAsPassword: helpers.withMessage("Не совпадает", sameAs(passwordField)),
  },
}));

const v$ = useVuelidate(rules, {
  nameField,
  emailField,
  passwordField,
  confirmPasswordField,
});

const isFromEmpty = computed(
  () =>
    !nameField.value ||
    !emailField.value ||
    !passwordField.value ||
    !confirmPasswordField.value
);

const isValid = computed(() => v$.value.$errors);

// Сабмит
const submitRegisterForm = async () => {
  isLoading.value = true;

  try {
    if (!isFromEmpty.value && !isValid.value.length) {
      // Собираем пользователя для регистрации
      const userData = {
        email: emailField.value.trim(),
        name: nameField.value.trim(),
        password: passwordField.value.trim(),
      };

      // Отправляем данные пользователя на регистрацию
      const status = await userStore.registerUser(userData);

      // Если пользователь не создался в БД, пишем ошибку
      if (status.value === "error") {
        toast.error({
          title: "Ошибка!",
          message: "Пользователь с такой почтой уже существует.",
        });

        // Очищаем поля паролей чтобы снова регистрироваться
        passwordField.value = null;
        confirmPasswordField.value = null;
      }

      // Если пользователь создался в БД, перенаправляем его на логин
      if (status.value === "success") {
        toast.success({
          title: "Успешно!",
          message: "Регистрация прошла успешно!",
        });

        return navigateTo(`/login`);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
