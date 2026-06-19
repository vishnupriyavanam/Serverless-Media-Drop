Serverless Media Drop

A cloud-based file management platform built using Next.js and Supabase. The application enables users to securely upload, organize, manage, and access their files through a modern web interface.

Overview

Serverless Media Drop is designed to demonstrate modern cloud application development using a serverless architecture. It integrates authentication, cloud storage, database management, and secure user access into a single platform.

Features

* User authentication with Email/Password
* Google OAuth login
* Secure file uploads
* Cloud storage integration with Supabase Storage
* File preview functionality
* Download and delete operations
* Favorites management
* User-specific file access
* Protected dashboard routes
* Responsive user interface
* Real-time storage statistics

 Technology Stack

 Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend & Cloud Services

* Supabase Authentication
* Supabase Storage
* PostgreSQL Database

### Deployment

* Vercel

## System Architecture

User Interface (Next.js)

↓

Authentication Layer (Supabase Auth)

↓

Storage Layer (Supabase Storage)

↓

Database Layer (PostgreSQL)

## Project Workflow

1. Users register or sign in using email/password or Google authentication.
2. Uploaded files are stored in Supabase Storage.
3. File metadata is stored in PostgreSQL.
4. The dashboard retrieves user-specific files.
5. Users can manage, preview, download, favorite, and delete files.

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

Clone the repository:

```bash
git clone https://github.com/vishnupriyavanam/Serverless-Media-Drop.git
```

Navigate to the project directory:

```bash
cd Serverless-Media-Drop
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application:

```txt
http://localhost:3000
```

## Security

* Supabase Authentication
* Google OAuth Integration
* Protected Routes
* User-Specific Data Access
* Row Level Security (RLS)

## Future Enhancements

* Folder Management
* File Sharing Links
* Advanced Search and Filtering
* User Profile Management
* Storage Analytics Dashboard
* Team Collaboration Features

## Author

Vishnupriya Vanam

GitHub: https://github.com/vishnupriyavanam

## License

MIT License
