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
  // console.log(imageName);

  // Удаляем картинку из серверного хранилища S3
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: config.regAwsBucketName,
      Key: imageName,
    })
  );

  // console.log(res);
  // Удаляем обложку из ДБ
  const result = await db
    .update(books)
    .set({ image: null })
    .where(eq(books.id, id));

  return result;

  // try {

  //   // Деплоим картинку в сторадж REG.RU
  //   await s3Client.send(
  //     new PutObjectCommand({
  //       Bucket: config.regAwsBucketName,
  //       Key: fileName,
  //       Body: filePart.data,
  //       ContentType: filePart.type || "application/octet-stream",
  //     })
  //   );

  //   return {
  //     message: "Обложка успешно загружена на сервер",
  //     fileName: fileName,
  //     fileUrl: `${config.regAwsEndpoint}/${config.regAwsBucketName}/${fileName}`,
  //   };
  // } catch (error) {
  //   console.log("Ошибка загрузки файла:", error);
  //   return createError({
  //     statusCode: 500,
  //     message: "Ошибка загрузки файла",
  //   });
  // }
});
