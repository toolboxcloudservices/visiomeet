import * as React from "react"; // Import React for creating components

import { cn } from "@/lib/utils"; // Utility for managing and merging class names

/**
 * Card component.
 *
 * A container with rounded corners, border, and background styling, designed to group related content.
 *
 * @param className - Additional CSS classes for styling the card.
 * @param props - Other HTML attributes passed to the card.
 * @param ref - Ref for the card element.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card"; // Display name for debugging

/**
 * CardHeader component.
 *
 * A header section within the Card, typically for displaying titles or key information.
 *
 * @param className - Additional CSS classes for styling the header.
 * @param props - Other HTML attributes passed to the header.
 * @param ref - Ref for the header element.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader"; // Display name for debugging

/**
 * CardTitle component.
 *
 * A heading element for the Card, used to display the main title.
 *
 * @param className - Additional CSS classes for styling the title.
 * @param props - Other HTML attributes passed to the title.
 * @param ref - Ref for the title element.
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle"; // Display name for debugging

/**
 * CardDescription component.
 *
 * A paragraph element for displaying additional details or descriptions within the Card.
 *
 * @param className - Additional CSS classes for styling the description.
 * @param props - Other HTML attributes passed to the description.
 * @param ref - Ref for the description element.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription"; // Display name for debugging

/**
 * CardContent component.
 *
 * The main content area of the Card, where most of the information or components are displayed.
 *
 * @param className - Additional CSS classes for styling the content.
 * @param props - Other HTML attributes passed to the content.
 * @param ref - Ref for the content element.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent"; // Display name for debugging

/**
 * CardFooter component.
 *
 * A footer section within the Card, typically used for actions or summary information.
 *
 * @param className - Additional CSS classes for styling the footer.
 * @param props - Other HTML attributes passed to the footer.
 * @param ref - Ref for the footer element.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter"; // Display name for debugging

// Export all Card-related components for use in other parts of the application
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
