'use client';

import ProjectTabs from '@/components/Projects/Tabs/ProjectTab';
import { getStatusStyle } from '@/components/Styles';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  getTaskStatus,
  saveSelectedProject,
  selectedProject,
  selectRequest,
} from '@/store/slices/project';
import { TASK_STATUS } from '@/store/slices/types/project.type';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const page = () => {
  const dispatch = useAppDispatch();
  const { data: projects } = useAppSelector(selectRequest('getAllProjects'));
  const { data, inProgress } = useAppSelector(selectRequest('getTaskStatus'));
  const project = useAppSelector(selectedProject);
  const { id } = useParams();
  let intervalId = useRef<NodeJS.Timeout | null>(null);
  const [taskId, settaskId] = useState('');

  useEffect(() => {
    if (taskId) dispatch(getTaskStatus({ taskId }));
  }, [taskId]);

  useEffect(() => {
    if (id && projects && Array.isArray(projects)) {
      const activeProject = projects?.find(project => project._id == id);
      activeProject && dispatch(saveSelectedProject(activeProject));
      settaskId(activeProject?.taskId as string);
    }
  }, [projects]);

  useEffect(() => {
    const pollStatus = () => {
      if (taskId) {
        dispatch(getTaskStatus({ taskId }));
      }
    };

    intervalId.current = setInterval(() => {
      if (
        data?.status === TASK_STATUS.COMPLETED ||
        data?.status === TASK_STATUS.FAILED
      ) {
        if (intervalId.current) clearInterval(intervalId?.current);
        intervalId.current = null;
        return;
      }
      pollStatus();
    }, 2000);

    return () => {
      if (intervalId.current) clearInterval(intervalId?.current);
    };
  }, [data?.status, dispatch]);

  return (
    <div className="h-full">
      {project && data?.status && (
        <div className="flex gap-1 justify-start">
          <h2 className="text-sm font-medium tracking-tight">
            {project?.title}
          </h2>
          <Badge
            className="mb-2 px-1 py-[1px] leading-[13px] pb-[2px]"
            variant={getStatusStyle(data.status) as any}
          >
            {data.status}
          </Badge>
        </div>
      )}
      <ProjectTabs />
    </div>
  );
};

export default page;
