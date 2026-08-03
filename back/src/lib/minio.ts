import { Client } from "minio";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

export const minioClient = new Client({
  endPoint: env.MINIO_ENDPOINT,
  port: env.MINIO_PORT,
  useSSL: false,
  accessKey: env.MINIO_ROOT_USER,
  secretKey: env.MINIO_ROOT_PASSWORD,
});

export const ensureBucket = async (): Promise<void> => {
  const exists = await minioClient.bucketExists(env.MINIO_BUCKET);
  if (!exists) {
    await minioClient.makeBucket(env.MINIO_BUCKET);
    await minioClient.setBucketPolicy(
      env.MINIO_BUCKET,
      JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: ["*"] },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${env.MINIO_BUCKET}/*`],
          },
        ],
      }),
    );
    logger.info(`Bucket "${env.MINIO_BUCKET}" created and made public`);
  }
};
