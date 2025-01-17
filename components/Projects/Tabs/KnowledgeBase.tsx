'use client';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/store';
import { selectedProject } from '@/store/slices/project';

const KnowledgeBase = () => {
  const project = useAppSelector(selectedProject);

  const downloadData = () => {
    if (project && project.fileUrl) {
      window.open(project.fileUrl);
    }
  };

  return (
    <div className="w-full mt-28 flex items-center justify-center">
      <Button onClick={downloadData} size="lg">
        Download Data
      </Button>
    </div>
  );
};

export default KnowledgeBase;
