import { ReactNode } from "react";

export interface ButtonProps {
  classNames: string[];
  value: ReactNode | string | number;
  type?: "button" | "reset" | "submit";
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface FlexContainerProps {
  direction?: string;
  justify?: string;
  align?: string;
  gap?: string;
}

export interface FlexItemProps {
  flex: string;
}

export interface ToggleListProps {
  options: {
    name: string;
    callback: () => void;
  }[];
}
