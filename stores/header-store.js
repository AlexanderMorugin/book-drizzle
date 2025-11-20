import { defineStore } from "pinia";

export const useHeaderStore = defineStore("headerStore", () => {
  const headerTitle = ref(null);

  const setHeaderTitle = (headerData) => {
    headerTitle.value = headerData;
  };

  return {
    headerTitle,
    setHeaderTitle,
  };
});
