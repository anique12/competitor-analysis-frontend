'use client';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  getCompetitiveAnalysis,
  getProjectById,
  selectedProject,
  selectRequest,
} from '@/store/slices/project';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ProductTable from '../Table/ProductTable';

const CompetitiveAnalysis = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedProject);
  const { data } = useAppSelector(selectRequest('getCompetitiveAnalysis'));
  const { id } = useParams();
  let intervalId = useRef<NodeJS.Timeout | null>(null);
  const { data: project } = useAppSelector(selectRequest('getProjectById'));
  const [polling, setIsPolling] = useState(false);

  const getAnalysis = () => {
    dispatch(getCompetitiveAnalysis({ projectId: id as string }));
  };

  useEffect(() => {
    if (!selected?.hasCompetitiveAnalysis) return;
    getAnalysis(); 
  }, [selected?.hasCompetitiveAnalysis]);

  useEffect(() => {
    if (!polling) return;

    const pollStatus = () => {
      if (id) {
        dispatch(getProjectById({ projectId: id as string }));
      }
    };

    intervalId.current = setInterval(() => {
      if (project.hasCompetitiveAnalysis) {
        setIsPolling(false);
        getAnalysis();
        if (intervalId.current) clearInterval(intervalId?.current);
        intervalId.current = null;
        return;
      }
      pollStatus();
    }, 2000);

    return () => {
      if (intervalId.current) clearInterval(intervalId?.current);
    };
  }, [polling, project?.hasCompetitiveAnalysis]);

  const handleClick = () => {
    if (selected && selected._id) {
      dispatch(getCompetitiveAnalysis({ projectId: selected._id }));
      getProjectById({ projectId: selected._id });
      setIsPolling(true);
    }
  };

  return (
    <>
      {selected && !selected.hasCompetitiveAnalysis ? (
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Competitive Analysis Found
          </h1>
          <p className="text-gray-600 mb-6">
            It seems like you haven't created any competitive analysis for this
            project yet. Start now to gain insights and stay ahead of the
            competition!
          </p>
          <Button disabled={polling} size="lg" onClick={handleClick}>
            Generate Competitive Analysis
          </Button>
        </div>
      ) : (
        <>
          {data && Array.isArray(data) && data.length > 0 && (
            <div className="h-[500px] overflow-auto">
              <ProductTable />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CompetitiveAnalysis;
