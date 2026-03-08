![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

<details>
<summary>Table of Contents</summary>
<ol>
<li>
<a href="#overview">Overview</a>
<ul>
<li><a href="#built-with">Built With</a></li>
<li><a href="#demo">Demo</a></li>
</ul>
</li>
<li>
<a href="#getting-started">Getting Started</a>
<ul>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#installation">Installation</a></li>
</ul>
</li>
<li>
<a href="#features">Features</a>
<ul>
<li><a href="#authentication-system">Authentication System</a></li>
<li><a href="#database-architecture">Database Architecture</a></li>
</ul>
</li>
<li><a href="#design">Design</a></li>
<li><a href="#accessibility--optimisation">Accessibility / Optimisation</a></li>
<li><a href="#contributions">Contributions</a></li>
<li><a href="#credits">Credits</a></li>
</ol>
</details>

# Overview

Piasco is a full stack web application designed for secure data management and user authentication. It provides a seamless experience for users to register, verify their identity, and manage their dashboard in a type safe environment.

The platform is built to handle complex relational data using Prisma and ensures high performance through server side rendering. It prioritises security with custom rate limiting and robust session handling.

## Built With

**Frontend**

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS v4
* React Hook Form
* Zod
* Framer Motion

**Backend**

* Prisma ORM
* PostgreSQL (Prisma Postgres)
* NextAuth.js v5
* Resend API
* Node.js

**Hosting**

* Deployment via Vercel

# Getting Started

Follow these steps to set up the Piasco environment on your local machine.

## Prerequisites

You must have Node.js 22 (LTS) installed. It is recommended to use nvm to manage your versions.

```bash
# Check your current Node version
node v

```

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/psyofrelief/piasco.git
cd piasco

# 2. Install dependencies using yarn
yarn install

# 3. Setup environment variables
# Create a .env file in the root directory
# Add your DATABASE_URL and AUTH_SECRET

# 4. Initialise the database
npx prisma generate
npx prisma migrate dev

# 5. Launch the development server
yarn dev

```

# Features

## Authentication System

* Dual login options via Google OAuth and traditional Credentials.
* Secure email verification flow using Resend.
* Encrypted password storage with bcryptjs.
* Custom middleware to protect dashboard routes and handle unverified accounts.

## Database Architecture

* Relational data modelling with PostgreSQL.
* Automated migrations and type generation through Prisma.
* Efficient connection pooling for serverless environments.
* Integrated password reset tokens with expiration logic.

# Design

### Design Philosophy

* Focused on a clean and professional user interface.
* Uses whitespace effectively to enhance readability.
* Consistent visual feedback through toast notifications and loading states.

### Technical Approach

* Modular architecture using Next.js server components for speed.
* Strict type safety across the entire stack to eliminate runtime bugs.
* Custom middleware for intelligent traffic management and security.

# Accessibility / Optimisation

* Rapid page loads using Next.js static and dynamic rendering.
* Responsive design that scales perfectly across mobile and desktop.
* Optimised database queries to reduce latency.
* Rate limited API endpoints to prevent brute force attacks.

# Contributions

Piasco is currently a private project maintained by **Faried Idris**. External contributions are not being accepted at this stage.

# Credits

Designed and developed by **Faried Idris**.
GitHub: [https://github.com/psyofrelief](https://www.google.com/search?q=https://github.com/psyofrelief)
