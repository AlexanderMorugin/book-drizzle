import { defineStore } from "pinia";

export const useBookStore = defineStore("bookStore", () => {
  const books = ref([]);
  const book = ref(null);

  const loadBooks = async (userId) => {
    const { data, status, error } = await useFetch("/api/books/load-books", {
      method: "POST",
      body: userId,
    });

    // console.log(data.value);

    if (error.value) {
      console.log(error);
    }

    books.value = data.value;
  };

  const createdBook = async (bookData) => {
    const { data, status } = await useFetch("/api/books/create-book", {
      method: "POST",
      body: bookData,
    });

    // console.log(data.value[0]);

    return status;
  };

  const deleteBook = async (bookId) => {
    const { data, status } = await useFetch("/api/books/delete-book", {
      method: "DELETE",
      body: {
        id: bookId,
      },
    });

    books.value = books.value.filter((book) => book.id !== bookId);

    return { data, status };
  };

  return {
    books,
    book,
    loadBooks,
    createdBook,
    deleteBook,
  };
});
