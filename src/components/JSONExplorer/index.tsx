import { useState } from 'react';
import Card from '../Card';
import InputFieldLayout from '../InputFieldLayout';
import JSONTreeWithClickableKeys from '../JSONWithClickableKeys';

const sampleData = {
  date: '2021-10-27T07:49:14.896Z',
  hasError: false,
  fields: [
    {
      id: '4c212130',
      prop: 'iban',
      value: 'DE81200505501265402568',
      hasError: false,
    },
  ],
};
const JSONExplorer = () => {
  const [jsonData] = useState<any>(sampleData);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const handlePropertyChange = (path: string) => {
    try {
      const keys = path
        .replace(/^res\./, '')
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.');

      const value = keys.reduce((acc, key) => {
        if (acc === undefined || acc === null) {
          throw new Error(`Invalid path: ${path}`);
        }
        return acc[key];
      }, jsonData);

      setSelectedPath(path);
      setSelectedValue(value?.toString());
    } catch (error) {
      console.error('Error resolving path:', path, error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center mt-10">
        JSON Explorer
      </h1>
      <InputFieldLayout
        propertyPath={selectedPath || ''}
        onPropertyChange={handlePropertyChange}
        blockVariable={''}
      />

      <Card className="mt-6 p-4 flex-col text-left">
        <h2 className="text-lg font-bold mb-4">JSON with Clickable Keys</h2>
        <JSONTreeWithClickableKeys
          data={jsonData}
          parentKey="res"
          onKeyClick={handlePropertyChange}
        />
        {selectedPath && (
          <div className="mt-4 p-4 bg-gray-50 border rounded shadow">
            <p>
              <strong>Path:</strong> {selectedPath}
            </p>
            <p>
              <strong>Value:</strong> {JSON.stringify(selectedValue)}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default JSONExplorer;
