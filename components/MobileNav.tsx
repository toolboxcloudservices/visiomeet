'use client'; // Indicates that this file is a client-side React component for Next.js

import Image from 'next/image'; // Next.js component for optimized image rendering
import Link from 'next/link'; // Next.js component for client-side navigation
import { usePathname } from 'next/navigation'; // Hook to access the current pathname in Next.js

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Components for creating a mobile navigation drawer
import { sidebarLinks } from '@/constants'; // List of links to display in the navigation menu
import { cn } from '@/lib/utils'; // Utility function for class name merging and conditionals

/**
 * MobileNav component.
 *
 * Provides a collapsible navigation menu for mobile devices.
 * Uses a sliding drawer (`Sheet`) to display links and highlight the active route.
 */
const MobileNav = () => {
  const pathname = usePathname(); // Retrieve the current route's pathname

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        {/* Trigger button to open the navigation drawer */}
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg" // Path to the hamburger icon
            width={36} // Icon width in pixels
            height={36} // Icon height in pixels
            alt="hamburger icon" // Alternative text for accessibility
            className="cursor-pointer sm:hidden" // Hidden on larger screens
          />
        </SheetTrigger>

        {/* Sliding drawer content */}
        <SheetContent side="left" className="border-none bg-dark-1">
          {/* Logo and site name */}
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg" // Path to the logo image
              width={32} // Logo width in pixels
              height={32} // Logo height in pixels
              alt="VisioMeet logo" // Alternative text for accessibility
            />
            <p className="text-[26px] font-extrabold text-white">VisioMeet</p>
          </Link>

          {/* Navigation links */}
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  // Check if the current link is active
                  const isActive = pathname === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route} // Navigation route for the link
                        key={item.label} // Unique key for each link
                        className={cn(
                          'flex gap-4 items-center p-4 rounded-lg w-full max-w-60', // Base styles for the link
                          {
                            'bg-blue-1': isActive, // Highlight the link if it is active
                          }
                        )}
                      >
                        <Image
                          src={item.imgURL} // Icon URL for the link
                          alt={item.label} // Alternative text for accessibility
                          width={20} // Icon width in pixels
                          height={20} // Icon height in pixels
                        />
                        <p className="font-semibold">{item.label}</p> {/* Label for the link */}
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav; // Export the MobileNav component for use in other parts of the application
