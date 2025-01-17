// toastUtils.ts

import { ServerResponse } from '@/components/types';
import { toast } from '@/hooks/use-toast';
import { AxiosResponse } from 'axios';

export const toastSuccess = (
  response: AxiosResponse<ServerResponse>,
  description?: string,
) => {
  if (response && response.data.message !== '') {
    toast({
      title: response.data.message,
      description: description,
      variant: 'success',
      duration: 3000,
    });
  }
};

export const toastError = (message: string, description?: string) => {
  toast({
    title: message,
    description: description,
    variant: 'destructive',
    duration: 3000,
  });
};
