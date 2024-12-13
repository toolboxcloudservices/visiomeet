'use client'; // Indicates that this file is a client-side React component for Next.js

import Image from 'next/image'; // Next.js component for optimized image rendering
import Link from 'next/link'; // Next.js component for client-side navigation
import { usePathname } from 'next/navigation'; // Hook to access the current pathname in Next.js

import { sidebarLinks } from '@/constants'; // List of links to display in the sidebar
import { cn } from '@/lib/utils'; // Utility function for class name merging and conditionals

/**
 * Sidebar component.
 *
 * Displays a vertical navigation menu with links and icons. Highlights the active link based on the current route.
 */
const Sidebar = () => {
  const pathname = usePathname(); // Retrieve the current route's pathname

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      {/* Container for navigation links */}
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          // Check if the current link is active (exact match or starts with the route)
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route} // Navigation route for the link
              key={item.label} // Unique key for each link
              className={cn(
                'flex gap-4 items-center p-4 rounded-lg justify-start', // Base styles for the link
                {
                  'bg-blue-1': isActive, // Highlight the link if it is active
                }
              )}
            >
              <Image
                src={item.imgURL} // Icon URL for the link
                alt={item.label} // Alternative text for accessibility
                width={24} // Icon width
                height={24} // Icon height
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {item.label} {/* Label for the link */}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar; // Export the Sidebar component for use in other parts of the application
