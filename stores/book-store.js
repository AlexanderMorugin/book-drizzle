import { defineStore } from "pinia";

export const useBookStore = defineStore("bookStore", () => {
  const books = ref([]);
  const book = ref(null);

  const loadBooks = async (userId) => {
    const { data, status, error } = await useFetch("/api/books/load-books", {
      method: "POST",
      body: userId,
    });

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

    return status;
  };

  const getBook = async (bookId) => {
    const { data, status, pending } = await useFetch("/api/books/get-book", {
      method: "POST",
      body: {
        id: bookId,
      },
    });

    book.value = data.value[0];

    return { data, status, pending };
  };

  const updateBookRating = async (newRating) => {
    const { data, status, refresh } = await useFetch(
      "/api/books/update-book-rating",
      {
        method: "PATCH",
        body: {
          rating: newRating,
          id: book.value.id,
        },
      }
    );
  };

  const updateBookComment = async (newComment) => {
    const { data, status } = await useFetch("/api/books/update-book-comment", {
      method: "PATCH",
      body: {
        comment: newComment,
        id: book.value.id,
      },
    });

    return { data, status };
  };

  const updateBookProgress = async (progress) => {
    const { data, status } = await useFetch("/api/books/update-book-progress", {
      method: "PATCH",
      body: {
        progress: progress,
        id: book.value.id,
      },
    });

    if (status.value === "success") {
      book.value.progress = progress;
    }

    return { data, status };
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

  const logoutUser = () => {
    books.value = [];
    book.value = null;
  };

  return {
    books,
    book,
    loadBooks,
    createdBook,
    getBook,
    updateBookRating,
    updateBookComment,
    updateBookProgress,
    deleteBook,
    logoutUser,
  };
});
