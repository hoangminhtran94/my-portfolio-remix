import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import ImageInput from "../UI/ImageInput/ImageInput";
import Button from "../UI/Button/Button";
import { Form } from "@remix-run/react";
import type { FormProps } from "@remix-run/react";
import InputDropdown from "../UI/InputDropdown/InputDropdown";
import type { ComponentPropsWithoutRef, FC } from "react";
import type { Project, Technology } from "~/utils/models/models";
const ProjectForm: FC<
  FormProps & ComponentPropsWithoutRef<"form"> & { project?: Project }
> = (props) => {
  const technologies: Technology[] = [
    { id: "angular", name: "Angular" },
    { id: "react", name: "React" },
  ];
  return (
    <Form {...props} className={`${props.className} flex flex-col gap-3`}>
      <Input
        defaultValue={props.project?.name}
        name="name"
        label="Project name"
      />
      <TextArea
        defaultValue={props.project?.description}
        name="description"
        label="Project description"
      />
      <Input
        defaultValue={props.project?.link}
        name="link"
        label="Project Github link"
      />
      <ImageInput
        projectImages={props.project?.projectImages}
        name="images"
        label="Project images"
      />
      <InputDropdown label="Technologies" dropdownList={technologies} />
      <div className="flex gap-5">
        <Button to={"/my-project"} className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1">{props.project ? "Save" : "Submit"}</Button>
      </div>
    </Form>
  );
};

export default ProjectForm;
