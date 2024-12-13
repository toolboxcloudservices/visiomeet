import MeetingTypeList from '@/components/MeetingTypeList'; // Importing a component to display meeting options

/**
 * Home component.
 *
 * The main landing page of the application, showing the current time, date, and options for managing meetings.
 */
const Home = () => {
  const now = new Date(); // Get the current date and time

  // Format the time as a 2-digit hour and minute, e.g., "12:30 PM"
  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Format the date in a full-length format, e.g., "Wednesday, December 13, 2024"
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(now);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      {/* Hero section displaying a background image with the current time and date */}
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {/* Placeholder for an upcoming meeting time */}
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
          {/* Display the current time and date */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      {/* Render the meeting type options */}
      <MeetingTypeList />
    </section>
  );
};

export default Home; // Export the Home component as the default export
