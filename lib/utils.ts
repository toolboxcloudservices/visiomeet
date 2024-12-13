import { type ClassValue, clsx } from 'clsx'; // Importing 'clsx' for conditional class name concatenation and the ClassValue type
import { twMerge } from 'tailwind-merge'; // Importing 'twMerge' to handle Tailwind CSS class merging

/**
 * Utility function to merge class names.
 *
 * @param inputs - A list of class names or conditional class name expressions.
 * @returns A single merged and deduplicated string of class names.
 *
 * This function uses:
 * - `clsx` to handle conditional and dynamic class name logic.
 * - `twMerge` to resolve conflicts in Tailwind CSS classes (e.g., if multiple conflicting classes like `bg-red-500` and `bg-blue-500` are present, it will keep only the last one).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Combines inputs using `clsx` and resolves Tailwind CSS class conflicts using `twMerge`.
}
