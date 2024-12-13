"use client"; // Indicates that this file is a client-side React component for Next.js

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover"; // Radix UI Popover primitives for managing popovers

import { cn } from "@/lib/utils"; // Utility for merging and managing class names

// Root component for the Popover
const Popover = PopoverPrimitive.Root;

// Trigger component for opening the Popover
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * PopoverContent component.
 *
 * Provides the content area for the Popover, with support for alignment, offset, and animations.
 * The content is rendered within a portal to avoid DOM hierarchy issues.
 *
 * @param className - Additional CSS classes to style the Popover content.
 * @param align - Alignment of the Popover (e.g., "center", "start", "end"). Defaults to "center".
 * @param sideOffset - Offset from the trigger element. Defaults to `4`.
 * @param props - Other properties to pass to the Popover content.
 * @param ref - Reference to the Popover content element.
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref} // Attach the ref to the content element
      align={align} // Set the alignment
      sideOffset={sideOffset} // Set the offset from the trigger element
      className={cn(
        // Base styles for the Popover content
        "z-50 w-72 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
        className // Merge with additional classes passed as props
      )}
      {...props} // Spread additional properties like style, onClick, etc.
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// Export components for use in other parts of the application
export { Popover, PopoverTrigger, PopoverContent };
