# Serverless Media Drop

A modern, secure cloud media manager built with Next.js 16, React, and Tailwind CSS.

## Features

- **Authentication Screen** - Professional SaaS-style login/signup with email and Google OAuth placeholder
- **Dashboard** - Main hub with upload area, statistics, file gallery, and activity feed
- **File Management** - Upload, organize, search, and filter media files (images, PDFs, documents)
- **Storage Tracking** - Real-time storage usage statistics and limits
- **Favorites System** - Mark important files for quick access
- **Activity Log** - Track recent uploads, deletions, and favorites
- **Settings** - User account management, storage limits, and privacy controls

## Project Structure

```
app/
├── layout.tsx              # Root layout with dark theme
├── page.tsx               # Redirects to /auth
├── auth/
│   └── page.tsx          # Authentication (login/signup)
└── dashboard/
    ├── layout.tsx        # Dashboard wrapper with sidebar & topbar
    ├── page.tsx          # Main dashboard
    ├── uploads/
    │   └── page.tsx      # All uploads view
    ├── favorites/
    │   └── page.tsx      # Favorites view
    └── settings/
        └── page.tsx      # Account settings

components/
├── sidebar.tsx           # Left navigation
├── topbar.tsx           # Top search and user menu
├── upload-area.tsx      # Drag-and-drop upload component
├── stat-cards.tsx       # Statistics cards (storage, uploads, etc.)
├── file-gallery.tsx     # File grid with filters
└── activity-feed.tsx    # Recent activity list
```

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with custom dark theme
- **Icons**: Lucide React
- **UI Components**: shadcn/ui Button component
- **Dark Theme**: Custom OKLch color scheme optimized for modern SaaS design

## Color Scheme

The app features a sophisticated dark theme optimized for media management:
- **Background**: Deep navy (`oklch(0.12 0 0)`)
- **Primary**: Vibrant purple/blue accent (`oklch(0.55 0.2 264.5)`)
- **Cards**: Elevated dark surfaces (`oklch(0.18 0 0)`)
- **Text**: Clean white foreground (`oklch(0.95 0 0)`)

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The app will be available at `http://localhost:3000`

## Key Features Implementation

### Upload Area
- Drag-and-drop interface
- File type validation (images, PDFs, docs)
- Animated upload progress bar
- Success/error feedback

### File Gallery
- Responsive grid layout
- Multiple filter tabs (All, Images, PDFs, Docs, Favorites)
- Image preview thumbnails
- Quick action buttons (View, Download, Delete, Favorite)

### Sidebar Navigation
- Active route highlighting
- Quick access to Dashboard, Uploads, Favorites, Settings
- User profile section with logout

### Real-time Statistics
- Total uploads counter
- Storage usage tracking
- File type breakdown
- Gradient-decorated stat cards

## Mock Data

The application currently uses mock data for demonstration:
- 6 sample files with various types
- Statistics showing 24 uploads and 1.2 GB storage
- Activity feed with recent actions

## Ready for Integration

The application is structured to easily integrate with:
- **Backend API** - Replace mock data with API calls
- **Authentication** - Connect to auth service (Supabase, Auth.js, etc.)
- **File Storage** - Integrate cloud storage (Vercel Blob, S3, etc.)
- **Database** - Add persistent data storage (Neon, Supabase, etc.)

## Responsive Design

The dashboard is fully responsive:
- Mobile: Single column layout
- Tablet: 2-column file grid
- Desktop: Full featured layout with sidebar and 3-column grid

## Notes for Supabase Integration

When integrating with Supabase:
1. Add authentication provider
2. Create tables for `files` and `activities`
3. Implement RLS (Row Level Security) for user data isolation
4. Replace mock data fetching with Supabase queries
5. Add file upload to Supabase Storage
