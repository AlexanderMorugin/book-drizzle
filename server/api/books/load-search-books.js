import { and, or, ilike, eq, desc } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { searchData, userId } = await readBody(event);
  // console.log(body.searchData, body.userId);

  const result = await db
    .select()
    .from(books)
    .where(
      and(
        eq(books.owner_id, userId),
        or(
          ilike(books.name, `%${searchData}%`),
          ilike(books.author, `%${searchData}%`)
        )
      )
    )
    .orderBy(desc(books.createdAt));

  // console.log(result);
  return result;
});
