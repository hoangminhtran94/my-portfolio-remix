import { Form } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import Input from "~/components/UI/Input/Input";
import Button from "~/components/UI/Button/Button";
import { Link } from "react-router-dom";
import { login, register } from "~/utils/database/auth.server";

import type { ActionFunction } from "@remix-run/node";
import { User } from "~/utils/models/models";
const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "login";
  return (
    <div className="w-full flex justify-center ">
      <div className="w-[80%] lg:w-[40%] bg-white p-10 rounded-lg drop-shadow-lg">
        <p className="text-center text-3xl">
          Login
          {/* {mode === "login" ? "Login" : "Register"} */}
        </p>
        <Form method="post" className="flex flex-col gap-4">
          {/* {mode === "register" && <Input name="name" label="Name" />} */}
          {/* <Input name="name" label="Name" /> */}
          <Input name="username" label="Username" />
          <Input type="password" name="password" label="Password" />
          <Button className="mt-8">
            {/* {mode === "login" ? "Login" : "Submit"} */}
            Login
          </Button>
          {/* <Link
            className="text-center  text-[12px]"
            to={mode === "register" ? "" : "?mode=register"}
          >
            {mode === "login" ? "Register for me only" : "Login for me only"}
          </Link> */}
        </Form>
      </div>
    </div>
  );
};

export default Auth;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // const searchParams = new URL(request.url).searchParams.get("mode");
  // if (searchParams) {

  // try {
  //   return await register(data);
  // } catch (error) {
  //   console.log(error);
  //   throw error;
  // }
  // } else {
  try {
    return await login(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
  // }
};
