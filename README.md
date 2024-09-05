# FormPulse

Full-stack web app for creating and sharing forms, built with Next.js, TypeScript, and Tailwind CSS.

![image](https://github.com/user-attachments/assets/98d4bcec-c35a-4b6a-b227-0076cfc0dcae)

## Features

- **Drag-and-Drop Form Builder:**
  - Layout fields: paragraph, title, sub-title, spacer, separator,
  - Input fields: text, number, select, date, checkbox, textarea
- **Share Forms:** Generate a unique URL for easy sharing.
- **View Responses:** Access form submissions in a tabular format.
- **Analytics:** Track form views and submissions.

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

### Installation

```bash
npm install
```

### Environment Variables

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk Custom Routing
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Prisma with Vercel Postgres
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
```

## Commands

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `npm run dev`    | Start the development server (localhost:3000) |
| `npm run lint`   | Lint the project                              |
| `npm run format` | Format the code                               |
| `npm run build`  | Build the app for production                  |
| `npm run start`  | Run the production build                      |
