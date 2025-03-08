# True Bond Mobile App

TrueBond is a modern pre-marital counseling platform designed to help couples build a strong foundation for marriage. Through expert-guided counseling, interactive assessments, and relationship-building exercises, TrueBond provides personalized support to prepare couples for a lifelong journey together.

## Tech Stack

- Platform: Firebase (No Backend)
- Frontend: React Native (Expo)
- Database: Firestore (NoSQL)
- Authentication: Firebase Authentication
- Cloud Functions (Optional): For handling business logic
- Storage: Firebase Storage
- Hosting: Firebase Hosting (if needed for web interface)
- Notifications: Firebase Cloud Messaging (FCM)
- Payments: MoMo, Vietnam banking, Visa

## Project Structure

```
true-bond-mobile-app/
│── assets/                   # Images, icons, fonts, etc.
│── src/
│   ├── components/           # Reusable UI components
│   ├── screens/              # Screen components (organized by feature)
│   │   ├── Auth/             # Login, Register, etc.
│   │   ├── Dashboard/        # Home, Profile, Settings, etc.
│   │   ├── Counseling/       # Booking, Sessions, Assessments
│   │   ├── Community/        # Forums, Group Chat
│   │   ├── Learning/         # Courses, Exercises
│   ├── navigation/           # Navigation logic (React Navigation)
│   ├── context/              # Global state management (if needed)
│   ├── hooks/                # Custom hooks for Firebase interactions
│   ├── services/             # Firebase services (Auth, Firestore, Storage)
│   ├── utils/                # Helper functions and utilities
│   ├── config/               # Firebase configuration and environment variables
│   ├── theme/                # Theming (colors, fonts, styles)
│── .env                      # Environment variables (Firebase API keys, etc.)
│── App.js                    # Entry point of the application
│── package.json              # Dependencies and scripts
│── firebase.json             # Firebase configuration (for hosting, if needed)
│── README.md                 # Documentation
```

## Features

### Core Features

- Personalized Profiles: Individual and couple profiles with relationship milestones.
- Counseling Sessions: Book one-on-one or group counseling with experts.
- Relationship Assessments: Compatibility tests and progress tracking.
- Learning Modules: Interactive courses and quizzes on communication, finances, and conflict resolution.
- Guided Exercises: Daily or weekly relationship-building tasks.
- Couple Goals: Shared goal tracking and milestone reminders.

### Community and Support

- Group Counseling: Join sessions with other couples for shared learning.
- Forums: Discuss relationship topics anonymously with expert moderation.
- Expert Resources: Access blogs, articles, and expert relationship advice.

### Mental & Emotional Well-being

- Mindfulness Tools: Guided meditations and stress management exercises.
- Conflict Resolution: Structured templates for respectful disagreement resolution.

### Interactive & Fun

- Couple Quizzes: Learn more about each other through fun quizzes.
- Chat Features: Private messages with appreciation prompts and a Gratitude Wall.
- Games & Activities: Fun couple challenges and shared goal activities.

### Administration & Insights

- Counselor Dashboard: Manage clients, sessions, and notes.
- Data-Driven Insights: Relationship analytics and progress tracking.
- Payment Integration: Subscription-based or pay-per-session model.

## Roles and Screens

### 👩‍❤️‍👨 Clients (Normal Users)

1. 🏠 Home – Overview, relationship insights, upcoming sessions, recommended content.
2. 📅 Sessions – View & book counseling sessions, Google Meet integration.
3. 📖 Learn – Courses, quizzes, exercises, and relationship guides.
4. 👤 Profile – User settings, subscription info, relationship tracking.

### 🧑‍⚕️ Counselors (Therapists & Experts)

1. 🏠 Home – Personalized dashboard with upcoming sessions & insights.
2. 📅 Sessions – Manage scheduled counseling sessions, notes, and availability.
3. 👥 Clients – View assigned clients, track progress, and manage appointments.
4. 👤 Profile – Counselor’s personal settings, availability, and payment details.

### 🛠️ Admins (Platform Managers)

1. 📊 Dashboard – Overview of platform activity, active users, and analytics.
2. 📂 Management – View & organize sessions, user data, and general settings.
3. ✅ Approvals – Review & approve new counselor applications.
4. 👤 Profile – Admin account settings and access controls.

## Development

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js v22.14.0
- PNPM

The project uses several development tools:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aquapaka/true-bond-mobile-app
   cd true-bond-mobile-app
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm start
   ```

4. Run the app on a simulator or physical device.

5. To maintain code quality, run:

```bash
# Linting
pnpm run lint
```

### ESlint & Prettier

- If using VSCode install them from:
  - ESlint: <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>
  - Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>

### API Documentation

The backend API is documented using OpenAPI. Access the documentation at:

<https://api.true-bond.com/docs> - Change this later

## Building for Production

To create a production build:

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## Contributing

As this is a private repository, contributions are currently limited to the core team. If you are a team member and would like to contribute, please follow these steps:

1. Switch to `dev` then create a new branch for your feature or bug fix:

   ```shell
   git checkout dev
   git pull origin dev
   git checkout -b feature-branch-name
   ```

2. Make your changes and commit them with a clear message:

   ```shell
   git commit -m "feat: Add XYZ feature"
   ```

3. Push your branch to the repository:

   ```shell
   git push origin feature-branch-name
   ```

4. Create a pull request (PR) and assign a reviewer.
5. Once approved, your changes will be merged into the main branch.

For any questions or access requests, contact the repository owner.

### Commit Best Practices

To maintain a clean and consistent commit history, follow these best practices:

- Use Conventional Commits:

  ```none
  feat: Add new feature for period tracking
  fix: Resolve issue with login authentication
  chore: Update dependencies and configurations
  refactor: Improve code structure for API calls
  ```

- Write clear and concise commit messages.
  Group related changes into a single commit.
- Use present tense and imperative mood in commit messages.
- Avoid vague commit messages like "fix bug" or "update code."
- Reference issues when applicable (e.g., `fix: Resolve login issue (#42)`).

### Useful resources

- <https://docs.expo.dev/guides/using-firebase/>

## License

This project is licensed under the MIT License - see the LICENSE file for details.
