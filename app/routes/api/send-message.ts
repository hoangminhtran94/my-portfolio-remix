import type { LoaderFunction } from "@remix-run/node";
import { json, type ActionFunction, redirect } from "@remix-run/node";
import { createNewMessage } from "~/utils/database/message.server";
import serverError from "~/utils/models/ServerError";

export const loader: LoaderFunction = () => {
  return redirect("/");
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const error: { [key: string]: string } = {};
  const data = Object.fromEntries(formData);
  if (!data.subject) {
    error.subject = "Subject is required";
  }
  if (data.subject && data.subject.length < 5) {
    error.subject = "Subject has to be more then 5 characters";
  }
  if (!data.name) {
    error.name = "Name is required";
  }
  if (data.name && data.name.length < 5) {
    error.name = "Name has to be more then 5 characters";
  }
  if (!data.email) {
    error.email = "Email is required";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) {
    error.email = "Input has to be an email";
  }
  if (!data.message) {
    error.message = "Message is required";
  }
  if (data.message && data.message.length < 5) {
    error.message = "Message has to be more then 5 characters";
  }
  if (Object.values(error).length > 0) {
    return json({ error });
  }

  try {
    await createNewMessage(data);
    return json({ message: "Success" });
  } catch (error) {
    throw serverError("Something wrong happened", 400);
  }
};
