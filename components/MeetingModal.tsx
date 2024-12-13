"use client"; // Indicates that this file is a client-side React component for Next.js

import { ReactNode } from "react";
import { Dialog, DialogContent } from "./ui/dialog"; // Dialog components for modal UI
import { cn } from "@/lib/utils"; // Utility function for conditional class names
import { Button } from "./ui/button"; // Custom Button component
import Image from "next/image"; // Next.js component for optimized image rendering

/**
 * Props for the MeetingModal component.
 *
 * @param isOpen - Determines if the modal is open.
 * @param onClose - Callback function to close the modal.
 * @param title - Title text displayed at the top of the modal.
 * @param className - (Optional) Additional CSS classes for the title.
 * @param children - (Optional) Additional content to render inside the modal.
 * @param handleClick - (Optional) Callback function for the button click event.
 * @param buttonText - (Optional) Text displayed on the button.
 * @param instantMeeting - (Optional) Indicates if the modal is for an instant meeting.
 * @param image - (Optional) URL of an image to display at the top of the modal.
 * @param buttonClassName - (Optional) Additional CSS classes for the button.
 * @param buttonIcon - (Optional) URL of an icon to display inside the button.
 */
interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

/**
 * MeetingModal component.
 *
 * A reusable modal component designed for meeting-related interactions.
 *
 * @param props - MeetingModalProps containing configurations for the modal.
 */
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* DialogContent contains the modal content */}
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {/* Optional image displayed at the top of the modal */}
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          {/* Modal title */}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {/* Optional child elements passed into the modal */}
          {children}
          {/* Action button */}
          <Button
            className={cn(
              "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0",
              buttonClassName
            )}
            onClick={handleClick}
          >
            {/* Optional button icon */}
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"} {/* Default button text */}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal; // Export the MeetingModal component for use in other parts of the application
