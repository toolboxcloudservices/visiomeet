import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'; // Stream.io video SDK components and hooks

/**
 * Custom hook to fetch a specific call by its ID.
 *
 * This hook:
 * - Retrieves a video call by its unique ID.
 * - Tracks the loading state during the data fetching process.
 *
 * @param id - The ID of the call to retrieve. Can be a string or an array of strings.
 * @returns An object containing:
 * - `call`: The retrieved call object, or `undefined` if not found.
 * - `isCallLoading`: Boolean indicating whether the call data is still loading.
 */
export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>(); // State to store the fetched call
  const [isCallLoading, setIsCallLoading] = useState(true); // State to track loading status

  const client = useStreamVideoClient(); // Access the Stream.io video client instance

  useEffect(() => {
    // Do nothing if the client is not available
    if (!client) return;

    /**
     * Fetches a video call by its ID.
     */
    const loadCall = async () => {
      try {
        // Query the call using the provided ID
        // Reference: https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          filter_conditions: { id }, // Filter condition to match the specific call ID
        });

        // If a call is found, update the state with the first result
        if (calls.length > 0) setCall(calls[0]);

        setIsCallLoading(false); // Set loading state to false
      } catch (error) {
        console.error(error); // Log any errors
        setIsCallLoading(false); // Ensure loading state is updated even on failure
      }
    };

    loadCall(); // Invoke the function to load the call
  }, [client, id]); // Effect dependency array ensures it runs when `client` or `id` changes

  // Return the fetched call and loading state
  return {
    call, // The retrieved call object
    isCallLoading, // Loading state
  };
};
