<template>
  <div class="form-field">
    <!-- Инпут для поиска книги, без валидации -->
    <input
      :type="type"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
      class="form-search-input"
    />
    <FormClearButton v-if="value" place="search" @click="$emit('clearInput')" />
  </div>
</template>

<script setup>
const bookStore = useBookStore();
const userStore = useUserStore();

const { type, name, placeholder, value } = defineProps([
  "type",
  "name",
  "placeholder",
  "value",
]);

// console.log(e.target);

const emit = defineEmits(["update:value", "clearInput"]);

// const updateValue = (e) => emit("update:value", e.target.value);

const updateValue = async (e) => {
  try {
    await bookStore.loadSearchBooks(e.target.value, userStore.user.id);
    emit("update:value", e.target.value);
  } catch (error) {
    console.log(error);
  }
};
</script>
