import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; // Hook to access user information provided by Clerk authentication
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'; // Stream.io video SDK components and hooks

/**
 * Custom hook to fetch and manage video calls for the current user.
 *
 * This hook:
 * - Retrieves video calls associated with the logged-in user.
 * - Categorizes calls into ended calls and upcoming calls based on their start and end times.
 * - Tracks the loading state during the data fetching process.
 *
 * @returns An object containing:
 * - `endedCalls`: List of calls that have ended or started in the past.
 * - `upcomingCalls`: List of calls scheduled for the future.
 * - `callRecordings`: Full list of calls retrieved.
 * - `isLoading`: Boolean indicating whether the data is still loading.
 */
export const useGetCalls = () => {
  const { user } = useUser(); // Access the current user's information
  const client = useStreamVideoClient(); // Access the Stream.io video client instance
  const [calls, setCalls] = useState<Call[]>(); // State to store the list of calls
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    /**
     * Fetches video calls associated with the current user.
     */
    const loadCalls = async () => {
      // Do nothing if the client or user ID is not available
      if (!client || !user?.id) return;

      setIsLoading(true); // Set loading state to true

      try {
        // Query video calls with specific sorting and filtering criteria
        // Reference: https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }], // Sort calls by start time in descending order
          filter_conditions: {
            starts_at: { $exists: true }, // Only include calls with a start time
            $or: [
              { created_by_user_id: user.id }, // Calls created by the user
              { members: { $in: [user.id] } }, // Calls where the user is a member
            ],
          },
        });

        setCalls(calls); // Update state with the retrieved calls
      } catch (error) {
        console.error(error); // Log any errors
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    loadCalls(); // Invoke the function to load calls
  }, [client, user?.id]); // Effect dependency array ensures it runs when `client` or `user.id` changes

  const now = new Date(); // Current date and time

  /**
   * Filters calls that have already ended or started in the past.
   */
  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  /**
   * Filters calls that are scheduled to start in the future.
   */
  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  // Return categorized calls and loading state
  return {
    endedCalls, // List of ended or past calls
    upcomingCalls, // List of future calls
    callRecordings: calls, // Complete list of retrieved calls
    isLoading, // Loading state
  };
};
