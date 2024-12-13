'use client'; // Indicates that this file is a client-side React component for Next.js

import { useState } from 'react';
import {
  CallControls, // Component for displaying call control buttons (e.g., mute, leave)
  CallParticipantsList, // Component to display a list of participants in the call
  CallStatsButton, // Component for displaying call statistics
  CallingState, // Enum for different states of a call
  PaginatedGridLayout, // Grid layout for displaying call participants
  SpeakerLayout, // Layout for speaker-focused views
  useCallStateHooks, // Hook to access the current call state
} from '@stream-io/video-react-sdk';

import { useRouter, useSearchParams } from 'next/navigation'; // Next.js hooks for navigation and URL search parameters
import { Users, LayoutList } from 'lucide-react'; // Icons from Lucide React

import {
  DropdownMenu, // Component for dropdown menus
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader'; // Loader component to indicate loading states
import EndCallButton from './EndCallButton'; // Component for ending the call
import { cn } from '@/lib/utils'; // Utility function for class name merging

// Type definition for the call layout
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

/**
 * MeetingRoom component.
 *
 * Provides the main interface for the video meeting room.
 * Includes layouts for participants, controls, and functionality to toggle between different views.
 */
const MeetingRoom = () => {
  const searchParams = useSearchParams(); // Access URL search parameters
  const isPersonalRoom = !!searchParams.get('personal'); // Determine if it's a personal meeting room
  const router = useRouter(); // Router instance for navigation
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left'); // State to manage the current layout
  const [showParticipants, setShowParticipants] = useState(false); // State to toggle the participants list
  const { useCallCallingState } = useCallStateHooks(); // Hook to access the call state
  const callingState = useCallCallingState(); // Get the current calling state

  // Render a loader until the user has joined the call
  if (callingState !== CallingState.JOINED) return <Loader />;

  /**
   * Determines the layout to display based on the selected layout state.
   */
  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />; // Grid layout for participants
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />; // Speaker layout with participants bar on the left
      default:
        return <SpeakerLayout participantsBarPosition="right" />; // Speaker layout with participants bar on the right
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      {/* Main video layout */}
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout /> {/* Render the selected call layout */}
        </div>
        {/* Participants list */}
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            'show-block': showParticipants, // Show or hide participants list
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Call controls and layout options */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/`)} /> {/* Call control buttons */}

        {/* Dropdown menu for selecting layouts */}
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" /> {/* Icon for layout options */}
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType) // Set the selected layout
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton /> {/* Button to display call statistics */}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" /> {/* Icon for participants list */}
          </div>
        </button>

        {/* End call button (only displayed if not in a personal room) */}
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom; // Export the MeetingRoom component for use in other parts of the application
