<template>
  <div class="form-select">
    <span class="form-label">{{ label }}</span>

    <div class="dropDown" ref="dropDown">
      <div
        class="form-input dropdown-selected-option"
        @click="toggleOptionSelect"
      >
        <span>{{ mappedSelectedOption }}</span>
        <IconArrowDrop
          :class="[
            'arrowDropIcon',
            { arrowDropIcon_active: isDropDownVisible },
          ]"
        />
      </div>
      <ul :class="['optionList', { optionList_active: isDropDownVisible }]">
        <li
          v-for="option in options"
          :key="option.id"
          :class="['optionText', { optionText_active: isDropDownVisible }]"
          @click="closeOptionSelect(option)"
        >
          {{ option.name || option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { label, options } = defineProps(["label", "options"]);
const emit = defineEmits(["update:value"]);

const dropDown = ref(null);
const selectedOption = ref(null);
const isDropDownVisible = ref(false);

const mappedSelectedOption = computed(() => {
  return (
    selectedOption.value?.name || selectedOption.value?.value || "Выберите жанр"
  );
});

const toggleOptionSelect = () =>
  (isDropDownVisible.value = !isDropDownVisible.value);

const closeOptionSelect = (option) => {
  isDropDownVisible.value = false;
  selectedOption.value = option;
  emit("update:value", option);
};

const closeDropDown = (element) => {
  if (!dropDown.value.contains(element.target)) {
    isDropDownVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", closeDropDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", closeDropDown);
});
</script>

<style lang="scss" scoped>
.dropdown-selected-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color-fifthly);
  border-radius: var(--border-radius-s);
  margin-bottom: 8px;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    background: var(--violet-primary);
    color: var(--text-color-secondary);
  }
}
.dropDown {
  position: relative;
}
.optionList {
  position: absolute;
  top: 46px;
  right: 0;
  width: 100%;
  background: var(--yellow-secondary);
  height: 0;

  &_active {
    height: fit-content;
    z-index: 10;
  }
}

.arrowDropIcon {
  width: 16px;
  height: 16px;
  color: var(--text-color-fifthly);
  opacity: 0.5;
  transition: 0.5s;

  &_active {
    transform: rotate(180deg);
  }
}

.dropdown-selected-option:hover .arrowDropIcon {
  opacity: 1;
  color: var(--text-color-secondary);
}
.optionText {
  display: none;
  font-family: "Inter-Regular", sans-serif;
  font-size: 14px;
  line-height: 14px;
  color: var(--text-color-primary);
  padding: 16px;
  border: 1px solid var(--black-primary);
  cursor: pointer;

  &:hover {
    background: var(--violet-primary);
  }

  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &_active {
    display: block;
  }
}
</style>
