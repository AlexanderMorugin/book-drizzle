import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client } from "~/server/utils/s3";
import { eq } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { id, image } = await readBody(event);
  const config = useRuntimeConfig();
  const s3Client = getS3Client();

  if (!image) {
    return createError({
      statusCode: 400,
      message: "Картинка отсутствует",
    });
  }

  // Вычисляем имя файла картинки из строки
  const imageName = image.split("/").slice(-1)[0];

  // Удаляем картинку из серверного хранилища S3
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: config.regAwsBucketName,
      Key: imageName,
    })
  );

  // Удаляем обложку из ДБ
  const result = await db
    .update(books)
    .set({ image: null })
    .where(eq(books.id, id));

  return result;
});
