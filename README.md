# PocketClass Booking System

## Project Overview

The PocketClass Booking System is a platform designed to connect students with instructors specializing in sports, arts, and music. The system provides both students and instructors with a streamlined experience for managing and booking classes, inspired by platforms like Airbnb and Calendly. 

### Features
- **Instructor Interface**: Manage availability, view bookings, and edit or cancel scheduled slots.
- **Student Interface**: View real-time availability of instructors, book slots, and receive booking confirmations.
- **Conflict Prevention**: Prevents double-booking through real-time updates and transaction locks.
- **Scalability and User Experience**: Designed for a seamless experience with efficient data handling and a scalable Firebase backend.

### Tech Stack
- **Frontend**: React, Tailwind CSS, Material-UI, Firebase.
- **Backend**: Node.js, Express, Firebase Admin SDK, and dotenv for environment management.


### PocketClass Booking System – Frontend
**Overview**
The frontend of the PocketClass Booking System is a React application designed to allow instructors to set their availability and students to book classes. This system includes real-time updates, booking confirmation, and an interactive calendar for a user-friendly experience.

### Libraries and Why We Used Them
- **Core Dependencies**
- **@heroicons/react:** Provides scalable, customizable icons. Used for adding intuitive icons to improve UX, like back buttons, calendar symbols, etc.

- **@testing-library/jest-dom:** Extends Jest’s DOM assertions, allowing better testing of DOM elements. This was added for better unit testing of the UI components.

- **@testing-library/react:** Enables testing React components by simulating user interactions, making sure components render as expected under different conditions.

- **@testing-library/user-event:** Allows testing user interactions in a way that closely resembles real usage, enhancing the reliability of the testing suite.

- **axios:** Used to make HTTP requests to our backend. Simplifies API calls, handles errors, and supports async operations effectively.

- **date-fns:** A utility library for parsing, formatting, and manipulating dates in JavaScript. Used to handle date formatting and operations in booking and availability schedules.

- **dayjs:** Lightweight date library for date manipulation, especially useful in calendar and availability components.

- **dotenv:** Loads environment variables from a .env file, keeping sensitive data (like Firebase config) out of the source code.

- **firebase:** Provides backend services, including authentication, database management, and Firestore. Firebase is the backbone of data handling in this project, managing bookings, user profiles, and real-time data updates.

- **react:** Core library for building the UI. Allows component-based design, improving reusability and maintainability.

- **react-calendar:** Provides a simple calendar component that integrates easily with date selection, used for allowing instructors to select specific dates for availability.

- **react-datepicker:** Date and time picker component, enhancing date input and scheduling functionality. Essential for students when selecting booking times.

- **react-dom:** Provides DOM-specific methods necessary to render React components in the browser.

- **react-router-dom:** Manages navigation and routing within the app, allowing users to navigate between different views like the instructor dashboard, student booking page, and home.

- **react-scripts:** Configures scripts for starting, building, and testing the app.

- **react-toastify:** Provides notifications, such as booking confirmations, cancellation alerts, and system updates. It enhances user feedback and interaction within the app.

- **web-vitals:** Measures and reports performance metrics, helping optimize and monitor the app's efficiency.

### Styling and Development
- **tailwindcss:** Utility-first CSS framework that offers predefined classes for rapid styling, including responsiveness, colors, and spacing. Tailwind makes it easy to manage styling within components without separate CSS files.
### Dev Dependencies
- **tailwindcss:** Installed in development mode for styling and layouts, allowing for quick adjustments and consistent design patterns across components.

### Firebase Schema
- **Users:** Stores user profiles with fields such as user ID, role (instructor or student), firstname,lastname, email, and other relevant details.
- **Bookings:** Contains each booking entry with a unique ID, references to user IDs, date, time slot, and status.
- **Availabilities:** Manages instructor availability with fields for instructor ID, date, available time slots, and availability status.
Setting Up and Starting the Project
Clone the Repository:

bash
### Copy code
git clone <repository-url>
cd booking-system-frontend
Install Dependencies:

bash
Copy code
### npm install
- **Environment Variables:** Create a .env file in the root directory and add Firebase configuration and any API keys:

plaintext
Copy code
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
Compile Tailwind CSS: Run the following command to generate the main CSS file with Tailwind:

bash
Copy code
npx tailwindcss -i ./src/styles/input.css -o ./src/styles/main.css --watch
Start the Application:

bash
Copy code
npm start
The app will be available at http://localhost:3000.

Usage and Navigation
Instructor Dashboard: Manage available time slots, view bookings, and adjust availability.
Student Dashboard: Browse instructor availability, select and book time slots, and view booking confirmations.
Notifications: Real-time alerts (powered by react-toastify) provide feedback on booking actions, cancellations, and errors.
Testing
Run Tests:
bash
Copy code
npm test
Uses @testing-library/react, @testing-library/jest-dom, and @testing-library/user-event to ensure components work as expected under different scenarios.
Additional Information
API Endpoints: The frontend communicates with the backend using RESTful API calls, primarily for CRUD operations on bookings and availability.
Conflict Handling: Real-time updates on availability ensure no double-booking. Firebase transaction locks prevent simultaneous access issues.


