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
    <div className="mt-28">
      <Button onClick={downloadData} size="lg">
        Download Data
      </Button>
    </div>
  );
};

export default KnowledgeBase;
