import { writeAsyncIterableToWritable } from "@remix-run/node";
import type { UploadApiResponse } from "cloudinary";

import cloudinary from "cloudinary";
// Configuration
cloudinary.v2.config({
  cloud_name: "dso1cyy53",
  api_key: "574692615186725",
  api_secret: "RSg-3cD1fe-8p2VEdCEROkCKWbk",
});

export async function uploadImageToCloudinary(
  data: AsyncIterable<Uint8Array>,
  folder: string
) {
  console.log(data);
  const uploadPromise = new Promise<UploadApiResponse>(
    async (resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: folder,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result!);
        }
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );

  return uploadPromise;
}

export const deleteImageFromCloudinary = async (url: string) => {
  const url_parts = url.split("/");
  const public_id_with_extension = url_parts[url_parts.length - 1];
  const public_id =
    url_parts[url_parts.length - 2] +
    "/" +
    public_id_with_extension.split(".")[0];
  let returnResult;
  cloudinary.v2.uploader.destroy(public_id, (error, result) => {
    returnResult = result;
  });
  return returnResult;
};
