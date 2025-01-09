'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { getAllProjects, selectRequest } from '@/store/slices/project';
import { useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { TooltipProvider } from '../ui/tooltip';
import { useParams, useRouter } from 'next/navigation';

const ProjectsCard = () => {
  const router = useRouter();
  const params = useParams()
  const selectedId = params?.id;

  const dispatch = useAppDispatch();
  const {data,  inProgress  } = useAppSelector(selectRequest('getAllProjects'));

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);
 

  if (!data || data.length === 0) {
    return null;
  }

  
  return (
    <div className="p-2">
      <div className='px-2'>
      <h1 className='mt-2 mb-[2px] tracking-tight font-semibold'>Recent</h1>
      <hr />
      </div>

      <div className='flex mt-1 gap-[2px] flex-col cursor-pointer '>
      {inProgress &&  [...Array(5)].map((_, index) => (
          <div key={index} className="py-2 mb-1 px-2">
          <Skeleton className="h-[10px] mb-2 w-[60px]" />
          <Skeleton className="h-[10px] w-[150px]" />
          </div>
         ))}
        {Array.isArray(data) && data.map((project, index) => {
          const isActive = selectedId === project.taskId;
          return (
            <TooltipProvider key={index}>
              <Tooltip >
              <TooltipTrigger asChild>
                  <div className={`py-1 px-2 hover:bg-gray-200 ${isActive && 'bg-gray-200'} rounded-md`} onClick={() => {
                    !isActive && router.push(`/project/${project.taskId}`) 
                }}>
                    <p className="text-sm font-medium leading-tight">{project.title}</p>
                     <p className="text-[12px] text-gray-500 leading-snug">
                   {project.url.length > 30 ? `${project.url.slice(0, 30)}...` : project.url}
                 </p>
                   </div>
                   </TooltipTrigger>  
                 <TooltipContent>
                   <p>{project.url}</p>
               </TooltipContent>
               </Tooltip>
            </TooltipProvider>
          )})}
      </div>
    </div>
  );
};

export default ProjectsCard;
