App demo: https://next-13-full-stack.vercel.app/

## Getting Started

1. Clone the repo
2. Create a `.env` file
```
MOVIES_DB_API_IMAGE_URL=https://image.tmdb.org/t/p/w500/
MOVIES_DB_API_URL=https://api.themoviedb.org/3/
MOVIES_DB_API_KEY=<api_key>
DATABASE_URL=postgresql://app:app@localhost:5432/db
GOOGLE_CLIENT_ID=<google_api_client_id>
GOOGLE_CLIENT_SECRET=<google_api_client_secret>
NEXTAUTH_SECRET=<random string>
NEXTAUTH_URL=http://localhost:3000
```
2. Install the dependencies by running `npm i`
3. Start the local postgres database by running `docker-compose up` in the root directory
   * You can also use a hosted database as well. If you don't have CREATEDB permissions you need to specify a `SHADOW_DATABASE_URL=` in the `.env` file
4. The first time you need to do a Prisma migration. To do that run ```npx prisma migrate dev```
5. To start the development run `npm run dev`
6. You can access the site on [http://localhost:3000](http://localhost:3000)

7. (On Linux or in WSL please run `chmod ug+x .husky/*` command. This is needed for the pre-commit hooks to work) 

## Design

- For stlying we use `Tailwind` with the [Flowbite](https://flowbite.com) component library 

## Development

Issue tracking: [Issues](https://github.com/users/nbotond20/projects/7/views/1?query=is%3Aopen+sort%3Aupdated-desc)

