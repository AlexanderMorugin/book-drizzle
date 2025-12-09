import { S3Client } from "@aws-sdk/client-s3";

let s3Client: S3Client | null = null;

export function getS3Client() {
  if (s3Client) return s3Client;

  const config = useRuntimeConfig();

  s3Client = new S3Client({
    region: config.regAwsRegion,
    endpoint: config.regAwsEndpoint,
    credentials: {
      accessKeyId: config.regAwsAccessKeyId,
      secretAccessKey: config.regAwsSecretKey,
    },
  });

  return s3Client;
}
