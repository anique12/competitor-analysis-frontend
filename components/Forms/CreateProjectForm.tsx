'use client';
import { useAppDispatch } from '@/hooks/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormInput from '../Inputs/FormInput';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { createProjectSchema } from './Schema';
import { CreateFormType } from './types';

const CreateProjectForm = () => {
  const dispatch = useAppDispatch();
  const formMethods = useForm<CreateFormType>({
    defaultValues: {
      title: '',
      url: '',
    },
    resolver: zodResolver(createProjectSchema),
  });
  const { handleSubmit } = formMethods;

  const onFormSubmit = (data: CreateFormType) => {
    console.log(data);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        <FormInput
          label="Project title"
          name="title"
          placeholder="Enter title"
        />
        <FormInput
          label="Website URL"
          name="url"
          placeholder="Enter website url"
        />
        <Button className="w-full mt-12" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
