import Link from 'next/link'; // Next.js component for client-side navigation
import Image from 'next/image'; // Next.js component for optimized image rendering

import { Button } from './ui/button'; // Custom Button component
import { Card, CardContent } from './ui/card'; // Custom Card component for styled containers

/**
 * Props for the Alert component.
 *
 * @param title - The title or message to display in the alert.
 * @param iconUrl - (Optional) URL for the icon to display in the alert.
 */
interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

/**
 * Alert component.
 *
 * Displays a centered alert message with an optional icon and a button to navigate back home.
 *
 * @param title - The title or message to display in the alert.
 * @param iconUrl - (Optional) URL for the icon to display above the title.
 */
const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="flex-center h-screen w-full">
      {/* Card container for the alert */}
      <Card className="w-full max-w-[520px] border-none bg-dark-1 p-6 py-9 text-white">
        <CardContent>
          <div className="flex flex-col gap-9">
            {/* Icon and title section */}
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex-center">
                  {/* Icon image */}
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
              {/* Alert title */}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            {/* Button to navigate back to home */}
            <Button asChild className="bg-blue-1">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert; // Export the Alert component for use in other parts of the application
