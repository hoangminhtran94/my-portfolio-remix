import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import ImageInput from "../UI/ImageInput/ImageInput";
import Button from "../UI/Button/Button";
import { Form } from "@remix-run/react";
import type { FormProps } from "@remix-run/react";
import type { ComponentPropsWithoutRef, FC } from "react";
const ProjectForm: FC<FormProps & ComponentPropsWithoutRef<"form">> = (
  props
) => {
  return (
    <Form {...props} className={`${props.className} flex flex-col gap-3`}>
      <Input name="name" label="Project name" />
      <TextArea name="description" label="Project description" />
      <Input name="link" label="Project Github link" />
      <ImageInput name="images" label="Project images" />
      <Button className="mt-auto ">Submit</Button>
    </Form>
  );
};

export default ProjectForm;
