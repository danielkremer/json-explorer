import { SampleData } from '../../App';

type Props = {
  data: SampleData;
  parentKey: string;
  onKeyClick: (path: string) => void;
  level?: number;
};

const BASE_INDENTATION = 10;
const KEY_COLOR = 'text-blue-500';
const NON_CLICKABLE_COLOR = 'text-gray-600';
const VALUE_COLOR = 'text-gray-700';

const JSONTreeWithClickableKeys = ({
  data,
  parentKey,
  onKeyClick,
  level = 0,
}: Props) => {
  const currentIndentation = `${level * BASE_INDENTATION}px`;
  const nextLevel = level + 1;

  if (Array.isArray(data)) {
    return (
      <div style={{ marginLeft: currentIndentation }}>
        <span>{'['}</span>
        {data.map((value, index) => (
          <div key={`${parentKey}[${index}]`}>
            {typeof value === 'object' ? (
              <JSONTreeWithClickableKeys
                data={value}
                parentKey={`${parentKey}[${index}]`}
                onKeyClick={onKeyClick}
                level={nextLevel}
              />
            ) : (
              <div style={{ marginLeft: `${nextLevel * BASE_INDENTATION}px` }}>
                <span className={VALUE_COLOR}>{JSON.stringify(value)}</span>
                {index < data.length - 1 && <span>,</span>}
              </div>
            )}
          </div>
        ))}
        <span style={{ marginLeft: currentIndentation }}>{']'}</span>
      </div>
    );
  }

  if (typeof data === 'object' && data !== null) {
    return (
      <div style={{ marginLeft: currentIndentation }}>
        <span>{'{'}</span>
        {Object.entries(data).map(([key, value], index, array) => {
          const path = `${parentKey}.${key}`;
          const isValueArray = Array.isArray(value);

          return (
            <div
              key={path}
              style={{ marginLeft: `${nextLevel * BASE_INDENTATION}px` }}
            >
              <span
                className={
                  isValueArray
                    ? NON_CLICKABLE_COLOR
                    : `${KEY_COLOR} cursor-pointer`
                }
                onClick={!isValueArray ? () => onKeyClick(path) : undefined}
              >
                {key}
              </span>
              :{' '}
              {typeof value === 'object' ? (
                <JSONTreeWithClickableKeys
                  data={value}
                  parentKey={path}
                  onKeyClick={onKeyClick}
                  level={nextLevel}
                />
              ) : (
                <span className={VALUE_COLOR}>{JSON.stringify(value)}</span>
              )}
              {index < array.length - 1 && <span>,</span>}
            </div>
          );
        })}
        <span style={{ marginLeft: currentIndentation }}>{'}'}</span>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: currentIndentation }}>
      <span className={VALUE_COLOR}>{JSON.stringify(data)}</span>
    </div>
  );
};

export default JSONTreeWithClickableKeys;
