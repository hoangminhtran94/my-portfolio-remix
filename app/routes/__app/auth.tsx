import { Form } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import Input from "~/components/UI/Input/Input";
import Button from "~/components/UI/Button/Button";
import { Link } from "react-router-dom";
import { login, register } from "~/utils/database/auth.server";
import { useState, useRef, useContext, useEffect } from "react";
import useClickOutside from "~/utils/hooks/useClickOutside";
import type { ActionFunction } from "@remix-run/node";
import { PageContext } from "~/store/page-context";
import InviewWrapper from "~/components/UI/InviewWrapper/InviewWrapper";
const Auth = () => {
  const [searchParams] = useSearchParams();
  const { onChangePage } = useContext(PageContext);
  const [toggleDescriptionModal, setToggleDescriptionModal] = useState(false);
  const modalRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    onChangePage("");
  }, []);
  useClickOutside(modalRef, () => {
    setToggleDescriptionModal(false);
  });

  const mode = searchParams.get("mode") ?? "login";
  return (
    <div className="w-full flex justify-center self-center flex-1 items-center">
      <InviewWrapper className="w-[80%] lg:w-[40%] bg-white p-10 rounded-lg drop-shadow-lg">
        <p className="text-center text-3xl flex gap-2 justify-center">
          Login
          {/* {mode === "login" ? "Login" : "Register"} */}
          <span className=" relative " ref={modalRef}>
            <svg
              className="hover:scale-110 transition-all cursor-pointer w-[20px] fill-indigo-700 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              onClick={() => {
                setToggleDescriptionModal(true);
              }}
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
            {toggleDescriptionModal && (
              <span className="absolute  text-xs md:text-sm md:w-[300px] w-[180px] p-3 text-justify  right-[10%]  top-[105%] border bg-white border-indigo-300 rounded">
                <span className="text-red-500">Warning:</span> This panel is
                only for me to login and manage content of this website
              </span>
            )}
          </span>
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
      </InviewWrapper>
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

export const meta: MetaFunction = () => {
  return { title: "Admin login" };
};
