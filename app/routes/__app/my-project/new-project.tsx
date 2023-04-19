import ProjectForm from "~/components/ProjectPage/ProjectForm";
const NewProject = () => {
  return (
    <div className="flex flex-col h-full w-full bg-white p-8">
      <h2>New Project</h2>
      <ProjectForm className="flex-1" />
    </div>
  );
};

export default NewProject;
