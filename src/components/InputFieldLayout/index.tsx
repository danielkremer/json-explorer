import { FaArrowRight } from 'react-icons/fa';
import Card from '../Card';
import InputField from '../InputField';

type Props = {
  propertyPath: string;
  blockVariable: string;
  onPropertyChange: (path: string) => void;
};

const InputFieldLayout = ({
  propertyPath,
  blockVariable,
  onPropertyChange,
}: Props) => {
  return (
    <Card className="space-x-6 mb-8">
      <div className="flex-1">
        <InputField
          label="Property"
          value={propertyPath}
          onChange={onPropertyChange}
          placeholder="Enter property path..."
        />
      </div>

      <div className="flex items-center justify-center text-blue-500 mt-8">
        <FaArrowRight size={24} />
      </div>

      <div className="flex-1">
        <InputField
          label="Block/Variable"
          value={blockVariable}
          onChange={() => {}}
          placeholder="Value will appear here..."
        />
      </div>
    </Card>
  );
};

export default InputFieldLayout;
