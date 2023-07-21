import { useLoaderData } from "@remix-run/react";
import EditAboutForm from "~/components/About/AboutForm";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { getUserFromSession, updateUser } from "~/utils/database/auth.server";
import { redirect } from "@remix-run/node";

const AboutEdit = () => {
  const data = useLoaderData();
  const rootUser = data;
  return (
    <div className="bg-white p-5 rounded-lg w-full border border-indigo-300 ">
      <h1>Edit About</h1>
      <EditAboutForm user={rootUser} />
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

  const databaseData = {
    ...data,
  };

  try {
    await updateUser(user.id, databaseData);
    return redirect("/profile");
  } catch (error) {
    throw error;
  }
};
