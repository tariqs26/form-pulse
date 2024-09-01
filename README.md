# FormPulse

Full-stack web app for creating and sharing forms, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Drag-and-Drop Form Builder:**
  - Layout fields: Title, SubTitle, Spacer, Separator, Paragraph
  - Input fields: Text, Number, Select, Date, Checkbox, Textarea
- **Share Forms:** Generate a unique URL for easy sharing.
- **View Responses:** Access form submissions in a tabular format.

## Technologies

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
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

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
