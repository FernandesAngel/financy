import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-green-100 text-primary hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        defaultGreen:
          "border-transparent bg-green-100 text-primary hover:bg-primary/80",
        defaultBlue:
          "border-transparent bg-blue-100 text-blue-800 hover:bg-primary/80",
        defaultPurple:
          "border-transparent bg-purple-100 text-purple-700 hover:bg-primary/80",
        defaultPink:
          "border-transparent bg-pink-100 text-pink-500 hover:bg-primary/80",
        defaultRed:
          "border-transparent bg-red-100 text-red-600 hover:bg-primary/80",
        defaultOrange:
          "border-transparent bg-orange-100 text-orange-600 hover:bg-primary/80",
        defaultYellow:
          "border-transparent bg-yellow-100 text-yellow-700 hover:bg-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
