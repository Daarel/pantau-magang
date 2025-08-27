import { AiOutlineUserAdd } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface TablePageHeaderProps {
  title: string;
  subtitle: string;
  label: string;
  onAdd: () => void;
}

const TablePageHeader: FC<TablePageHeaderProps> = ({
  title,
  subtitle,
  label,
  onAdd,
}) => {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-gray-500'>{subtitle}</p>
      </div>
      <Button
        onClick={onAdd}
        className='cursor-pointer flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
      >
        <AiOutlineUserAdd className='h-6 w-auto' />
        <span className='text-xs'>{ label }</span>
      </Button>
    </div>
  );
};

export default TablePageHeader;
