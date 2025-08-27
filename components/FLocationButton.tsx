import { Button } from "@/components/ui/button";
import { BiMap } from 'react-icons/bi';
import { cn } from "@/lib/utils";

interface LocationButtonProps {
  onClick: () => void;
  disabled: boolean;
  status: string;
  locationStatus: 'idle' | 'fetching' | 'success' | 'error' | 'approved';
  getLocationButtonText: () => string;
}

export const LocationButton = ({
  onClick,
  disabled,
  status,
  locationStatus,
  getLocationButtonText
}: LocationButtonProps) => {
  if (status !== "Hadir") return null;

  return (
    <div className="flex flex-col space-y-2">
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "w-full justify-between",
          locationStatus === 'approved' && "bg-green-50 text-green-700 border-green-200",
          locationStatus === 'success' && "bg-red-50 text-red-700 border-red-200"
        )}
      >
        <span className="font-normal text-black/60">{getLocationButtonText()}</span>
        <BiMap className="h-5 w-5 opacity-50" />
      </Button>
    </div>
  );
};