import * as React from 'react'; // Import React for creating components
import { Slot } from '@radix-ui/react-slot'; // Radix UI Slot for wrapping custom components
import { cva, type VariantProps } from 'class-variance-authority'; // Utility for creating and managing class name variants

import { cn } from '@/lib/utils'; // Utility for merging and managing class names

/**
 * `buttonVariants` defines a set of styles for buttons using `cva`.
 *
 * Includes variants for different button types (`variant`) and sizes (`size`),
 * with default styles and transitions for accessibility and responsiveness.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-slate-900 text-slate-50 hover:bg-slate-800/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        outline:
          'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost:
          'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default', // Default button style
      size: 'default', // Default button size
    },
  }
);

/**
 * Props for the `Button` component.
 *
 * Extends the default HTML button attributes and includes variant props for customizing appearance and size.
 *
 * @param asChild - If `true`, the button wraps a custom child component (using `Slot`).
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Optional flag to use a custom child component
}

/**
 * Button component.
 *
 * A flexible and reusable button component with support for multiple variants and sizes.
 *
 * @param className - Additional CSS classes for styling.
 * @param variant - Variant of the button (e.g., `default`, `destructive`, `outline`).
 * @param size - Size of the button (e.g., `default`, `sm`, `lg`, `icon`).
 * @param asChild - If `true`, wraps a custom child component (uses `Slot`).
 * @param props - Other HTML button attributes.
 * @param ref - Ref for the button element.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'; // Use `Slot` for custom child or `button` by default
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Apply styles based on variants and class names
        ref={ref} // Forward ref to the underlying element
        {...props} // Spread additional props
      />
    );
  }
);
Button.displayName = 'Button'; // Display name for debugging

// Export the Button component and its variants for external use
export { Button, buttonVariants };
