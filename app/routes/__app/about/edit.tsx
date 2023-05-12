import { useMatches, useLoaderData } from "@remix-run/react";
import EditAboutForm from "~/components/About/AboutForm";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { getUserFromSession, updateUser } from "~/utils/database/auth.server";
import {
  redirect,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
} from "@remix-run/node";
import { uploadImageToCloudinary } from "~/utils/fileUpload/fileUpload";
const AboutEdit = () => {
  const data = useLoaderData();
  const rootUser = data;
  return (
    <div className="w-full">
      <h1>Edit About</h1>
      <div className="p-5 rounded-lg w-full border border-indigo-300 ">
        <EditAboutForm userData={rootUser} />
      </div>
    </div>
  );
};

export default AboutEdit;

export const loader: LoaderFunction = async ({ request }) => {
  let user;
  try {
    user = await getUserFromSession(request);
  } catch (error) {
    return redirect("/auth");
  }
  if (!user) {
    return redirect("/auth");
  }
  return user;
};

export const action: ActionFunction = async ({ request }) => {
  let user;
  try {
    user = await getUserFromSession(request);
  } catch (error) {
    return redirect("/auth");
  }
  if (!user) {
    return redirect("/auth");
  }
  const requestClone = request.clone();
  const formdata = await requestClone.formData();
  const data = Object.fromEntries(formdata);
  let profileImageFormData = data.profileImage;

  if (profileImageFormData) {
    const uploadHandler = unstable_composeUploadHandlers(
      async ({ data, contentType, name, filename }) => {
        if (name !== "profileImage") {
          return undefined;
        }
        const response = await uploadImageToCloudinary(data, "profileImage");
        return response?.secure_url;
      }
    );
    const imageFormData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );
    profileImageFormData = imageFormData.get("profileImage")!;
  }

  const databaseData = {
    ...data,
    profileImage: profileImageFormData
      ? profileImageFormData
      : user.profileImage,
  };

  try {
    await updateUser(user.id, databaseData);
    return redirect("/about");
  } catch (error) {
    throw error;
  }
};
