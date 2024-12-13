'use client'; // Indicates that this file is a client-side React component for Next.js

import Image from 'next/image'; // Next.js component for optimized image rendering

import { cn } from '@/lib/utils'; // Utility function for conditional class names

/**
 * Props for the HomeCard component.
 *
 * @param className - (Optional) Additional CSS classes for the card.
 * @param img - URL of the image to display on the card.
 * @param title - Title text to display on the card.
 * @param description - Description text to display on the card.
 * @param handleClick - (Optional) Function to handle click events on the card.
 */
interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

/**
 * HomeCard component.
 *
 * Displays a clickable card with an image, title, and description.
 * Designed for home page actions like starting or scheduling meetings.
 */
const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', // Base styles for the card
        className // Additional styles passed as props
      )}
      onClick={handleClick} // Handle click event if provided
    >
      {/* Icon container */}
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt="meeting" width={27} height={27} /> {/* Card image */}
      </div>

      {/* Title and description */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1> {/* Card title */}
        <p className="text-lg font-normal">{description}</p> {/* Card description */}
      </div>
    </section>
  );
};

export default HomeCard; // Export the HomeCard component for use in other parts of the application
