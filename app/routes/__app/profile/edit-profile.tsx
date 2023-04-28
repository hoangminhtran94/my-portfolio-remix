import {
  Form,
  useMatches,
  useLocation,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import ImageInput from "~/components/UI/ImageInput/ImageInput";
import Input from "~/components/UI/Input/Input";
import {
  ActionFunction,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { useOutlet } from "@remix-run/react";
import {
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { getUserFromSession, updateUser } from "~/utils/database/auth.server";
import { AnimatePresence, motion } from "framer-motion";
import { SocialMedia } from "~/utils/models/models";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "~/utils/fileUpload/fileUpload";

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
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const userData = matches[0].data.userData;
  const [searchParams] = useSearchParams();

  return (
    <div className="w-full lg:w-1/2 shadow-md border relative  border-slate-100 p-10 ">
      <h2 className="text-center">Edit Profile</h2>
      <Form
        method="post"
        encType="multipart/form-data"
        className="flex  flex-col gap-3"
      >
        <ImageInput
          defaultImages={[userData.profileImage]}
          name="profileImage"
          multiple={false}
          label="Profile Image"
        />
        <Input name="name" defaultValue={userData.name} label="Full name" />
        <Input
          name="username"
          defaultValue={userData.username}
          label="Username"
        />

        <Input
          name="secondaryEmail"
          defaultValue={userData.secondaryEmail}
          label="Secondary contact email"
        />
        <Input
          name="contactNumber"
          defaultValue={userData.contactNumber}
          label="Contact Phone number"
        />
        <div>
          <label>Social media</label>
          <ul className="flex flex-wrap gap-1">
            {userData.socialMedias.map((item: SocialMedia) => (
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
          className={`flex-1 ${
            pathname.includes("social-media") && "invisible"
          }`}
          to={"social-media"}
        >
          Add new social media
        </Button>

        <div className="flex gap-3 mt-6">
          <Button className="flex-1" to={".."}>
            Cancel
          </Button>
          <Button className="flex-1">Submit</Button>
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
