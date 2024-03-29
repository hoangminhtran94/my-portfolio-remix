import {
  Form,
  useMatches,
  useLocation,
  useNavigate,
  useSearchParams,
  useFetcher,
} from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import ImageInput from "~/components/UI/ImageInput/ImageInput";
import Input from "~/components/UI/Input/Input";
import type { ActionFunction } from "@remix-run/node";
import {
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { useOutlet } from "@remix-run/react";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { getUserFromSession, updateUser } from "~/utils/database/auth.server";
import { AnimatePresence, motion } from "framer-motion";
import type { SocialMedia } from "~/utils/models/models";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "~/utils/fileUpload/fileUpload";
import serverError from "~/utils/models/ServerError";
import type { FormEvent } from "react";
import { useState } from "react";

const EditProfile = () => {
  const container1 = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    exit: {
      opacity: 0,
      x: 300,
      transition: { duration: 0.5 },
    },
  };
  const matches = useMatches();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const user = matches[0].data.user;
  const [file, setFile] = useState<File | null>(null);
  const [searchParams] = useSearchParams();
  const submitHandler = (e: FormEvent) => {
    const formdata = new FormData(e.target as HTMLFormElement);
    if (!file) {
      formdata.delete("profileImage");
    }
    fetcher.submit(formdata, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  return (
    <div className="w-full bg-white rounded shadow-md border relative  border-slate-100 p-10 ">
      <h2 className="text-center">Edit Profile</h2>
      <Form onSubmit={submitHandler} className="flex  flex-col gap-3">
        <ImageInput
          getImages={(data) => {
            setFile(data[0].file);
          }}
          circle
          className="mt-6"
          defaultImages={[user.profileImage]}
          name="profileImage"
          multiple={false}
        />
        <Input name="name" defaultValue={user.name} label="Full name" />
        <Input name="username" defaultValue={user.username} label="Username" />

        <Input
          name="secondaryEmail"
          defaultValue={user.secondaryEmail}
          label="Secondary contact email"
        />
        <Input
          name="contactNumber"
          defaultValue={user.contactNumber}
          label="Contact Phone number"
        />
        <div>
          <label>Social media</label>
          <ul className="flex flex-wrap gap-1">
            {user.socialMedias.map((item: SocialMedia) => (
              <li
                className="flex items-center gap-1 py-1 px-2 border rounded-md border-slate-200"
                key={item.id}
              >
                <span
                  onClick={() => {
                    navigate(`social-media?mode=edit&id=${item.id}`);
                  }}
                >
                  {item.name}
                </span>
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    // setSelectedItems((prev) => {
                    //   const selected = [...prev];
                    //   const index = selected.findIndex(
                    //     (listItem) => listItem.id === item.id
                    //   );
                    //   selected.splice(index, 1);
                    //   return selected;
                    // });
                  }}
                >
                  | x
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          className={`flex-1 btn-purple-outline ${
            pathname.includes("social-media") && "invisible"
          }`}
          preventScrollReset={true}
          to={"social-media"}
        >
          Add new social media
        </Button>

        <div className="flex gap-3 mt-6">
          <Button className="flex-1 btn-light" to={".."}>
            Cancel
          </Button>
          <Button className="flex-1 btn-success">Submit</Button>
        </div>
      </Form>
      <AnimatePresence mode="wait" initial={false}>
        {pathname.includes("social-media") && (
          <motion.div
            key={searchParams.get("id") ?? "default"}
            variants={container1}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute w-full lg:w-[400px] top-0 left-0 lg:bottom-0 lg:left-2/3 4xl:left-[105%] z-10"
          >
            {outlet}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditProfile;

export const action: ActionFunction = async ({ request }) => {
  let user;
  try {
    user = await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }
  if (!user) {
    throw redirect("/auth");
  }

  const requestClone = request.clone();
  const uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {
      if (name !== "profileImage") {
        return undefined;
      }
      if (!filename) {
        return undefined;
      }

      const uploadedImage = await uploadImageToCloudinary(data, "profileImage");
      return uploadedImage?.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

  const parsedData = await unstable_parseMultipartFormData(
    requestClone,
    uploadHandler
  );
  const formData = await request.formData();
  const image = parsedData.get("profileImage");
  const imagePath = image ? image : user.profileImage;
  if (image) {
    try {
      await deleteImageFromCloudinary(user.profileImage);
    } catch (error) {
      console.log(error);
    }
  }
  const data = Object.fromEntries(formData);

  const databaseData = { ...data, profileImage: imagePath };

  try {
    await updateUser(user.id, databaseData);
  } catch (error) {
    throw error;
  }
  return redirect("..");
};
