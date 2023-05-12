import { Form } from "@remix-run/react";
import type { FormProps } from "@remix-run/react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import InputDropdown from "../UI/InputDropdown/InputDropdown";
import FeatureImageInput from "../UI/FeatureImageInput/FeatureImageInput";
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
      {...props}
      className={`${className}  flex flex-col gap-3`}
    >
      <Input
        defaultValue={userData.firstLineAbout}
        name="name"
        label="Project name"
      />
      <TextArea
        defaultValue={userData.secondLineAbout}
        name="description"
        label="Project description"
      />
      <TextArea
        defaultValue={userData.thirdLineAbout}
        name="detailedDescription"
        label="Project detailed description"
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
