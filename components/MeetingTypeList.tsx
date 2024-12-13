/* eslint-disable camelcase */
'use client'; // Indicates that this file is a client-side React component for Next.js

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Hook to handle navigation

import HomeCard from './HomeCard'; // Component for displaying a card-like UI for actions
import MeetingModal from './MeetingModal'; // Component for displaying modals for different meeting actions
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'; // Stream.io video SDK for managing calls
import { useUser } from '@clerk/nextjs'; // Clerk authentication hook for accessing user data
import Loader from './Loader'; // Loader component for displaying a loading state
import { Textarea } from './ui/textarea'; // Custom Textarea component for user input
import ReactDatePicker from 'react-datepicker'; // Date picker component for scheduling meetings
import { useToast } from './ui/use-toast'; // Hook to show toast notifications
import { Input } from './ui/input'; // Custom Input component for text input

// Initial values for meeting creation inputs
const initialValues = {
  dateTime: new Date(), // Default to the current date and time
  description: '', // Empty description by default
  link: '', // Empty link for joining meetings
};

/**
 * MeetingTypeList component.
 *
 * Provides a grid layout for different meeting actions (e.g., starting, joining, scheduling meetings).
 * Uses modals to handle user input for creating or joining meetings.
 */
const MeetingTypeList = () => {
  const router = useRouter(); // Router instance for navigation
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined); // Tracks the current action state
  const [values, setValues] = useState(initialValues); // State for user inputs
  const [callDetail, setCallDetail] = useState<Call>(); // Stores details of the created call
  const client = useStreamVideoClient(); // Stream.io video client instance
  const { user } = useUser(); // Access the authenticated user
  const { toast } = useToast(); // Toast notifications instance

  /**
   * Handles meeting creation logic.
   * Validates user inputs, creates a new meeting, and updates the state with meeting details.
   */
  const createMeeting = async () => {
    if (!client || !user) return; // Ensure client and user are available

    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' }); // Notify user to select a date/time
        return;
      }

      const id = crypto.randomUUID(); // Generate a unique ID for the meeting
      const call = client.call('default', id); // Create a call instance
      if (!call) throw new Error('Failed to create meeting'); // Handle call creation failure

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString(); // Use the selected or current time
      const description = values.description || 'Instant Meeting'; // Default description for instant meetings

      // Create or retrieve the call with additional data
      await call.getOrCreate({
        data: {
          starts_at: startsAt, // Meeting start time
          custom: {
            description, // Custom description for the meeting
          },
        },
      });

      setCallDetail(call); // Update state with the created call details

      if (!values.description) {
        router.push(`/meeting/${call.id}`); // Navigate to the meeting page
      }

      toast({ title: 'Meeting Created' }); // Notify user of success
    } catch (error) {
      console.error(error); // Log errors
      toast({ title: 'Failed to create Meeting' }); // Notify user of failure
    }
  };

  if (!client || !user) return <Loader />; // Show loader if client or user is unavailable

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`; // Construct the meeting link

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* Home cards for different meeting actions */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />

      {/* Modals for creating, joining, and starting meetings */}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          {/* Description input */}
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          {/* Date and time picker */}
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink); // Copy meeting link to clipboard
            toast({ title: 'Link Copied' }); // Notify user of success
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      {/* Modal for joining a meeting */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      {/* Modal for starting an instant meeting */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList; // Export the MeetingTypeList component for use in other parts of the application
