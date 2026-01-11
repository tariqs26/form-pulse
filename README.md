# FormPulse

Full-stack web app for creating and sharing forms, built with Next.js, TypeScript, and Tailwind CSS.

![image](https://github.com/user-attachments/assets/98d4bcec-c35a-4b6a-b227-0076cfc0dcae)

## Features

- **Drag-and-Drop Form Builder:**
  - **Layout fields:** Title, subtitle, paragraph, spacer, separator
  - **Input fields:** Text, number, select, date, checkbox, textarea
- **Share Forms:** Generate a unique URL for easy sharing
- **View Responses:** Access form submissions in a tabular format
- **Analytics:** Track form views and submissions

## Technologies

| Technology                                    | Purpose                    |
| --------------------------------------------- | -------------------------- |
| [Next.js](https://nextjs.org/)                | Full-stack React framework |
| [TypeScript](https://www.typescriptlang.org/) | Language                   |
| [Clerk](https://clerk.dev/)                   | Authentication             |
| [Prisma](https://www.prisma.io/)              | ORM                        |
| [PostgreSQL](https://www.postgresql.org/)     | Database                   |
| [Tailwind CSS](https://tailwindcss.com/)      | CSS framework              |
| [Shadcn/ui](https://ui.shadcn.com/)           | UI components              |

## Setup

1. **Prerequisites:**

   - Node.js (v18 or later)
   - PostgreSQL database
   - [Clerk](https://clerk.dev/) account

2. **Clone the repository:**

   ```bash
   git clone https://github.com/tariqs26/form-pulse.git
   cd form-pulse
   ```

3. **Install dependencies:**

   ```bash
   npm i
   ```

4. **Setup environment variables:**

   Create a `.env` file in the root directory, with the following variables:

   ```bash
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   CLERK_WEBHOOK_SIGNING_SECRET=

   # Clerk Custom Routing
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

   # Prisma with Vercel Postgres
   POSTGRES_PRISMA_URL=
   POSTGRES_URL_NON_POOLING=
   ```

## Available Commands

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `npm run dev`    | Start the development server (localhost:3000) |
| `npm run lint`   | Lint the project                              |
| `npm run format` | Format the code                               |
| `npm run build`  | Build the app for production                  |
| `npm run start`  | Run the production build                      |
