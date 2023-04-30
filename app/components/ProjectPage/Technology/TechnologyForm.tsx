import { Form, useTransition } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import ImageInput from "~/components/UI/ImageInput/ImageInput";
import Input from "~/components/UI/Input/Input";
import type { FC } from "react";
import type { Technology } from "~/utils/models/models";
import LoadingSpinner from "~/components/UI/LoadingSpinner/LoadingSpinner";

const TechnologyForm: FC<{ tech?: Technology }> = ({ tech }) => {
  const transition = useTransition();
  const submitting = transition.state === "submitting";
  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="flex flex-col gap-2 flex-1"
    >
      {submitting && <LoadingSpinner />}
      <Input defaultValue={tech?.name} name="name" label="Technology name" />
      <Input
        name="backgroundColor"
        defaultValue={tech?.backgroundColor ?? "#ffffff"}
        type="color"
        label="Background color"
        className="!p-0"
      />
      <Input
        name="textColor"
        type="color"
        label="Text color"
        defaultValue={tech?.textColor ?? "#000000"}
        className="!p-0"
      />
      <ImageInput
        name="icon"
        defaultImages={tech ? [tech.icon] : []}
        multiple={false}
        accept=".svg,.png"
        label="Icon"
      />
      <div className="flex w-full gap-5 mt-auto">
        <Button to={".."} className="flex-1">
          Cancel
        </Button>
        <Button disabled={submitting} className="flex-1">
          {submitting ? "Submitting" : "Submit"}
        </Button>
      </div>
    </Form>
  );
};

export default TechnologyForm;
