'use client';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  getCompetitiveAnalysis,
  selectedProject,
  selectRequest,
} from '@/store/slices/project';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import ProductTable from '../Table/ProductTable';

const CompetitiveAnalysis = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectedProject);
  const { data } = useAppSelector(selectRequest('getCompetitiveAnalysis'));
  const { id } = useParams();

  useEffect(() => {
    if (id && project?.hasCompetitiveAnalysis) {
      dispatch(getCompetitiveAnalysis({ projectId: id as string }));
    }
  }, [dispatch, id, project?.hasCompetitiveAnalysis]);

  const handleClick = () => {
    if (project && project._id) {
      dispatch(getCompetitiveAnalysis({ projectId: project._id }));
    }
  };

  return (
    <>
      {project && !project.hasCompetitiveAnalysis ? (
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Competitive Analysis Found
          </h1>
          <p className="text-gray-600 mb-6">
            It seems like you haven't created any competitive analysis for this
            project yet. Start now to gain insights and stay ahead of the
            competition!
          </p>
          <Button size="lg" onClick={handleClick}>
            Generate Competitive Analysis
          </Button>
        </div>
      ) : (
        <>
          {data && data.length > 0 && (
            <div className="h-[500px] w-full overflow-auto">
              <ProductTable />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CompetitiveAnalysis;
