_Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)_

---

# Scoring Graphic interface

This project is separated into two parts

1. Root of the project represents frontend part, which was built using [Svelte](https://svelte.dev)
2. `backend` folder contains backend part of the project, built using NodeJS

## Get started

If you just cloned the project, run `npm install` to install all the needed dependencies.

To run the project, run `npm run all` in the terminal. This will start both client and the server.

Navigate to http://localhost:5000

Or, if you want to start separately, open two terminals.

To run frontend, navigate to the root of the project and run

```bash
npm install
npm run dev
```

To run backend, from root of the projects run

```bash
cd backend/
npm install
nodemon
```

Navigate to http://localhost:5000

## Linting

Both frontend and backend have their own linting commands to assure code quality.

To run lint, go to either FE or BE directory and run `npm run lint`

To better check `.svelte` files run command `npm run check` in frontend directory.

## Bootstrap v5
https://sveltestrap.js.org/?path=/story/components--get-started

## Test cases
year - competitionID
2020 - ps-u20
2021 - ec21_0640
2021 - ps_10km