# Developer Showcase

A full-stack web application where developers can showcase projects, seek feedback, recruit collaborators, and connect with other builders.

This project was primarily created as a learning exercise for PostgreSQL and SQL database design. Rather than using an ORM such as Prisma or TypeORM, the backend interacts with PostgreSQL using raw SQL queries to provide a deeper understanding of relational databases, query construction, and schema design.

This repository uses a monorepo architecture powered by npm workspaces and Turborepo, containing both the React frontend and NestJS backend in a single codebase.

---

## Features

- Email/password authentication
- GitHub OAuth authentication
- JWT-based authentication and authorization
- Project showcase platform
- Developer recruitment posts
- Project feedback and advice requests
- PostgreSQL database integration using raw SQL
- Image uploads via Uploadcare
- Responsive UI built with Tailwind CSS
- Monorepo architecture using Turborepo

---

## Repository Structure

```text
.
├── apps/
│   ├── backend/          # NestJS API server
│   └── frontend/         # React application
├── packages/             # Shared packages (optional)
├── package.json
├── package-lock.json
├── turbo.json
└── README.md
```

### Key Structural Notes

- This is a monorepo managed with npm workspaces
- Frontend and backend live in the same repository
- Dependency management is centralized at the root
- PostgreSQL is used as the primary database
- No ORM is used; all database interactions are written in SQL

---

## Tech Stack

### Backend (`apps/backend`)

- NestJS
- TypeScript
- PostgreSQL
- Raw SQL
- JWT Authentication
- GitHub OAuth
- Uploadcare

### Frontend (`apps/frontend`)

- React
- Vite
- TypeScript
- Tailwind CSS

### Tooling

- npm Workspaces
- Turborepo

---

## Why Raw SQL?

The primary goal of this project was to gain a deeper understanding of PostgreSQL and relational databases.

Instead of relying on an ORM, all database interactions are implemented using SQL queries directly. This approach provides experience with:

- Database schema design
- SQL joins and relationships
- Query optimization
- Data integrity constraints
- PostgreSQL-specific features
- Writing and maintaining production-style SQL

---

## Prerequisites

You will need:

- Node.js (LTS recommended)
- npm v7+
- A PostgreSQL database

---

## Installation

Clone the repository and install dependencies from the repository root:

```bash
npm install
```

This installs dependencies for all workspace packages and generates a single lockfile.

Do not run `npm install` inside individual applications.

---

## Backend Environment Variables

Create a `.env` file inside `apps/backend`.

```env
FRONTEND_URL=http://localhost:5173
PORT=3000

NEON_DB_URL=your_database_connection_string

NODE_ENV=development

JWT_SECRET=your_jwt_secret
JWT_EXPIRES=604800000

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

UPLOADCARE_PUBLIC_KEY=your_uploadcare_public_key
UPLOADCARE_SECRET_KEY=your_uploadcare_secret_key
```

### Variable Descriptions

| Variable              | Description                              |
| --------------------- | ---------------------------------------- |
| FRONTEND_URL          | Frontend URL used for CORS configuration |
| PORT                  | Backend server port                      |
| NEON_DB_URL           | PostgreSQL connection string             |
| NODE_ENV              | Runtime environment                      |
| JWT_SECRET            | Secret used to sign JWT tokens           |
| JWT_EXPIRES           | JWT expiration time in milliseconds      |
| GITHUB_CLIENT_ID      | GitHub OAuth application client ID       |
| GITHUB_CLIENT_SECRET  | GitHub OAuth application client secret   |
| UPLOADCARE_PUBLIC_KEY | Uploadcare public API key                |
| UPLOADCARE_SECRET_KEY | Uploadcare secret API key                |

---

## Frontend Environment Variables

Create a `.env` file inside `apps/frontend`.

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

### Variable Descriptions

| Variable              | Description            |
| --------------------- | ---------------------- |
| VITE_BACKEND_URL      | Backend API URL        |
| VITE_GITHUB_CLIENT_ID | GitHub OAuth client ID |

---

## Third-Party Service Setup

### Neon Database

This project uses PostgreSQL hosted through Neon.

1. Create an account at Neon.
2. Create a new project.
3. Create a database if one is not automatically generated.
4. Open the Dashboard and locate your connection string.
5. Copy the PostgreSQL connection string into:

```env
NEON_DB_URL=your_connection_string
```

---

### GitHub OAuth

GitHub OAuth is required if you want to enable GitHub sign-in.

#### Create an OAuth Application

1. Sign in to GitHub.
2. Navigate to:

```text
Settings → Developer Settings → OAuth Apps
```

3. Click **New OAuth App**.
4. Configure:

