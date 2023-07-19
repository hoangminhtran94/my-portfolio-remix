import { Form } from "@remix-run/react";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";
import type { ChangeEvent, FormEvent } from "react";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useActionData } from "@remix-run/react";
import FormSent from "./FormSent";

const ContactForm = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/send-message", {
      body: new FormData(e.target as HTMLFormElement),
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setErrors(data.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };
  const clearErrorHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setErrors((prev) => {
      const errors = { ...prev };
      delete errors[name];
      return errors;
    });
  };

  const isInView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
      className="flex-1 "
    >
      {success ? (
        <FormSent />
      ) : (
        <Form
          className="w-full h-full p-5 flex flex-col bg-indigo-700 rounded-md"
          onSubmit={submitHandler}
        >
          <h2>Contact me now</h2>
          <Input
            name="subject"
            enableError={true}
            errorMessage={errors?.subject}
            required
            onChange={clearErrorHandler}
            placeholder="Subject"
            className="!bg-transparent"
            label="Subject"
          />
          <Input
            name="name"
            required
            enableError={true}
            onChange={clearErrorHandler}
            errorMessage={errors?.name}
            placeholder="Please enter your name"
            className="!bg-transparent"
            label="Name"
          />
          <Input
            name="email"
            required
            enableError={true}
            onChange={clearErrorHandler}
            errorMessage={errors?.email}
            placeholder="Please enter you email"
            className="!bg-transparent"
            label="Email"
          />
          <TextArea
            name="message"
            enableError={true}
            onChange={clearErrorHandler}
            errorMessage={errors?.message}
            required
            placeholder="Message"
            textAreaClassName="!bg-transparent"
            label="Message"
          />
          <Button className="hover:!bg-indigo-600 mt-5">Send message</Button>
        </Form>
      )}
    </div>
  );
};

export default ContactForm;