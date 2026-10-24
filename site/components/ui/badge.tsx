import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[3px] border px-1.5 py-px text-[0.78rem] font-semibold leading-snug whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-ink bg-ink text-paper",
        outline: "border-ink text-ink",
        dashed: "border-dashed border-ink text-ink",
        muted: "border-transparent bg-hairline text-ink",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