**Application Name**

```text
Developer Showcase
```

**Homepage URL**

```text
http://localhost:5173
```

**Authorization Callback URL**

```text
http://localhost:3000/auth/github/callback
```

5. Create the application.
6. Copy the Client ID.
7. Generate a Client Secret.

Add both values to the backend environment file:

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

And add the Client ID to the frontend:

```env
VITE_GITHUB_CLIENT_ID=your_client_id
```

---

### Uploadcare

Uploadcare is used for storing project screenshots and uploaded images.

1. Create an Uploadcare account.
2. Create a new project.
3. Open the project dashboard.
4. Locate your API keys.

Add them to your backend environment file:

```env
UPLOADCARE_PUBLIC_KEY=your_public_key
UPLOADCARE_SECRET_KEY=your_secret_key
```

---

## Running the Application

Start all development servers from the repository root:

```bash
npm run dev
```

This command:

- Starts the NestJS backend
- Starts the React frontend
- Runs both applications concurrently through Turborepo
- Streams logs from each application

### Default Development URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

---

## Authentication

Users can authenticate using either:

- Email and password
- GitHub OAuth

Authenticated sessions are managed using JWTs.

---

## File Uploads

Project images are uploaded and managed through Uploadcare.

This allows users to attach screenshots and other project-related media without storing files directly on the application server.

---

## Project Purpose

This project serves two primary purposes:

### Community Platform

Developers can:

- Showcase personal projects
- Request feedback
- Seek technical advice
- Recruit collaborators
- Discover projects built by other developers

### Learning PostgreSQL

The application was intentionally built without an ORM to provide hands-on experience with:

- PostgreSQL
- SQL query writing
- Database design
- Relational data modeling
- Authentication systems
- Full-stack application architecture
- Managing application data using raw SQL

---

## NeonDB Table Schemas

### Entity Relationship Map

Below is a quick overview of how the tables relate to each other:

- **`users`**
  - `user_id` (BIGINT, PK)
  - `email` (VARCHAR, UNIQUE) — _3-255 chars_
  - `username` (TEXT, UNIQUE) — _Min 6 chars_
  - `password_hash` (TEXT)
  - `profile_picture_seed` (UUID)
  - `biography` (VARCHAR)
- **`posts`**
  - `post_id` (BIGINT, PK)
  - `user_id` (BIGINT, FK ➔ `users.user_id`)
  - `title` (VARCHAR) — _10-150 chars_
  - `content` (VARCHAR) — _100-1000 chars_
  - `slideshow_image_urls` (TEXT[]) — _Max 9 images_
  - `tags` (TEXT[]) — _Max 5 tags_
  - `thumbnail_url` / `project_repo_link` / `live_project_link` (TEXT)
- **`comments`**
  - `comment_id` (BIGINT, PK)
  - `user_id` (BIGINT, FK ➔ `users.user_id`)
  - `post_id` (BIGINT, FK ➔ `posts.post_id`)
  - `content` (VARCHAR) — _5-500 chars_
  - `reply_to_id` (BIGINT, FK ➔ `comments.comment_id`) — _Self-referencing for nested threads_

---

```sql
-- 1. Create Users Table First
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
    profile_picture_seed UUID DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL CHECK (char_length(username) >= 6),
    biography VARCHAR(400) NOT NULL DEFAULT 'This user prefers to keep an air of mystery about themselves...',
    password_hash TEXT NOT NULL CHECK (char_length(password_hash) >= 6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Posts Table (Depends on Users)
CREATE TABLE posts (
    post_id BIGINT PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id) NOT NULL,
    thumbnail_url TEXT DEFAULT '[https://prairiesigns.com/assets/img/placeholder_600x400.svg](https://prairiesigns.com/assets/img/placeholder_600x400.svg)',
    title VARCHAR(150) NOT NULL CHECK (char_length(title) BETWEEN 10 AND 150),
    content VARCHAR(1000) NOT NULL CHECK (char_length(content) BETWEEN 100 AND 1000),
    slideshow_image_urls TEXT[] NOT NULL DEFAULT '{}' CHECK (cardinality(slideshow_image_urls) <= 9),
    project_repo_link TEXT,
    live_project_link TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}' CHECK (cardinality(tags) <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Comments Table (Depends on Users, Posts, and Self)
CREATE TABLE comments (
    comment_id BIGINT PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id) NOT NULL,
    post_id BIGINT REFERENCES posts(post_id) NOT NULL,
    content VARCHAR(500) NOT NULL CHECK (char_length(content) BETWEEN 5 AND 500),
    reply_to_id BIGINT REFERENCES comments(comment_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
