# sehapostmart - Smart Digital Clinic

## Overview

This is a comprehensive digital health platform called "sehapostmart - Smart Digital Clinic" built with React and designed to provide natural health products, health articles, AI consultations, and membership services. The application features a modern, Arabic-first design with a natural green color scheme and comprehensive health-focused functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React and React Icons

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple

### Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components for routing
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and configurations
│   │   └── services/       # API service layer (prepared for Supabase)
├── server/                 # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data access layer
│   └── vite.ts            # Development server integration
├── shared/                 # Shared TypeScript types and schemas
└── migrations/            # Database migration files
```

## Key Components

### Frontend Components
1. **Header**: Navigation with Arabic-first design and mobile menu
2. **Footer**: Comprehensive footer with social links and quick navigation
3. **ProductCard**: Product display with WhatsApp ordering integration
4. **ArticleCard**: Health article previews with category badges

### Page Components
1. **Home**: Landing page with hero section and featured content
2. **Products**: Product catalog with search and filtering
3. **ProductDetail**: Individual product pages with detailed information
4. **Blog**: Health articles listing with featured content
5. **Article**: Individual article pages with full content
6. **AIConsultation**: AI-powered health consultation form
7. **Membership**: Membership plans and registration

### Database Schema
- **Users**: User authentication and profiles
- **Products**: Health product catalog with categories, pricing, and descriptions
- **Articles**: Health blog content with categories and metadata
- **Consultations**: AI consultation records and recommendations
- **Memberships**: User membership plans and subscriptions

## Data Flow

1. **Client-Side Rendering**: React components fetch data using TanStack Query
2. **API Integration**: Currently uses sample data, prepared for Supabase integration
3. **Form Handling**: React Hook Form with Zod validation for type safety
4. **State Management**: Server state cached with React Query, local state with React hooks
5. **Real-time Features**: WhatsApp integration for direct customer communication

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing solution
- **drizzle-orm**: Type-safe database operations
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **zod**: Runtime type validation and schema validation

### UI/UX Dependencies
- **@radix-ui/***: Accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Modern icon library
- **react-icons**: Additional icon sets including FontAwesome
- **class-variance-authority**: Type-safe CSS class composition

### Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **eslint**: Code linting and formatting

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR (Hot Module Replacement)
- **Backend Integration**: Express server with Vite middleware for seamless development
- **Database**: Neon serverless PostgreSQL for development and production

### Production Build
- **Frontend Build**: `vite build` creates optimized static assets
- **Backend Build**: `esbuild` bundles the Express server for production
- **Deployment Target**: Designed for platforms like Replit, Vercel, or similar hosting services

### Environment Configuration
- **Database**: Uses `DATABASE_URL` environment variable for PostgreSQL connection
- **Supabase**: Prepared configuration for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- **Development**: Automatic Replit integration with development banner and error overlay

### Key Features
1. **Arabic-First Design**: RTL support and Arabic typography
2. **WhatsApp Integration**: Direct customer communication for orders
3. **Responsive Design**: Mobile-first approach with Tailwind CSS
4. **Type Safety**: Full TypeScript coverage from database to frontend
5. **Modern UI**: shadcn/ui components with consistent design system
6. **Performance**: Optimized builds with code splitting and lazy loading