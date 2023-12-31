# Form Pulse

Form Pulse is a web application that allows users to create and share forms with others. It is built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Create forms in a drag-and-drop interface
  - Layout fields include: Title, SubTitle, Spacer, Separator and Paragraph
  - Input Fields include: Text, Number, Select, Date, Checkbox, Textarea
- Share form using a unique URL
- View form responses in a table

## Technologies Used

| Technology                                | Purpose            |
| ----------------------------------------- | ------------------ |
| [Next.js](https://nextjs.org/)            | Frontend Framework |
| [Tailwind CSS](https://tailwindcss.com/)  | CSS Framework      |
| [Radix UI](https://radix-ui.com/)         | Unstyled Components|
| [Prisma](https://www.prisma.io/)          | ORM                |
| [PostgreSQL](https://www.postgresql.org/) | Database           |
| [Zod](https://github.com/colinhacks/zod)  | Data Validation    |
| [Clerk](https://clerk.dev/)               | Authentication     |
| [ESLint](https://eslint.org/)             | Linting            |
| [Prettier](https://prettier.io/)          | Code Formatting    |

## Installation

```bash
npm i
# or
yarn install
# or
pnpm install
# or
bun install
```

## Available Commands

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the development server (localhost:3000) |
| `npm run build` | Build the app for production                  |
| `npm run start` | Run the built app in production mode          |
