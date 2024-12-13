'use client'; // Indicates that this file is a client-side React component for Next.js

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'; // Stream.io video SDK hooks for managing calls and call state

import { Button } from './ui/button'; // Custom Button component
import { useRouter } from 'next/navigation'; // Hook for navigation in Next.js

/**
 * EndCallButton component.
 *
 * Provides a button to end the current call.
 * This button is only visible to the meeting owner.
 */
const EndCallButton = () => {
  const call = useCall(); // Access the current call instance
  const router = useRouter(); // Router instance for navigation

  // Ensure that the component is used within a valid call context
  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.', // Error message if not used within a valid context
    );

  const { useLocalParticipant } = useCallStateHooks(); // Hook to access the local participant's call state
  const localParticipant = useLocalParticipant(); // Get the current local participant

  // Check if the local participant is the meeting owner
  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy && // Ensure the call has a creator
    localParticipant.userId === call.state.createdBy.id; // Compare local participant's user ID with the creator's ID

  // Return nothing if the user is not the meeting owner
  if (!isMeetingOwner) return null;

  /**
   * Ends the current call and navigates back to the home page.
   */
  const endCall = async () => {
    await call.endCall(); // End the call for all participants
    router.push('/'); // Redirect to the home page
  };

  return (
    <Button onClick={endCall} className="bg-red-500">
      End call for everyone {/* Button label */}
    </Button>
  );
};

export default EndCallButton; // Export the EndCallButton component for use in other parts of the application
