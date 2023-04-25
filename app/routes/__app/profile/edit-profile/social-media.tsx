import { Form } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import ImageInput from "~/components/UI/ImageInput/ImageInput";
import Input from "~/components/UI/Input/Input";
import type { ActionFunction } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import { useSearchParams } from "@remix-run/react";
import {
  redirect,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import {
  addASocialMedia,
  getASocialMedia,
  updateASocialMedia,
} from "~/utils/database/socialMedia.server";
import { useMatches } from "@remix-run/react";
import type { SocialMedia as TypeSocialMedia } from "~/utils/models/models";
import fs from "fs";
import path from "path";
const SocialMedia = () => {
  const matches = useMatches();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const userData = matches[0].data.userData;

  const currentSocialMedia = id
    ? userData.socialMedias.find((sm: TypeSocialMedia) => sm.id === id)
    : null;

  return (
    <div className="flex flex-col w-[400px] h-fit p-8 gap-6 rounded-lg border border-slate-100 shadow-md bg-white">
      <h3>New social media info</h3>
      <Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-6"
      >
        <Input
          defaultValue={currentSocialMedia?.name}
          name="name"
          label="Social media name"
        />
        <Input
          defaultValue={currentSocialMedia?.link}
          name="link"
          label="Connect link"
        />
        <ImageInput
          className=" !object-contain "
          defaultImages={
            currentSocialMedia ? [currentSocialMedia.icon] : undefined
          }
          name="icon"
          multiple={false}
          accept=".svg,.png"
          label="Icon"
        />
        <div className="flex gap-3 mt-3">
          {" "}
          <Button className="flex-1" to={".."}>
            Cancel
          </Button>{" "}
          <Button className="flex-1">Save</Button>
        </div>
      </Form>
    </div>
  );
};

export default SocialMedia;

export const action: ActionFunction = async ({ request }) => {
  const requestClone = request.clone();

  let user;

  try {
    user = await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }
  if (!user) {
    throw redirect("/auth");
  }

  const uploadHandler = unstable_createFileUploadHandler({
    directory: "public/icons",
  });
  const formData = await request.formData();
  const parsedData = await unstable_parseMultipartFormData(
    requestClone,
    uploadHandler
  );

  let currentSocialMedia = null;

  const mediaId = new URL(request.url).searchParams.get("id");
  if (mediaId) {
    try {
      currentSocialMedia = await getASocialMedia(mediaId);
    } catch (error) {
      throw error;
    }
  }

  const data = Object.fromEntries(formData);
  const icon = parsedData.get("icon");
  const iconPath = icon
    ? "/icons/" + (icon as File).name
    : currentSocialMedia
    ? currentSocialMedia.icon
    : "";
  const databaseData = { ...data, icon: iconPath };

  if (!mediaId) {
    try {
      await addASocialMedia(user.id, databaseData);
    } catch (error) {
      throw error;
    }
  } else {
    if (icon) {
      fs.unlink(path.join("public", currentSocialMedia!.icon), (e) => {
        console.log(e);
      });
    }

    try {
      updateASocialMedia(mediaId, databaseData);
    } catch (error) {
      throw error;
    }
  }
  return redirect("..");
};
