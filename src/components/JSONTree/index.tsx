type Props = {
  data: object | null;
  parentKey: string;
  onKeyClick: (path: string) => void;
};

const JSONTree = ({ data, parentKey, onKeyClick }: Props) => {
  if (typeof data === 'object' && data !== null) {
    return (
      <ul className="pl-4 border-l-2 border-gray-300">
        {Object.entries(data).map(([key, value]) => {
          const path = Array.isArray(data)
            ? `${parentKey}[${key}]`
            : `${parentKey}.${key}`;

          return (
            <li key={path}>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => onKeyClick(path)}
              >
                {key}
              </span>
              {typeof value === 'object' ? (
                <JSONTree
                  data={value}
                  parentKey={path}
                  onKeyClick={onKeyClick}
                />
              ) : (
                <span className="ml-2 text-gray-700">
                  : {JSON.stringify(value)}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};
export default JSONTree;
