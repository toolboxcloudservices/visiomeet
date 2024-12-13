import Image from 'next/image'; // Next.js component for optimized image rendering
import Link from 'next/link'; // Next.js component for client-side navigation
import { SignedIn, UserButton } from '@clerk/nextjs'; // Clerk components for managing user authentication and sign-out functionality

import MobileNav from './MobileNav'; // Component for mobile navigation

/**
 * Navbar component.
 *
 * Displays a fixed navigation bar with a logo, site name, user authentication options, and mobile navigation.
 */
const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      {/* Logo and site name */}
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg" // Path to the logo image
          width={32} // Logo width in pixels
          height={32} // Logo height in pixels
          alt="VisioMeet logo" // Alternative text for accessibility
          className="max-sm:size-10" // Responsive size adjustment for smaller screens
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          VisioMeet {/* Site name displayed only on larger screens */}
        </p>
      </Link>

      {/* User authentication and mobile navigation */}
      <div className="flex-between gap-5">
        <SignedIn>
          {/* Display the user button when the user is signed in */}
          <UserButton afterSignOutUrl="/sign-in" /> {/* Button for user account actions and sign-out */}
        </SignedIn>

        {/* Mobile navigation menu */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar; // Export the Navbar component for use in other parts of the application
