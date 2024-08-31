# rest-api-nep1

Basic REST API Using Node, Express, PostgreSQL.

## Installation

Required

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/) - installation instruction below
- [Postman](https://www.postman.com/downloads/) - to test API endpoints

### REST server installation

```bash
git clone https://github.com/james-priest/rest-api-nep1.git
```

```bash
cd rest-api-nep1
npm install
```

### PostgresSQL installation

For Windows use [Windows Installer](https://www.postgresql.org/download/windows/) installer.

#### Mac installation

```bash
brew install postgresql
```

Start service

```bash
brew services start postgresql
```

Connect to default `postgres` database

```bash
psql postgres
```

Create role

```sql
postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
postgres=# ALTER ROLE me CREATEDB;
```

Login with new role to create database

```sql
postgres=# \q
psql -d postgres -U me
```

Create database and connect

```bash
postgres=> CREATE DATABASE api;
postgres=> \c api
```

Create Table

```sql
api=>
CREATE TABLE IF NOT EXISTS public.students (
    id serial NOT NULL,
    firstname varchar(40) NULL,
    lastname varchar(40) NULL,
    origin varchar(50) NULL,
    CONSTRAINT students_pkey PRIMARY KEY (id)
);
```

Seed data

```sql
INSERT INTO public.students (firstname,lastname,origin) VALUES
    ('Sam','Jones','New York'),
    ('Mary','Geller','Kenitra'),
    ('John','Doe','Pasadena'),
    ('Susan','Smith','Seattle');
    ('Mark','Moore','San Francisco');
```

## Usage

Use Postman to test API endpoints

- GET http://localhost/students
- GET http://localhost/students/:id
- PUT http://localhost/students
