"use client"; // Indicates that this file is a client-side React component for Next.js

import {
  Toast, // Component for an individual toast
  ToastClose, // Component for the close button of a toast
  ToastDescription, // Component for the description text of a toast
  ToastProvider, // Provider component to manage toast state
  ToastTitle, // Component for the title of a toast
  ToastViewport, // Component for rendering the toast viewport
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast"; // Custom hook for accessing and managing toasts

/**
 * Toaster component.
 *
 * Renders a list of toasts based on the current toast state.
 * Includes styling and accessibility features for toasts.
 */
export function Toaster() {
  const { toasts } = useToast(); // Access the current list of toasts

  return (
    <ToastProvider>
      {/* Render each toast in the toasts array */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id} // Unique key for each toast
            {...props} // Pass additional props to the Toast component
            className="border-none bg-dark-1 text-white" // Custom styles for the toast
          >
            {/* Content of the toast */}
            <div className="grid gap-1">
              {/* Render the title if provided */}
              {title && <ToastTitle>{title}</ToastTitle>}
              {/* Render the description if provided */}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {/* Render the action element if provided */}
            {action}
            {/* Close button for the toast */}
            <ToastClose />
          </Toast>
        );
      })}
      {/* Toast viewport for positioning and managing toast layout */}
      <ToastViewport />
    </ToastProvider>
  );
}
