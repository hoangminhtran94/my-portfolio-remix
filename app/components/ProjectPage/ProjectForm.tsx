import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import ImageInput from "../UI/ImageInput/ImageInput";
const ProjectForm = () => {
  return (
    <form className="flex flex-col gap-3">
      <Input label="Project name" />
      <TextArea label="Project description" />
      <Input label="Project Github link" />
      <ImageInput label="Project images" />
    </form>
  );
};

export default ProjectForm;
