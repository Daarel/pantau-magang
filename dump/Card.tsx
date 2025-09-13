import type { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
  padding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = true,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${
        padding ? "p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends PropsWithChildren {
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={className}>{children}</div>;
};

interface CardHeaderProps extends PropsWithChildren {
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

interface CardTitleProps extends PropsWithChildren {
  className?: string;
}
const CardTitle: React.FC<CardTitleProps> = ({ children, className = "" }) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

export { CardTitle, CardHeader, CardContent, Card };
