import { TASK_STATUS } from '@/store/slices/types/project.type';

export const getStatusStyle = (status: string | undefined) => {
  switch (status) {
    case TASK_STATUS.COMPLETED:
      return 'success';
    case TASK_STATUS.FAILED:
      return 'failed';
    case TASK_STATUS.PENDING:
      return 'progress';
    default:
      return 'default';
  }
};
