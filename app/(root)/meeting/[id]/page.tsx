'use client'; // Indicates this file is a client-side React component for Next.js

import { useState } from 'react'; // React hook for managing component state
import { useUser } from '@clerk/nextjs'; // Hook to access authenticated user data with Clerk
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'; // Components for video call and theming from Stream SDK
import { useParams } from 'next/navigation'; // Hook to get route parameters in Next.js
import { Loader } from 'lucide-react'; // Loader component for showing loading state

import { useGetCallById } from '@/hooks/useGetCallById'; // Custom hook to fetch call details by ID
import Alert from '@/components/Alert'; // Alert component for showing notifications or errors
import MeetingSetup from '@/components/MeetingSetup'; // Component for meeting setup (e.g., mic/cam settings)
import MeetingRoom from '@/components/MeetingRoom'; // Component for displaying the meeting room

/**
 * MeetingPage component.
 *
 * The main page for managing the meeting flow, including loading states,
 * setup screens, and the meeting room display.
 */
const MeetingPage = () => {
  const { id } = useParams(); // Get the meeting ID from the URL
  const { isLoaded, user } = useUser(); // Get the user data and loading state
  const { call, isCallLoading } = useGetCallById(id); // Fetch the call details using the custom hook
  const [isSetupComplete, setIsSetupComplete] = useState(false); // State to track if setup is complete

  // Show loader until user and call data are fully loaded
  if (!isLoaded || isCallLoading) return <Loader />;

  // Show an error message if the call is not found
  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  // Check if the user is allowed to join the meeting
  // Custom call type documentation: https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed =
    call.type === 'invited' &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  // Show an alert if the user is not allowed to join
  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  // Main meeting content
  return (
    <main className="h-screen w-full">
      {/* Wrap the call in Stream SDK components for video and theming */}
      <StreamCall call={call}>
        <StreamTheme>
          {/* Show the setup screen if setup is not complete, else show the meeting room */}
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage; // Export the MeetingPage component as default
