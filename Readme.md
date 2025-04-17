# School Management Tool - Backend

This is the backend of the **School Management Tool**, built with **Node.js**, **Express**, **GraphQL**, **Prisma**, and **TypeScript**. It also uses **MySQL** as the database, managed via Docker.

---

## Features

- GraphQL API using Apollo Server
- Authentication with JWT
- Password encryption with bcrypt
- Database ORM with Prisma
- MySQL setup via Docker
- Environment variable support
- Development with TypeScript

---

# Running Project

## Backend

### Install Dependencies

```npm install```

### Create .env file

### Example

```
  DATABASE_URL="mysql://prisma:prisma123@localhost:3306/school"
  JWT_SECRET_KEY="secretkey"
  PORT=8000

  ADMIN_USER_NAME="Albert"
  ADMIN_USER_EMAIL="khachikyanalbert2019@gmail.com"
  ADMIN_USER_PASSWORD="admin123"
```

### Build and Up Docker Container

```docker-compose build && docker-compose up -d```

### Push Tables

```npx prisma generate && npx prisma db push```

### Add admin user with seed

```npm run seed```

### Run server

```npm run serve```

## Frontend

### Install Dependencies

```npm install```

### Create .env file

### Example

```
API_KEY="http://localhost:8000/graphql"
```

### Run

```npm run dev```