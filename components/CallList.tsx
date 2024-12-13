'use client'; // Indicates that this file is a client-side React component for Next.js

import { Call, CallRecording } from '@stream-io/video-react-sdk'; // Stream.io video SDK types for calls and recordings

import Loader from './Loader'; // Loader component for displaying a loading state
import { useGetCalls } from '@/hooks/useGetCalls'; // Custom hook for fetching call data
import MeetingCard from './MeetingCard'; // Component for displaying individual meeting details
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Hook for navigation in Next.js

/**
 * CallList component.
 *
 * Displays a list of calls (ended, upcoming, or recordings) based on the `type` prop.
 * Fetches and handles data dynamically for the selected type of calls.
 *
 * @param type - Specifies the type of calls to display ('ended', 'upcoming', or 'recordings').
 */
const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter(); // Router instance for navigation
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls(); // Fetch call data using a custom hook
  const [recordings, setRecordings] = useState<CallRecording[]>([]); // State to store meeting recordings

  /**
   * Determines which calls to display based on the `type` prop.
   */
  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  /**
   * Provides a message to display when there are no calls of the selected type.
   */
  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  /**
   * Fetches call recordings when the `type` is 'recordings'.
   */
  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [], // Fetch recordings for each call
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0) // Filter calls with recordings
        .flatMap((call) => call.recordings); // Flatten the recordings array

      setRecordings(recordings); // Update the recordings state
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]); // Re-run effect when `type` or `callRecordings` changes

  if (isLoading) return <Loader />; // Show loader if data is still being fetched

  const calls = getCalls(); // Get the list of calls to display
  const noCallsMessage = getNoCallsMessage(); // Get the appropriate "no calls" message

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        // Render a MeetingCard for each call or recording
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id} // Unique key for each meeting
            icon={
              type === 'ended'
                ? '/icons/previous.svg' // Icon for ended meetings
                : type === 'upcoming'
                ? '/icons/upcoming.svg' // Icon for upcoming meetings
                : '/icons/recordings.svg' // Icon for recordings
            }
            title={
              (meeting as Call).state?.custom?.description || // Meeting description
              (meeting as CallRecording).filename?.substring(0, 20) || // Recording filename (truncated)
              'No Description' // Default description
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() || // Meeting start date
              (meeting as CallRecording).start_time?.toLocaleString() // Recording start time
            }
            isPreviousMeeting={type === 'ended'} // Indicates if it's a previous meeting
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url // Link to recording playback
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}` // Link to meeting page
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined} // Icon for playback button
            buttonText={type === 'recordings' ? 'Play' : 'Start'} // Button text
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`) // Handle playback for recordings
                : () => router.push(`/meeting/${(meeting as Call).id}`) // Handle navigation to meeting page
            }
          />
        ))
      ) : (
        // Display message if no calls are available
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList; // Export the CallList component for use in other parts of the application
