import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Собираем книгу
  const book = {
    name: body.name,
    author: body.author,
    image: body.image,
    owner_id: body.owner_id,
  };

  // Отправляем книгу в базу данных
  const newBook = await db
    .insert(books)
    .values({ ...book })
    .returning();

  return newBook;
});
