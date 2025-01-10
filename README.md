# Task Management Application

A modern task management application built with React and Material-UI that helps users organize their daily tasks efficiently.

## 📸 App Showcase

### 🎯 Dashboard Overview
![Dashboard Overview](screenshots/dashboard-overview.png)
*Main dashboard showing task statistics and quick actions*

### 🌓 Theme Support
<div style="display: flex; gap: 10px; margin-bottom: 20px;">
  <div>
    <img src="screenshots/light-theme.png" alt="Light Theme" width="400"/>
    <p align="center"><em>Light Theme</em></p>
  </div>
  <div>
    <img src="screenshots/dark-theme.png" alt="Dark Theme" width="400"/>
    <p align="center"><em>Dark Theme</em></p>
  </div>
</div>

### ✨ Task Management
<div style="display: flex; flex-direction: column; gap: 20px;">
  <div>
    <img src="screenshots/task-creation.png" alt="Task Creation" width="100%"/>
    <p align="center"><em>Intuitive Task Creation Form</em></p>
  </div>
  <div>
    <img src="screenshots/task-list.png" alt="Task List" width="100%"/>
    <p align="center"><em>Organized Task List with Filtering</em></p>
  </div>
</div>

### 📱 Responsive Design
<div style="display: flex; gap: 10px; margin-bottom: 20px;">
  <div>
    <img src="screenshots/mobile-view.png" alt="Mobile View" height="400"/>
    <p align="center"><em>Mobile Experience</em></p>
  </div>
  <div>
    <img src="screenshots/tablet-view.png" alt="Tablet View" height="400"/>
    <p align="center"><em>Tablet Experience</em></p>
  </div>
</div>

## Features

- ✨ Clean and intuitive user interface
- ✅ Create, edit, and delete tasks
- 🔄 Toggle task completion status
- 🏷️ Organize tasks by categories:
  - Work
  - Personal
  - Shopping
  - Health
  - Education
  - Home
- 📊 Task statistics dashboard
- 🔔 Real-time notifications for actions
- 📱 Fully responsive design
- 🌓 Dark/Light theme support

## Tech Stack

### Frontend
- React.js 18
- Material-UI (MUI) v5
- Context API for state management
- Axios for API requests
- notistack for notifications
- React Router v6
- Vite for build tooling

### Backend
- Node.js
- Express.js
- PostgreSQL
- RESTful API
- JWT Authentication (coming soon)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/devwithkudzie/task-management.git
cd task-management
```

2. Install dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Environment Setup

Create `.env` file in client directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Create `.env` file in server directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/taskmanagement

# Individual DB Config (fallback)
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=taskmanagement
DB_HOST=localhost
DB_PORT=5432
```

4. Initialize Database
```bash
cd server
npm run init
```

5. Start Development Servers

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

## Project Structure
```
task-management/
├── client/                # Frontend React application
│   ├── public/           # Static files
│   └── src/
│       ├── components/   # Reusable components
│       ├── context/      # React context providers
│       ├── pages/        # Page components
│       └── services/     # API services
└── server/               # Backend Node.js application
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middleware/       # Express middleware
    ├── models/           # Database models
    ├── routes/           # API routes
    └── scripts/          # Database scripts
```

## API Documentation

### Tasks Endpoints

#### Get All Tasks
```http
GET /api/tasks
```
Response:
```json
[
  {
    "id": 1,
    "title": "Complete Project",
    "description": "Finish the task management app",
    "status": "pending",
    "priority": "high",
    "category": "Work",
    "dueDate": "2024-03-25T00:00:00.000Z",
    "createdAt": "2024-03-20T10:00:00.000Z"
  }
]
```

#### Create Task
```http
POST /api/tasks
```
Request Body:
```json
{
  "title": "New Task",
  "description": "Task description",
  "priority": "medium",
  "category": "Work",
  "dueDate": "2024-03-25"
}
```

#### Update Task
```http
PUT /api/tasks/:id
```

#### Delete Task
```http
DELETE /api/tasks/:id
```

#### Toggle Task Status
```http
PUT /api/tasks/:id/toggle
```

## Development

### Available Scripts

Frontend:
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

Backend:
```bash
npm run dev        # Start development server
npm run start      # Start production server
npm run init       # Initialize database
npm run migrate    # Run database migrations
```

### Code Style
- ESLint for code linting
- Prettier for code formatting
- Conventional Commits for commit messages

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `VITE_API_URL`: Production API URL
3. Deploy from main branch

### Backend (Railway)
1. Create new Railway project
2. Add PostgreSQL plugin
3. Set environment variables from `.env`
4. Deploy from main branch

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the awesome component library
- PostgreSQL for the reliable database solution
- All contributors who help improve this project

## Contact

Kudzaishe Mukungurutse - [@devwithkudzie](https://twitter.com/devwithkudzie)
Project Link: [https://github.com/devwithkudzie/task-management](https://github.com/devwithkudzie/task-management)

---

<p align="center">Made with ❤️ by Kudzaishe Mukungurutse</p>

## 📸 Screenshots

### Updating Screenshots

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Capture screenshots:
```bash
npm run screenshots
```

4. Optimize images:
```bash
npm run optimize-images
```

Or run both steps together:
```bash
npm run prepare-screenshots
```

### Screenshot Guidelines

- Keep the app in a clean state
- Use consistent sample data
- Ensure all features are visible
- Capture both light and dark themes
- Include mobile and tablet views
- Show interactive elements