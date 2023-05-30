import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";

import Button from "../UI/Button/Button";
import { Form } from "@remix-run/react";
import type { FormEvent } from "react";
import { useMatches, useFetcher } from "@remix-run/react";
import type { FormProps } from "@remix-run/react";
import InputDropdown from "../UI/InputDropdown/InputDropdown";
import type { ComponentPropsWithoutRef, FC } from "react";
import { useState } from "react";
import type { FeatureImage, Project, Technology } from "~/utils/models/models";
import FeatureImageInput from "../UI/FeatureImageInput/FeatureImageInput";

const ProjectForm: FC<
  FormProps & ComponentPropsWithoutRef<"form"> & { project?: Project }
> = (props) => {
  const matches = useMatches();

  const technologies: Technology[] = matches[0].data.technologies;
  const [selectedTechonologies, setSelectedTechnologies] = useState<
    Technology[]
  >([]);

  const [featureImages, setFeatureImages] = useState<FeatureImage[]>(
    props.project
      ? props.project.projectFeatureImages.map((image) => ({
          ...image,
          file: null,
        }))
      : []
  );

  const fetcher = useFetcher();
  const submitHandler = (event: FormEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    if (selectedTechonologies.length > 0) {
      const technologiesIds = selectedTechonologies.map((tech) => tech.id);
      formData.append("technologyIds", JSON.stringify(technologiesIds));
    }
    const featureImagesWithNames = featureImages.map((fti) => ({
      ...fti,
      name: fti.label!.replace(/ /g, "").toLocaleLowerCase(),
    }));
    formData.append("featureImages", JSON.stringify(featureImagesWithNames));

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
      <TextArea
        defaultValue={props.project?.detailedDescription}
        name="detailedDescription"
        label="Project detailed description"
      />
      <InputDropdown
        defaultList={props.project?.technologies}
        getSelectedList={(list) => {
          setSelectedTechnologies(list);
        }}
        label="Technologies"
        dropdownList={technologies}
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

      <FeatureImageInput
        defaultImages={featureImages}
        label="Feature images"
        getImages={(images) => {
          setFeatureImages(images);
        }}
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
