# Form Pulse

Form Pulse is a web application that allows users to create and share forms with others. It is built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Create forms in a drag-and-drop interface
  - Layout fields include: Title, SubTitle, Spacer, Separator and Paragraph
  - Input Fields include: Text, Number, Select, Date, Checkbox, Textarea
- Share form using a unique URL
- View form responses in a table

## Technologies Used

| Technology                                | Purpose             |
| ----------------------------------------- | ------------------- |
| [Next.js](https://nextjs.org/)            | Frontend Framework  |
| [Tailwind CSS](https://tailwindcss.com/)  | CSS Framework       |
| [Radix UI](https://radix-ui.com/)         | Unstyled Components |
| [Prisma](https://www.prisma.io/)          | ORM                 |
| [PostgreSQL](https://www.postgresql.org/) | Database            |
| [Zod](https://github.com/colinhacks/zod)  | Data Validation     |
| [Clerk](https://clerk.dev/)               | Authentication      |
| [ESLint](https://eslint.org/)             | Linting             |
| [Prettier](https://prettier.io/)          | Code Formatting     |

## Setup

### Installation

```bash
npm i
```

### Environment Variables

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk custom routing
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Prisma with Vercel Postgres
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
```

## Available Commands

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the development server (localhost:3000) |
| `npm run build` | Build the app for production                  |
| `npm run start` | Run the built app in production mode          |
