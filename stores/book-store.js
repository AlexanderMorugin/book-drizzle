import { defineStore } from "pinia";

export const useBookStore = defineStore("bookStore", () => {
  const books = ref([]);
  const book = ref(null);

  const loadBooks = async () => {
    const res = await useFetch("/api/books/load");
    books.value = res.data.value;
  };

  const createdBook = async (bookData) => {
    const { data, status } = await useFetch("/api/books/create", {
      method: "POST",
      body: bookData,
    });

    return status;
  };

  return {
    books,
    book,
    loadBooks,
    createdBook,
  };
});
