import * as React from "react"; // Importing React for component creation

import { cn } from "@/lib/utils"; // Utility function for class name merging and conditionals

/**
 * Props for the Textarea component.
 * Extends the default properties for an HTML `<textarea>` element.
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea component.
 *
 * A styled textarea component with support for custom styles and accessibility features.
 *
 * @param className - (Optional) Additional CSS classes to apply.
 * @param props - Other textarea attributes such as placeholder, value, onChange, etc.
 * @param ref - Reference to the textarea element.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Default styles for the textarea
          "flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className // Merge with any additional classes passed as props
        )}
        ref={ref} // Attach the ref to the textarea element
        {...props} // Spread additional properties like placeholder, value, onChange, etc.
      />
    );
  }
);

Textarea.displayName = "Textarea"; // Display name for the component

export { Textarea }; // Export the Textarea component for external use
