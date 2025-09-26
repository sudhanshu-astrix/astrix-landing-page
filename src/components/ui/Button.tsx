import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "nav" | "solid" | "outline";
type ButtonSize = "sm" | "md";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonAsButton | ButtonAsLink;

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function baseClasses(variant: ButtonVariant, size: ButtonSize) {
  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
  };

  const variants: Record<ButtonVariant, string> = {
    // Rounded pill, subtle border, translucent bg as seen in nav links
    nav: "rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors",
    // Solid primary (white) CTA
    solid: "rounded-lg bg-white text-gray-900 hover:bg-gray-100",
    // Outline white CTA
    outline: "rounded-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900",
  };

  // Inset top shadow + centered content baseline classes
  const common = "relative overflow-hidden text-center inline-flex items-center justify-center leading-none select-none shadow-[inset_0_8px_16px_rgba(255,255,255,0.12)]";

  return cn("font-nohemi400", common, sizes[size], variants[variant]);
}

export default function Button(props: Props) {
  const { children, className, variant = "solid", size = "md", href, ...rest } = props as Props & {
    href?: string;
  };

  const classes = cn(baseClasses(variant, size), className);

  if (href) {
    return (
      <Link href={href} className={`pt-3 ${classes}`} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`pt-3 ${classes}`} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}


