import type { PropsWithChildren } from "react";

interface CardContentProps extends PropsWithChildren {
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={className}>{children}</div>;
};

export default CardContent;
