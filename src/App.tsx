import JSONExplorer from './components/JSONExplorer';

export interface SampleData {
  date: string;
  hasError: boolean;
  fields: Field[];
}

interface Field {
  id: string;
  prop: string;
  value: string;
  hasError: boolean;
}

const App = () => {
  const sampleData: SampleData = {
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      <JSONExplorer sampleData={sampleData} />
    </div>
  );
};

export default App;
