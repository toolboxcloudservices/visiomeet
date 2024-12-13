import { Metadata } from 'next'; // Import Metadata type for defining page metadata
import { ReactNode } from 'react'; // Import ReactNode type for defining children props

import Navbar from '@/components/Navbar'; // Import the Navbar component
import Sidebar from '@/components/Sidebar'; // Import the Sidebar component

/**
 * Page metadata for the application.
 *
 * Defines the title and description for the app.
 */
export const metadata: Metadata = {
  title: 'VisioMeet', // Title of the app
  description: 'A workspace for your team, powered by Stream Chat and Clerk.', // Description of the app
};

/**
 * RootLayout component.
 *
 * Defines the main layout structure for the application, including the Navbar, Sidebar, and main content area.
 *
 * @param children - The content to be rendered inside the layout.
 */
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="relative">
      {/* Top navigation bar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar for navigation or additional options */}
        <Sidebar />

        {/* Main content section */}
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div> {/* Render the children content */}
        </section>
      </div>
    </main>
  );
};

export default RootLayout; // Export the RootLayout component as the default export
