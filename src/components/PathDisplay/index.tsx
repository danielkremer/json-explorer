type Props = {
  path: string;
  value: any;
};

const PathDisplay = ({ path, value }: Props) => (
  <div className="mt-4 p-4 border rounded bg-white shadow">
    {path ? (
      <>
        <p>
          <strong>Path:</strong> {path}
        </p>
        <p>
          <strong>Value:</strong> {JSON.stringify(value)}
        </p>
      </>
    ) : (
      <p className="text-gray-500">
        Click on a key to view its path and value.
      </p>
    )}
  </div>
);

export default PathDisplay;
