import type { FC } from "react";
import { IconType } from "react-icons";

interface StatCardProps {
  Icon: IconType;
  title: string;
  value: string | number;
  contentColor: string;
}

const StatCard: FC<StatCardProps> = ({
  Icon,
  title,
  value,
  contentColor,
}) => {
  return (
    <>
      <div className='p-3 bg-blue-100 rounded-lg'>
        <Icon className={`h-6 w-6 ${contentColor}`} />
      </div>
      <div className='ml-4'>
        <p className='text-sm text-gray-600'>{title}</p>
        <p className='text-2xl font-bold text-gray-900'>{value}</p>
      </div>
    </>
  );
};

export default StatCard;
