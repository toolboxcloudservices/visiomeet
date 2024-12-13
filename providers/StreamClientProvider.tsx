'use client'; // Indicates that this file is a client-side React component for Next.js

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk'; // Importing Stream.io's video SDK components
import { useUser } from '@clerk/nextjs'; // Hook to access user information provided by Clerk authentication

import { tokenProvider } from '@/actions/stream.actions'; // Custom token provider to manage Stream.io tokens
import Loader from '@/components/Loader'; // Loader component to show a loading state

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY; // Accessing the API key for Stream.io from environment variables

/**
 * StreamVideoProvider component
 * Wraps its children with a Stream.io video context to enable video functionality.
 * Handles client initialization and ensures the user is authenticated before proceeding.
 */
const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  // State to manage the instance of StreamVideoClient
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  // Fetch the authenticated user and loading state using Clerk's useUser hook
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Only initialize the video client if the user data is fully loaded and available
    if (!isLoaded || !user) return;

    // Throw an error if the Stream.io API key is missing
    if (!API_KEY) throw new Error('Stream API key is missing');

    // Create a new instance of StreamVideoClient with the user's information and token provider
    const client = new StreamVideoClient({
      apiKey: API_KEY, // API key for Stream.io
      user: {
        id: user?.id, // User ID (required)
        name: user?.username || user?.id, // Display name defaults to username or ID
        image: user?.imageUrl, // Optional: User's profile image
      },
      tokenProvider, // Function to fetch or manage the user's Stream.io tokens
    });

    // Update the state with the newly created video client
    setVideoClient(client);
  }, [user, isLoaded]); // Dependency array to re-run effect when `user` or `isLoaded` changes

  // Show the loader if the video client is not initialized yet
  if (!videoClient) return <Loader />;

  // Provide the StreamVideo context to children components
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider; // Export the provider for use in other parts of the application
