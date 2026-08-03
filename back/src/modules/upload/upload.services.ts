import path from "node:path";
import crypto from "node:crypto";
import { minioClient } from "../../lib/minio.js";
import { env } from "../../config/env.js";

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export const isAllowedImage = (filename: string): boolean => {
  const ext = path.extname(filename).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
};

export const uploadImage = async (
  file: Express.Multer.File,
): Promise<string> => {
  const ext = path.extname(file.originalname).toLowerCase();
  const objectName = `${crypto.randomUUID()}${ext}`;

  await minioClient.putObject(env.MINIO_BUCKET, objectName, file.buffer, file.size, {
    "Content-Type": file.mimetype,
  });

  return `${env.MINIO_PUBLIC_URL}/${env.MINIO_BUCKET}/${objectName}`;
};
