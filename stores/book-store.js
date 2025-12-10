import { CopyObjectCommand } from "@aws-sdk/client-s3";
import { defineStore } from "pinia";

export const useBookStore = defineStore("bookStore", () => {
  const books = ref([]);
  const filterBooks = ref([]);
  const book = ref(null);

  const loadBooks = async (userId) => {
    const result = await useFetch("/api/books/load-books", {
      method: "POST",
      body: userId,
    });

    books.value = result.data.value;

    return result;
  };

  const loadFilterBooks = async (progressFirst, progressLast, userId) => {
    const result = await useFetch("/api/books/load-filter-books", {
      method: "POST",
      body: { progressFirst, progressLast, userId },
    });

    // Если рефреш токен действующий, иначе уходим на логин
    if (result !== "goToLogin") {
      filterBooks.value = result.data.value;
    }

    return result;
  };

  // Получаем книги пользователя по поиску
  const loadSearchBooks = async (searchData, userId) => {
    const result = await useFetch("/api/books/load-search-books", {
      method: "POST",
      body: { searchData, userId },
    });

    filterBooks.value = result.data.value;

    return result;
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // Отправляем картинку на сервер и получаем ответ
    const response = await useFetch("/api/books/upload-book-image", {
      method: "POST",
      body: formData,
    });

    return response;
  };

  const createdBook = async (bookData) => {
    // Деплой книги с картинкой по инпуту или без картинки совсем
    if (!bookData.dropedImage) {
      const result = await useFetch("/api/books/create-book", {
        method: "POST",
        body: bookData,
      });

      if (result.status.value === "success") {
        // Добавляем книгу в массив Стора
        books.value.unshift(result.data.value[0]);
      }

      return result;
    }

    // Деплой с драг дроп картинкой
    if (bookData.dropedImage) {
      // Загружаем картинку на удаленный сервер REG.RU storage S3
      // и получаем ссылку на нее result.data.value.fileUrl
      const response = await uploadFile(bookData.dropedImage);

      // Собираем книгу для деплоя
      const newBookData = {
        name: bookData.name,
        author: bookData.name,
        genre: bookData.genre,
        image: response.data.value.fileUrl,
        owner_id: bookData.owner_id,
      };

      const result = await useFetch("/api/books/create-book", {
        method: "POST",
        body: newBookData,
      });

      if (result.status.value === "success") {
        // Добавляем книгу в массив Стора
        books.value.unshift(result.data.value[0]);
      }

      return result;
    }
  };

  const getBook = async (bookId) => {
    const result = await useFetch("/api/books/get-book", {
      method: "POST",
      body: {
        id: bookId,
      },
    });

    // Если рефреш токен действующий, иначе уходим на логин
    if (result !== "goToLogin") {
      book.value = result.data.value[0];
    }

    return result;
  };

  const updateBookRating = async (newRating) => {
    const result = await useFetch("/api/books/update-book-rating", {
      method: "PATCH",
      body: {
        rating: newRating,
        id: book.value.id,
      },
    });

    if (result.status.value === "success") {
      book.value.rating = newRating;

      // Обновляем в массиве книг Стора, рейтниг данной книги
      books.value = books.value.map((item) =>
        item.id === book.value.id ? { ...item, rating: newRating } : item
      );
      filterBooks.value = filterBooks.value.map((item) =>
        item.id === book.value.id ? { ...item, rating: newRating } : item
      );
    }

    return result;
  };

  const updateBookComment = async (newComment) => {
    const result = await useFetch("/api/books/update-book-comment", {
      method: "PATCH",
      body: {
        comment: newComment,
        id: book.value.id,
      },
    });

    if (result.status.value === "success") {
      book.value.comment = newComment;

      // Обновляем в массиве книг Стора, комментарий данной книги
      books.value = books.value.map((item) =>
        item.id === book.value.id ? { ...item, comment: newComment } : item
      );
      filterBooks.value = filterBooks.value.map((item) =>
        item.id === book.value.id ? { ...item, comment: newComment } : item
      );
    }

    return result;
  };

  const updateBookProgress = async (progress) => {
    const result = await useFetch("/api/books/update-book-progress", {
      method: "PATCH",
      body: {
        progress: progress,
        id: book.value.id,
      },
    });

    if (result.status.value === "success") {
      book.value.progress = progress;

      // Обновляем в массиве книг Стора, прогресс данной книги
      books.value = books.value.map((item) =>
        item.id === book.value.id ? { ...item, progress: progress } : item
      );
      filterBooks.value = filterBooks.value.map((item) =>
        item.id === book.value.id ? { ...item, progress: progress } : item
      );
    }

    return result;
  };

  const updateBook = async (bookData) => {
    const result = await useFetch("/api/books/update-book", {
      method: "PATCH",
      body: {
        name: bookData.name,
        author: bookData.author,
        genre: bookData.genre,
        id: book.value.id,
      },
    });

    if (result.status.value === "success") {
      book.value.name = bookData.name;
      book.value.author = bookData.author;
      book.value.genre = bookData.genre;

      // Обновляем в массиве книг Стора
      books.value = books.value.map((item) =>
        item.id === book.value.id
          ? {
              ...item,
              name: bookData.name,
              author: bookData.author,
              genre: bookData.genre,
            }
          : item
      );
      filterBooks.value = filterBooks.value.map((item) =>
        item.id === book.value.id
          ? {
              ...item,
              name: bookData.name,
              author: bookData.author,
              genre: bookData.genre,
            }
          : item
      );
    }

    return result;
  };

  const deleteBook = async (bookId) => {
    const result = await useFetch("/api/books/delete-book", {
      method: "DELETE",
      body: {
        id: book.value.id,
      },
    });

    // В Сторе удаляем книгу
    books.value = books.value.filter((book) => book.id !== bookId);
    filterBooks.value = filterBooks.value.filter((book) => book.id !== bookId);

    return result;
  };

  const logoutUser = () => {
    books.value = [];
    filterBooks.value = [];
    book.value = null;
  };

  return {
    books,
    filterBooks,
    book,
    loadBooks,
    loadFilterBooks,
    loadSearchBooks,
    createdBook,
    getBook,
    updateBookRating,
    updateBookComment,
    updateBookProgress,
    updateBook,
    deleteBook,
    logoutUser,
  };
});
