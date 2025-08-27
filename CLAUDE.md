# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Backend Development
- `npm run backend:dev` - Start backend in development mode with nodemon
- `npm run backend` - Start backend in production mode
- `npm test:api` or `cd api && npm run test:ci` - Run backend tests

### Frontend Development  
- `npm run frontend:dev` - Start frontend development server (builds packages first)
- `npm run frontend` - Build frontend for production (includes all package builds)
- `npm run frontend:ci` - Build frontend for CI environment
- `npm test:client` or `cd client && npm run test:ci` - Run frontend tests

### Package Building (Required Before Frontend)
- `npm run build:data-provider` - Build data provider package
- `npm run build:data-schemas` - Build data schemas package  
- `npm run build:api` - Build API package
- `npm run build:client-package` - Build client package

### Code Quality
- `npm run lint` - Run ESLint on all files
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `cd client && npm run typecheck` - Run TypeScript type checking

### Testing
- `npm run e2e` - Run end-to-end tests with Playwright (local config)
- `npm run e2e:headed` - Run E2E tests in headed mode
- `npm run e2e:a11y` - Run accessibility tests

### User Management Commands
- `npm run create-user` - Create new user account
- `npm run ban-user` - Ban user account
- `npm run delete-user` - Delete user account
- `npm run reset-password` - Reset user password
- `npm run add-balance` - Add balance to user account
- `npm run list-users` - List all users

## High-Level Architecture

### Monorepo Structure
LibreChat is organized as a yarn workspace monorepo with the following main components:

- **`/api`** - Node.js/Express backend server with LangChain integration
- **`/client`** - React frontend application built with Vite
- **`/packages`** - Shared packages used across frontend/backend:
  - `data-provider` - API client and data fetching utilities
  - `data-schemas` - Mongoose models and Zod validation schemas
  - `client` - Shared React components and UI library
  - `api` - Backend utilities and shared API logic

### Backend Architecture (`/api`)

**Core Structure:**
- **`app/clients/`** - AI provider client implementations (OpenAI, Anthropic, Google, etc.)
- **`server/`** - Express server configuration, routes, middleware, and services
- **`models/`** - Mongoose database models
- **`utils/`** - Shared utilities and helpers

**Key Components:**
- **AI Clients**: Abstracted client implementations for different AI providers with a common interface (BaseClient)
- **Agents System**: LangChain-based agent framework with tools, memory, and conversation management
- **MCP Integration**: Model Context Protocol support for extensible tool systems
- **Authentication**: Passport.js with support for JWT, OAuth2, LDAP, and local authentication
- **File Handling**: Multi-strategy file storage (local, S3, Firebase) with upload/processing capabilities
- **Database**: MongoDB with Mongoose ODM for data persistence

### Frontend Architecture (`/client`)

**Core Structure:**
- **`src/components/`** - React components organized by feature domain
- **`src/hooks/`** - Custom React hooks for state management and side effects
- **`src/store/`** - Recoil state management
- **`src/data-provider/`** - API integration and React Query configurations
- **`src/utils/`** - Frontend utilities and helpers

**Key Features:**
- **React 19** with modern hooks and concurrent features
- **Recoil** for global state management
- **React Query** for server state management and caching
- **React Router** for client-side routing
- **Radix UI** + **Tailwind CSS** for component library and styling
- **i18next** for internationalization

### Data Flow Architecture

**Request Flow:**
1. Client makes API request via data-provider
2. Express server handles request through middleware layers
3. Route handlers process business logic using services
4. AI clients interface with external providers (OpenAI, Anthropic, etc.)
5. Responses streamed back to client with real-time updates

**Key Integrations:**
- **Database**: MongoDB for persistent data storage
- **Search**: MeiliSearch for conversation and message search
- **Caching**: Redis for session management and rate limiting
- **File Storage**: Configurable strategies for different file types
- **AI Providers**: Multi-provider support with unified client interface

### Configuration System

**Primary Config**: `librechat.example.yaml` - Main configuration file for:
- AI endpoint configurations and model specifications
- Interface customization and feature toggles
- File storage strategies and upload limits
- Authentication provider settings

**Environment Variables**: Controls runtime behavior for deployment, database connections, API keys, and feature flags.

### Package Dependencies

**Backend Key Dependencies:**
- Express.js for web server
- Mongoose for MongoDB ODM
- LangChain for AI orchestration
- Passport.js for authentication
- Socket.io for real-time communication

**Frontend Key Dependencies:**
- React 19 for UI framework
- Recoil for state management
- React Query for server state
- Radix UI for component primitives
- Tailwind CSS for styling

### Development Workflow

1. **Setup**: Install dependencies with `npm install` (uses yarn workspaces)
2. **Build Packages**: Run package build commands before frontend development
3. **Development**: Start backend and frontend servers separately
4. **Database**: Uses MongoDB with optional MeiliSearch for search functionality
5. **Testing**: Separate test suites for frontend, backend, and E2E scenarios