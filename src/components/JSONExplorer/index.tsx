import { useState } from 'react';
import { SampleData } from '../../App';
import Card from '../Card';
import InputFieldLayout from '../InputFieldLayout';
import JSONTreeWithClickableKeys from '../JSONWithClickableKeys';
import PathDisplay from '../PathDisplay';

type Props = {
  sampleData: SampleData;
};

const JSONExplorer = ({ sampleData }: Props) => {
  const [jsonData] = useState(sampleData);
  const [selectedPath, setSelectedPath] = useState<string>();
  const [selectedValue, setSelectedValue] = useState<string>();

  const handlePropertyChange = (path: string) => {
    try {
      const sanitizedPath = path.replace(/\s+/g, '');

      const keys = sanitizedPath
        .replace(/^res\./, '')
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.');

      const value = keys.reduce((acc: any, key: string) => {
        if (acc === undefined || acc === null || !(key in acc)) {
          throw new Error(`Invalid path: ${path}`);
        }
        return acc[key];
      }, jsonData);

      if (typeof value === 'object' || typeof value === 'function') {
        setSelectedPath(path);
        setSelectedValue('undefined');
        return;
      } else {
        setSelectedPath(path);
        setSelectedValue(value.toString());
      }
    } catch (error) {
      setSelectedPath(path);
      setSelectedValue('undefined');
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
        <PathDisplay path={selectedPath} value={selectedValue} />
      </Card>
    </div>
  );
};

export default JSONExplorer;
