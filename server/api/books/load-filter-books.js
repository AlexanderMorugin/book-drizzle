import { between, or, and, gt, gte, lt, lte, eq, desc } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log(body.progressFirst, body.progressLast, body.userId);

  const result = await db
    .select()
    .from(books)
    .where(
      and(
        eq(books.owner_id, body.userId),
        gte(books.progress, body.progressFirst),
        lte(books.progress, body.progressLast)
      )
      // eq(books.owner_id, body.userId),

      // between(books.progress, body.progressFirst, body.progressLast)
      // or(
      //   gt(books.progress, body.progressFirst),
      //   lt(books.progress, body.progressLast)
      // )
    )
    .orderBy(desc(books.createdAt));

  return result;
});
