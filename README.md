
# 📜 Project Documentation

## 📖 Overview
VisioMeet is a collaborative workspace application that empowers teams to connect seamlessly using Stream Chat and Clerk integrations. The application features real-time video conferencing, scheduling, and robust meeting management capabilities.

### 🔍 Why VisioMeet?
- Built with modern technologies for smooth and reliable communication.
- Designed to enhance productivity through a user-friendly interface.
- Focused on providing secure and scalable solutions for team collaboration.

---

## 🌟 Features

- **Real-Time Video Conferencing** 🎥: Streamlined video calls using the Stream.io SDK.
- **Meeting Scheduling** 🗓️: Schedule, manage, and join meetings with ease.
- **Customizable Layouts** 🧩: Multiple participant view layouts like grid and speaker views.
- **Device Management** 🎛️: Control camera, microphone, and audio output settings.
- **User Authentication** 🔒: Seamless integration with Clerk for user management.

---

## 🔧 Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/toolboxcloudservices/visiomeet.git
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file and configure the following:
   ```env
   NEXT_PUBLIC_STREAM_API_KEY=<your_stream_api_key>
   NEXT_PUBLIC_BASE_URL=<your_base_url>
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_publishable_key>
   CLERK_SECRET_KEY=<your_secert_key>
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_STREAM_API_KEY=<your_api_key>
   STREAM_SECRET_KEY=<your_secret_key>
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```

5. **Access the App**:
   Open `http://localhost:3000` in your browser.

---

## 🗂️ Directory Structure

```plaintext
📂 src/
 ├── 📂 components/      # Reusable UI components
 ├── 📂 pages/           # Application pages
 ├── 📂 hooks/           # Custom React hooks
 ├── 📂 utils/           # Utility functions
 └── 📂 styles/          # Application stylesheets
```

---

## 🧩 Key Components & Hooks

### Components
- **Navbar** 🧭: Persistent navigation bar for the app.
- **Sidebar** 📑: Collapsible sidebar for quick navigation.
- **MeetingTypeList** 🗂️: Displays meeting options (schedule, join, instant).
- **MeetingRoom** 🎥: Handles participant layout and controls during calls.

### Hooks
- **useGetCalls** 📞: Fetches a list of past and upcoming calls.
- **useGetCallById** 🔍: Retrieves call details by ID.

---

## 🖥️ Usage Instructions

### Starting a Meeting
1. **Schedule a Meeting**:
   - Navigate to the homepage.
   - Click on "Schedule Meeting" and fill in the required details.
2. **Join a Meeting**:
   - Use the provided meeting link or ID to join an existing meeting.

### Device Management
- Access the settings to enable or disable your microphone, camera, or change audio output.

---

## 🚀 Tech Stack

- **React**: For building the user interface.
- **Next.js**: Framework for server-side rendering and static site generation.
- **Stream.io SDK**: For video and chat functionalities.
- **Clerk**: User authentication and management.
- **Tailwind CSS**: Styling the application with utility-first CSS.

---

## 🤝 Contributing

We welcome contributions to improve VisioMeet. Follow these steps:

1. **Fork the Repository**.
2. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Changes** and **Commit**:
   ```bash
   git commit -m "Add your message"
   ```
4. **Push to Your Branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Submit a Pull Request**.

---

## ✨ Future Enhancements

- **Recording Feature**: Enable meeting recording functionality.
- **Theme Customization**: Allow users to personalize the UI.
- **Analytics Dashboard**: Provide detailed insights into meeting activities.

---

Happy collaborating! 🚀
