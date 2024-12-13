'use client'; // Indicates that this file is a client-side React component for Next.js

import { useEffect, useState } from 'react';
import {
  DeviceSettings, // Component to manage device settings like mic and camera
  VideoPreview, // Component to preview the video feed before joining a call
  useCall, // Hook to access the current call instance
  useCallStateHooks, // Hook to access call state properties
} from '@stream-io/video-react-sdk';

import Alert from './Alert'; // Custom Alert component for displaying notifications
import { Button } from './ui/button'; // Custom Button component

/**
 * MeetingSetup component.
 *
 * Provides a setup interface for participants to prepare for a video call.
 * Includes video preview, device settings, and mic/camera toggles.
 * Handles scenarios where the call hasn't started or has already ended.
 *
 * @param setIsSetupComplete - Callback function to indicate when the setup process is complete.
 */
const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // Hooks to access call state details
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt(); // Call start time
  const callEndedAt = useCallEndedAt(); // Call end time
  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date(); // Check if the call start time is in the future
  const callHasEnded = !!callEndedAt; // Check if the call has already ended

  const call = useCall(); // Access the current call instance

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.', // Error message for invalid context usage
    );
  }

  // State to manage mic and camera toggle
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  // Effect to enable or disable mic and camera based on toggle state
  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable(); // Disable camera
      call.microphone.disable(); // Disable microphone
    } else {
      call.camera.enable(); // Enable camera
      call.microphone.enable(); // Enable microphone
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  // Display an alert if the call time has not arrived
  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  // Display an alert if the call has ended
  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      {/* Setup heading */}
      <h1 className="text-center text-2xl font-bold">Setup</h1>

      {/* Video preview component */}
      <VideoPreview />

      {/* Device settings and mic/camera toggle */}
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)} // Update toggle state
          />
          Join with mic and camera off
        </label>
        <DeviceSettings /> {/* Component to manage device settings */}
      </div>

      {/* Join meeting button */}
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join(); // Join the call
          setIsSetupComplete(true); // Indicate setup completion
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup; // Export the MeetingSetup component for use in other parts of the application
