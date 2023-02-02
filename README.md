<h1 align="center">
  Code snippets app
</h1>

### Table of content

- [Things used to create it](#things-used-to-create-it)
- [Basic features](#basic-features)
- [How to run it locally](#how-to-run-it-locally)
- [Screenshots](#screenshots)

## Things used to create it

- [TypeScript](https://www.typescriptlang.org)
- [NextJS](https://nextjs.org)
- [tRPC](https://trpc.io)
- [Zod](https://react-hook-form.com)
- [Zod Resolver](https://github.com/react-hook-form/resolvers#Zod)
- [React Hook Form](https://react-hook-form.com)
- [Tailwind](https://tailwindcss.com)
- [HeadlessUI](https://headlessui.com)
- [Prisma](https://www.prisma.io)
- [NextAuth](https://next-auth.js.org)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

## Basic features

- Signing in with a google account
- Adding a snippet
- Removing a snippet
- Updating a snippet
- Checking snippets with syntax highlighting
- Copy or download a snippet.

## How to run it locally

1. Clone the repository

```bash
git clone https://github.com/KamilGrocholski/snippets.git
```

2. Install dependencies

```bash
cd snippets
npm install
```

3. .env file

```
1. Rename the .env.example file to .env
2. Set the required env variables inside
```

4. Prisma

```bash
npx prisma db push
```

5. Run the app

```bash
npm run dev
```

## Screenshots

- Snippet view\
  ![screenshot](https://github.com/KamilGrocholski/snippets/blob/main/images/snippet_view.png?raw=true)

- Snippet creator\
  ![screenshot](https://github.com/KamilGrocholski/snippets/blob/main/images/snippet_creator.png?raw=true)

- List of snippets\
  ![screenshot](https://github.com/KamilGrocholski/snippets/blob/main/images/snippets_list_view.png?raw=true)

- User profile\
  ![screenshot](https://github.com/KamilGrocholski/snippets/blob/main/images/user_profile_view.png?raw=true)

- Logged in user's snippets\
  ![screenshot](https://github.com/KamilGrocholski/snippets/blob/main/images/my_snippets_list_view.png?raw=true)
