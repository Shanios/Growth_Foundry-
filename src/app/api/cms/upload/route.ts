import { NextResponse } from "next/server";
import {
  v2 as cloudinary,
  type UploadApiResponse,
} from "cloudinary";

import { getAdminSession } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No image was provided." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 }
      );
    }

    const maxSize = 8 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Image must be smaller than 8 MB." },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(
      await file.arrayBuffer()
    );

    const result =
      await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "growth-foundry/content",
                resource_type: "image",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                  return;
                }

                if (!result) {
                  reject(
                    new Error(
                      "Cloudinary did not return an upload result."
                    )
                  );
                  return;
                }

                resolve(result);
              }
            );

          stream.end(bytes);
        }
      );

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      {
        error: "Unable to upload image.",
      },
      {
        status: 500,
      }
    );
  }
}