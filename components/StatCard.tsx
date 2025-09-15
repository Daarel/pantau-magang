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
      <div className='p-3 rounded-lg max-lg:flex max-lg:justify-center max-lg: items-center'>
        <Icon className={`h-10 w-10 ${contentColor}`} />
      </div>
      <div className='flex flex-col max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:items-center'>
        <p className='text-sm text-gray-600'>{title}</p>
        <p className='text-2xl font-bold text-gray-900'>{value}</p>
      </div>
    </>
  );
};

export default StatCard;
