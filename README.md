# RATIONALE

I assumed, that the challenge is mostly about prototyping, not production-ready coding. So I didn't care about:

-   logging
-   documenting
-   writing specs
-   pagination
-   dealing with errors (network timeouts, database failure, etc).

I've focused on shipping the working prototype.

## Functionality

User could see all the reports and interact with them, i.e. blocking the source and resolving tickets. If the source is blocked, it's automatically blocked in every ticket referring to the same `sourceIdentityId`. Resolving ticket leads to its disappearing from the list.

## Technical composition

The data is stored in the PostgreSQL database, in two tables: `sources` (reserved for future ‘details’ functionality, only provides `blocked` flag) and `reports`, containing reports themselves.

The application is written using `next.js` framework, so server code is reused on client and vice versa. Project structure:

-   `api` folder contains API handlers, which accept requests to specific endpoints and return responses;
-   `components` contains React components (actually there is only one);
-   `l10n` contains translations;
-   `lib` contains server-side code, actually working with the data;
-   `migrations` contains database migrations;
-   `pages` contains endpoints being served, actually two of them: index page and a single `api` handler;
-   `public` contains static data (icon in this case);
-   `scripts` contains helper scripts;
-   `sql` contains parametrized sql requests;
-   `styles` contains modularized CSS styles.

The application exposes four endpoints:

-   `GET /` responds with the main page;
-   `GET /api/v1` returns a data for main page (actually, a list of active reports);
-   `PUT /api/v1/reports/:id` resolves a report (as required in the challenge; I actually dislike this composition, since `PUT` request semantically must replace the entire `report` resource, not just switch state);
-   `PUT /api/v1/sources/:id/block` blocks (or unblocks) the source

## Running

Prerequisites:

-   Node.js 13 or higher with `npm` installed;
-   PostgreSQL 12 or higher;

I tested on Ubuntu system, should presumably work on Mac or Windows either.

Running:

1. Install dependencies

```
npm install
npm install next
```

2. Migrate the database

```

DATABASE_URL=<connection-string> node node_modules/db-migrate/bin/db-migrate up

```

3. Populate with sample data

```

DATABASE_URL=<connection-string> node scripts/populate-db.js

```

4. Build the app and run it

```

npm run build
DATABASE_URL=<connection-string> npm run start

```

5. Open `localhost:3000` in the browser.

`<connection-string>` here is the PostgreSQL connection string in a `postgres://user:password@host/dbname` format.
