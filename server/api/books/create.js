// import { eq } from "drizzle-orm";
import { db } from "~/server";
import { Books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Собираем книгу
  const book = {
    name: body.name,
    author: body.author,
    image: body.image,
  };

  // Отправляем книгу в базу данных
  const createdBook = await db.insert(Books).values({ ...book });

  console.log("createdBook: ", createdBook);

  return createdBook;
});
