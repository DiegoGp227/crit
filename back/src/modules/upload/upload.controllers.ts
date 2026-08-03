import { Request, Response } from "express";
import { BadRequestError } from "../../errors/appError.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { isAllowedImage, uploadImage } from "./upload.services.js";

/**
 * @route POST /upload
 * @multipart field: image
 * @returns { message, url }
 */
export const upload = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    throw new BadRequestError("No image provided");
  }

  if (!isAllowedImage(file.originalname)) {
    throw new BadRequestError("Unsupported image type");
  }

  const url = await uploadImage(file);

  res.status(201).json({ message: "Image uploaded", url });
});
