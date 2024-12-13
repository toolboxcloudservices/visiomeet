"use client"; // Indicates that this file is a client-side React component for Next.js

import Image from "next/image"; // Next.js component for optimized image rendering

import { cn } from "@/lib/utils"; // Utility function for conditional class names
import { Button } from "./ui/button"; // Custom Button component
import { avatarImages } from "@/constants"; // Array of avatar images for displaying attendees
import { useToast } from "./ui/use-toast"; // Hook for displaying toast notifications

/**
 * Props for the MeetingCard component.
 *
 * @param title - Title of the meeting.
 * @param date - Date and time of the meeting.
 * @param icon - URL of the icon to display for the meeting.
 * @param isPreviousMeeting - (Optional) Indicates if the meeting has already occurred.
 * @param buttonIcon1 - (Optional) URL of the icon for the primary button.
 * @param buttonText - (Optional) Text for the primary button.
 * @param handleClick - Function to handle the primary button click event.
 * @param link - Meeting link for sharing or copying.
 */
interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

/**
 * MeetingCard component.
 *
 * Displays information about a meeting, including title, date, and attendees.
 * Includes buttons for starting or sharing the meeting link.
 */
const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast(); // Hook for displaying toast notifications

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      {/* Meeting information */}
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} /> {/* Meeting icon */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1> {/* Meeting title */}
            <p className="text-base font-normal">{date}</p> {/* Meeting date and time */}
          </div>
        </div>
      </article>

      {/* Attendees and action buttons */}
      <article className={cn("flex justify-center relative", {})}>
        {/* Attendee avatars */}
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          {/* Additional attendee count */}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>

        {/* Action buttons */}
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            {/* Primary action button */}
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>

            {/* Copy link button */}
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link); // Copy the meeting link to clipboard
                toast({
                  title: "Link Copied", // Display toast notification
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard; // Export the MeetingCard component for use in other parts of the application
