import { Button } from '@/components/ui/button';

const CompetitiveAnalysis = () => {
  console.log('hi');
  return (
    <div className="max-w-md text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        No Competitive Analysis Found
      </h1>
      <p className="text-gray-600 mb-6">
        It seems like you haven't created any competitive analysis for this
        project yet. Start now to gain insights and stay ahead of the
        competition!
      </p>
      <Button
        size="lg"
        onClick={() => console.log('Generating competitive analysis...')}
      >
        Generate Competitive Analysis
      </Button>
    </div>
  );
};

export default CompetitiveAnalysis;
