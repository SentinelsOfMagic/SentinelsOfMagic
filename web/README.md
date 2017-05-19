# fridgr
Tracking groceries got you stressed? Chill.

## Team

  - April Ablon
  - Khoa Vo
  - Ivana He
  - Connor Wilson

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    - [Installing Dependencies](#installing-dependencies)
    - [Tasks](#tasks)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 6.4.x
- Postgresql 9.5.6

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### PostgreSQL

-Install Postgre on your machine in whatever manner suites you.

-Create a database called fridgr in PSQL

-Create a user (e.g. fridgr_app) with a password

-Grant this user permissions to access the database `fridgr`

-From project root run

```sh
psql -U fridgr_app -h 127.0.0.1 -W fridgr < ./database/fridgr.sql
```
-U tells psql to run command as user (like MySQL, note capital)

-h tells psql to make connection as if it were a server, this makes user access consistent with server access, and should save you from having to create two users, let me know if there are issues here

-W makes psql ask for password

Now that the database is created and running, create a config.js file in your database directory that module exports the string

'postgres://USERNAME:PASSWORD@localhost:5432/fridgr'

with appropriate replacements for username and password.

Now when running on your dev machine this will be used for database connection, else the heroku DATABASE_URL environment variable will be used.

For deployment to heroku, look up pg:push. Note: user will need schema permissions.


### Roadmap

View the project roadmap [here](https://trello.com/b/CBEpWlz0)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
