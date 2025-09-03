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
      <div className='p-3 bg-blue-100 rounded-lg max-lg:flex max-lg:justify-center max-lg: items-center'>
        <Icon className={`h-6 w-6 ${contentColor}`} />
      </div>
      <div className='ml-4 max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:ml-0'>
        <p className='text-sm text-gray-600'>{title}</p>
        <p className='text-2xl font-bold text-gray-900'>{value}</p>
      </div>
    </>
  );
};

export default StatCard;
