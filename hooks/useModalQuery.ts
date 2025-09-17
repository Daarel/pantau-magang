import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function useModalQuery(paramName: string = "modal") {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const modal = searchParams?.get(paramName);
    setOpen(modal === "open");
  }, [searchParams, paramName]);

  const handleOpenChange = (newVal: boolean) => {
    setOpen(newVal);

    if (newVal) {
      router.replace(`${pathname}?${paramName}=open`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(paramName);
      const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(next);
    }
  };

  const toggleModal = () => handleOpenChange(!open);

  return { open, toggleModal, setOpen, handleOpenChange };
}
