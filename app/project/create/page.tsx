import CreateProjectDialog from '@/components/Dialog/CreateProject';

const NewProject = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">Create a New Project</h1>
      <p className="text-[15px] w-[500px] text-gray-600 text-center">
        Welcome to the project creation page. Here, you can set up a new project
        by entering all necessary details such as project name and related
        website URL. Click the button below to start creating your project.
      </p>
      <CreateProjectDialog />
    </div>
  );
};

export default NewProject;
