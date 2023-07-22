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
import { v4 } from "uuid";

const ProjectForm: FC<
  FormProps & ComponentPropsWithoutRef<"form"> & { project?: Project }
> = (props) => {
  const matches = useMatches();
  const editMode = !!props.project;
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
    const featureImagesWithNames = featureImages
      .filter((fti) => fti.id === undefined)
      .map((fti) => ({
        ...fti,
        name: v4(),
      }));
    featureImagesWithNames.forEach((group) => {
      group.multiScreenImages?.forEach((image) => {
        formData.append(group.name, image.file ?? "N/A");
      });
    });

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
      <h2>{props.project ? "Edit" : "New"} Project</h2>
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
        defaultValue={props.project?.secondGitHubLink}
        name="secondGitHubLink"
        label="Project backend Github link"
      />
      <Input
        defaultValue={props.project?.demoLink}
        name="demoLink"
        label="Project demo link"
      />

      <FeatureImageInput
        editMode={editMode}
        defaultImages={featureImages}
        label="Feature images"
        getImages={(images) => {
          setFeatureImages(images);
        }}
      />
      <div className="flex sticky -bottom-4 gap-5 z-10 pt-5  bg-white">
        <Button to={"/profile/projects"} className="flex-1 btn-light">
          Cancel
        </Button>
        <Button type="submit" className="flex-1 btn-success">
          {props.project ? "Save" : "Submit"}
        </Button>
      </div>
    </Form>
  );
};

export default ProjectForm;
