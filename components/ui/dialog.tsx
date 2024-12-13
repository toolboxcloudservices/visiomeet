'use client'; // Indicates that this file is a client-side React component for Next.js

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog'; // Radix UI primitives for accessible dialog components
import { X } from 'lucide-react'; // Icon for the close button

import { cn } from '@/lib/utils'; // Utility for merging and managing class names

// Root component for the Dialog
const Dialog = DialogPrimitive.Root;

// Trigger component for opening the Dialog
const DialogTrigger = DialogPrimitive.Trigger;

// Portal for rendering the dialog outside of the main DOM hierarchy
const DialogPortal = DialogPrimitive.Portal;

// Close component for dismissing the Dialog
const DialogClose = DialogPrimitive.Close;

/**
 * Overlay component.
 *
 * The background overlay for the Dialog, with animations and customizable styles.
 *
 * @param className - Additional CSS classes for styling the overlay.
 * @param props - Other properties passed to the overlay.
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed glassmorphism2 inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Content component.
 *
 * The main content area of the Dialog, with support for animations, focus management, and customizable styles.
 *
 * @param className - Additional CSS classes for styling the content.
 * @param children - The content of the Dialog.
 * @param props - Other properties passed to the content.
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay /> {/* Overlay for the dialog */}
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl dark:border-slate-800 dark:bg-slate-950',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400"
      >
        <X className="size-6" /> {/* Close icon */}
        <span className="sr-only">Close</span> {/* Screen reader text */}
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Header component.
 *
 * A section for the Dialog header, typically used for titles and descriptions.
 *
 * @param className - Additional CSS classes for styling the header.
 * @param props - Other properties passed to the header.
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

/**
 * Footer component.
 *
 * A section for the Dialog footer, typically used for actions such as buttons.
 *
 * @param className - Additional CSS classes for styling the footer.
 * @param props - Other properties passed to the footer.
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

/**
 * Title component.
 *
 * Used to display the title of the Dialog.
 *
 * @param className - Additional CSS classes for styling the title.
 * @param props - Other properties passed to the title.
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * Description component.
 *
 * Used to display a description or additional details about the Dialog.
 *
 * @param className - Additional CSS classes for styling the description.
 * @param props - Other properties passed to the description.
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Export all Dialog components for use in other parts of the application
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
