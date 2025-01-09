'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/hooks/store';
import { selectRequest } from '@/store/slices/project';
import { useEffect, useState } from 'react';
import CreateProjectForm from '../Forms/CreateProjectForm';

export default function CreateProjectDialog() {
  const { success } = useAppSelector(selectRequest('createProject'));
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (success) handleClose();
  }, [success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="w-48"
          variant="default"
        >
          Create{' '}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateProjectForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
