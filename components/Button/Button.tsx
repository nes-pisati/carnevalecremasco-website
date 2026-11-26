import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon/Icon";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "light" | "blue" | "surface" | "dim";

type CommonProps = {
  variant?: ButtonVariant;
  icon?: IconName;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps> & {
    href: string;
  };

type ActionButtonProps = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function buttonClassName(variant: ButtonVariant = "primary", className?: string): string {
  return [styles.button, styles[variant], className].filter(Boolean).join(" ");
}

export function Button({ variant = "primary", icon, children, className, ...rest }: ButtonProps) {
  const classes = buttonClassName(variant, className);
  const content = (
    <>
      {icon && <Icon name={icon} size={20} />}
      {children}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <Link {...rest} className={classes}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest;
  return (
    <button {...buttonProps} type={type} className={classes}>
      {content}
    </button>
  );
}
