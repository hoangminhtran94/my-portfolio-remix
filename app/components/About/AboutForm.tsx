import { Form } from "@remix-run/react";
import type { FormProps } from "@remix-run/react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import ImageInput from "../UI/ImageInput/ImageInput";
import type { FC } from "react";
import type { User } from "~/utils/models/models";
interface EditAboutFormProps {
  userData: User;
}
const EditAboutForm: FC<EditAboutFormProps & FormProps> = ({
  className,
  userData,
  ...props
}) => {
  return (
    <Form
      id="new-project-form"
      method="post"
      {...props}
      encType="multipart/form-data"
      className={`${className}  flex flex-col gap-3`}
    >
      <ImageInput
        name="profileImage"
        defaultImages={[userData?.profileImage]}
        multiple={false}
        label="Profile Image"
      />
      <Input
        defaultValue={userData?.firstLineAbout}
        name="firstLineAbout"
        label="First line"
      />
      <TextArea
        defaultValue={userData?.secondLineAbout}
        name="secondLineAbout"
        label="Second line"
      />
      <TextArea
        defaultValue={userData?.thirdLineAbout}
        name="thirdLineAbout"
        label="Third line"
      />

      <div className="flex gap-5">
        <Button to={"/my-project"} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default EditAboutForm;
