'use client';

import { getStatusStyle } from '@/components/Styles';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { getTaskStatus, selectRequest } from '@/store/slices/project';
import { TASK_STATUS } from '@/store/slices/types/project.type';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface PageProps {
  params: { id: string };
}

const page = () => {
  const dispatch = useAppDispatch();
  const { data, inProgress } = useAppSelector(selectRequest('getTaskStatus'));
  const { id } = useParams();
  let intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const pollStatus = () => {
      if (id) {
        dispatch(getTaskStatus({ taskId: id as string }));
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

  useEffect(() => {
    if (id) dispatch(getTaskStatus({ taskId: id as string }));
  }, [id]);

  return (
    <div>
      {data.status && (
        <Badge variant={getStatusStyle(data.status) as any}>
          {data.status}
        </Badge>
      )}
    </div>
  );
};

export default page;
