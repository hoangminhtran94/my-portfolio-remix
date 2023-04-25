import { Form } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import ImageInput from "~/components/UI/ImageInput/ImageInput";
import Input from "~/components/UI/Input/Input";

const TechnologyForm = () => {
  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="flex flex-col gap-2 flex-1"
    >
      <Input name="name" label="Technology name" />
      <Input
        name="backgroundColor"
        defaultValue="#ffffff"
        type="color"
        label="Background color"
        className="!p-0"
      />
      <Input
        name="textColor"
        type="color"
        label="Text color"
        defaultValue="#000000"
        className="!p-0"
      />
      <ImageInput
        name="icon"
        multiple={false}
        accept=".svg,.png"
        label="Icon"
      />
      <div className="flex w-full gap-5 mt-auto">
        <Button to={".."} className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1">Submit</Button>
      </div>
    </Form>
  );
};

export default TechnologyForm;
