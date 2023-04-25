import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import ImageInput from "../UI/ImageInput/ImageInput";
import Button from "../UI/Button/Button";
import { Form } from "@remix-run/react";
import type { FormEvent } from "react";
import { useMatches, useFetcher } from "@remix-run/react";
import type { FormProps } from "@remix-run/react";
import InputDropdown from "../UI/InputDropdown/InputDropdown";
import type { ComponentPropsWithoutRef, FC } from "react";
import { useState } from "react";
import type { Project, Technology } from "~/utils/models/models";

const ProjectForm: FC<
  FormProps & ComponentPropsWithoutRef<"form"> & { project?: Project }
> = (props) => {
  const matches = useMatches();

  const technologies: Technology[] = matches[0].data.technologies;
  const [selectedTechonologies, setSelectedTechnologies] = useState<
    Technology[]
  >([]);
  const [projectImages, setProjectImages] = useState<
    { image: string; file: File | null }[]
  >(
    props.project
      ? props.project.projectImages.map((image) => ({ image, file: null }))
      : []
  );

  const fetcher = useFetcher();
  const submitHandler = (event: FormEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    if (selectedTechonologies.length > 0) {
      selectedTechonologies.forEach((tech) =>
        formData.append("technologyIds", tech.id)
      );
    }
    projectImages.forEach((image) => {
      if (image.file) {
        formData.append("projectImages", image.file);
      } else {
        formData.append("projectImageArray", image.image);
      }
    });

    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  return (
    <Form
      onSubmit={submitHandler}
      id="new-project-form"
      {...props}
      className={`${props.className}  flex flex-col gap-3`}
    >
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
        defaultValue={props.project?.githubLink}
        name="githubLink"
        label="Project Github link"
      />
      <Input
        defaultValue={props.project?.demoLink}
        name="demoLink"
        label="Project demo link"
      />
      <ImageInput
        defaultImages={props.project?.projectImages}
        getImages={(images) => {
          setProjectImages(images);
        }}
        label="Project images"
      />
      <InputDropdown
        defaultList={props.project?.technologies}
        getSelectedList={(list) => {
          setSelectedTechnologies(list);
        }}
        label="Technologies"
        dropdownList={technologies}
      />
      <div className="flex gap-5">
        <Button to={"/my-project"} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {props.project ? "Save" : "Submit"}
        </Button>
      </div>
    </Form>
  );
};

export default ProjectForm;
