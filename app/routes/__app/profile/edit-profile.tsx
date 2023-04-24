import { Form } from "@remix-run/react";
import ImageInput from "~/components/UI/ImageInput/ImageInput";
import Input from "~/components/UI/Input/Input";

const EditProfile = () => {
  return (
    <div className="w-1/2">
      <Form className="flex flex-col gap-3">
        <Input label="Full name" />
        <Input label="Username" />
        <Input label="Secondary contact email" />
        <Input label="Contact Phone number" />
        <ImageInput
          name="icon"
          multiple={false}
          accept=".svg,.png"
          label="Social media icon"
        />
      </Form>
    </div>
  );
};

export default EditProfile;
