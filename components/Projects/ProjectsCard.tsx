'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { getAllProjects, selectRequest } from '@/store/slices/project';
import { useEffect } from 'react';

const ProjectsCard = () => {
  const dispatch = useAppDispatch();
  const { data, inProgress } = useAppSelector(selectRequest('getAllProjects'));

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return <div>ProjectsCard</div>;
};

export default ProjectsCard;
