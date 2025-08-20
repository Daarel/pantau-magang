import type { FC, ReactNode } from "react";

interface StatCardProps {
  icon?: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: string;
}

const StatCard: FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  subtitleColor,
}) => {
  return (
    <>
      <div className='p-3 bg-blue-100 rounded-lg'>{icon}</div>
      <div className='ml-4'>
        <p className='text-sm text-gray-600'>{title}</p>
        <p className='text-2xl font-bold text-gray-900'>{value}</p>
        <p className={`text-sm ${subtitleColor}`}>{subtitle}</p>
      </div>
    </>
  );
};

export default StatCard;
