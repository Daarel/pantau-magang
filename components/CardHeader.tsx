import type { PropsWithChildren } from "react";

interface CardHeaderProps extends PropsWithChildren {
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

export default CardHeader;
