import { Form } from "@remix-run/react";
import Input from "~/components/UI/Input/Input";
import { ActionFunction } from "@remix-run/node";

const ContactNow = () => {
  return (
    <Form className="bg-modal flex flex-col gap-6  rounded-md shadow-md w-[30%] px-10 py-6">
      <h3>
        Please leave your contact here, I will contact you as soon as possible
      </h3>
      <Input label="Email" />
      <Input label="Phone" />
      <Input label="Message" />
      <button>Submit</button>
    </Form>
  );
};

export default ContactNow;

export const actions: ActionFunction = ({ request }) => {};
