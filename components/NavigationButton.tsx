"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ComponentProps, FC, PropsWithChildren } from "react";

type ButtonProps = ComponentProps<typeof Button>;

interface NavigationButtonProps extends PropsWithChildren, ButtonProps {
  href: string;
}

const NavigationButton: FC<NavigationButtonProps> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();

  return (
    <Button {...props} onClick={() => router.push(href)}>
      {children}
    </Button>
  );
};

export default NavigationButton;
