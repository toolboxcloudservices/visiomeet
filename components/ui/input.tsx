import * as React from "react"; // Importing React for creating components

import { cn } from "@/lib/utils"; // Utility function for class name merging and conditional logic

/**
 * Props for the Input component.
 *
 * Extends the default properties of an HTML `<input>` element.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input component.
 *
 * A reusable, styled input component that supports additional props and custom styles.
 *
 * @param className - Additional CSS classes for styling the input element.
 * @param type - The type of the input element (e.g., "text", "password", etc.).
 * @param props - Additional props passed to the input element, such as placeholder, value, onChange, etc.
 * @param ref - A ref to the input element for direct DOM access.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type} // Set the input type (e.g., "text", "email")
        className={cn(
          // Base styles for the input element
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className // Merge additional styles provided as props
        )}
        ref={ref} // Attach the ref to the input element
        {...props} // Spread additional properties like value, onChange, placeholder, etc.
      />
    );
  }
);

// Set a display name for better debugging and component identification
Input.displayName = "Input";

// Export the Input component for use in other parts of the application
export { Input };
