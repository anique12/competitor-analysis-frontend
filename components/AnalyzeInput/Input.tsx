'use client';
import { useState } from 'react';
import { AnalyzedDataTable } from '../Tables/AnalyzedDataTable';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AnalyzeInput = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [data, setData] = useState<[]>([]);

  const handleAnalyze = async () => {
    setShowTable(false);
    setData([]);
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    const isValidUrl = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i.test(url);
    if (!isValidUrl) {
      setError('Please enter a valid URL.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:4000/api/analyze-website',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ url }),
        },
      );

      if (!response.ok) {
        throw new Error((await response.text()) || 'Failed to analyze website');
      }

      const result = await response.json();

      if (result.analysis && Array.isArray(result.analysis)) {
        setShowTable(true);
        setData(result.analysis);
      } else {
        setError('No valid data found.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-4 flex items-center gap-3">
        <Input
          type="url"
          placeholder="Enter website URL (e.g., https://example.com)"
          className="w-[40%]"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Button variant="outline" onClick={handleAnalyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p> // Show error message
      )}

      {loading && (
        <div className="italic text-gray-500">
          <p>Analyzing website... This may take a few minutes.</p>
          <p className="text-black">
            We're scraping the website and analyzing the content. Please be
            patient.
          </p>
        </div>
      )}

      {showTable && <AnalyzedDataTable data={data} />}
    </>
  );
};

export default AnalyzeInput;
