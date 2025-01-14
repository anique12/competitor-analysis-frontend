'use client';
import { useAppSelector } from '@/hooks/store';
import { selectRequest } from '@/store/slices/project';
import { TASK_STATUS } from '@/store/slices/types/project.type';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import CompetitiveAnalysis from './CompetitiveAnalysis';
import KnowledgeBase from './KnowledgeBase';

const ProjectTabs = () => {
  const { data } = useAppSelector(selectRequest('getTaskStatus'));

  const tabsList = [
    {
      value: 'knowledge-base',
      label: 'Knowledge Base',
      children: <KnowledgeBase />,
    },
    {
      value: 'competitive-analysis',
      label: 'Competitive Analysis',
      children: <CompetitiveAnalysis />,
    },
  ];

  return (
    <Tabs defaultValue="knowledge-base" className="w-full mt-8">
      <TabsList>
        {tabsList.map(tab => (
          <TabsTrigger
            disabled={data.status != TASK_STATUS.COMPLETED}
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsList.map(content => (
        <TabsContent
          className="w-full flex mt-24 flex-col items-center justify-center px-4"
          key={content.value}
          value={content.value}
        >
          {data.status != TASK_STATUS.COMPLETED ? null : content.children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProjectTabs;
