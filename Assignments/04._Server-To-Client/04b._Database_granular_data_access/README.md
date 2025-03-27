# Granular Access Database (Exposee Documentation)

This document contains all necessary information for the **Integrator** to connect to the PostgreSQL database running in Docker and validate granular access.

---

## Setup Overview

- **Database**: PostgreSQL 17 (in Docker)
- **Database Name**: `granular_access`
- **Authentication**: Role-based access with Row-Level Security (RLS)

---

##  Connection Info

### Host Environment

- **Host**: `localhost`
- **Port**: `5432`

### Roles and Credentials

| Role          | Password     | Description                                              |
|---------------|--------------|----------------------------------------------------------|
| `postgres`    | `postgres123`| Superuser, full access                                   |
| `reader_user` | `reader123`  | Can only read rows with `category = 'public'`            |
| `writer_user` | `writer123`  | Can read/write own rows (owner = current_user)          |
| `admin_user`  | `admin123`   | Full access to all data (SELECT, INSERT, DELETE, etc.)  |

### Example CLI Connection Commands (from host):

```bash
psql -U reader_user -d granular_access -h localhost -W
psql -U writer_user -d granular_access -h localhost -W
psql -U admin_user  -d granular_access -h localhost -W
```

If using Windows:

```powershell
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U reader_user -d granular_access -h localhost
```

---

## Table Info

### Table: `sensitive_data`

| Column   | Type    | Description                          |
|----------|---------|--------------------------------------|
| `id`     | SERIAL  | Primary Key                          |
| `category` | TEXT  | Type of data (e.g., public, private) |
| `content`  | TEXT  | The actual sensitive information     |
| `owner`    | TEXT  | Username of the data owner           |

### Seed Data:

```sql
INSERT INTO sensitive_data (category, content, owner) VALUES
  ('public', 'General information available to everyone', 'admin'),
  ('restricted', 'Confidential details only for managers', 'manager'),
  ('private', 'Personal user data', 'user1'),
  ('classified', 'Top-secret information', 'admin');
```

---

##  Access Control & RLS Policies

### `reader_user`
- SELECT rows where `category = 'public'`
- Cannot write or see private/restricted/classified data

### `writer_user`
- SELECT rows where `owner = current_user`
- INSERT rows only if `owner = current_user`
- Cannot see or insert data owned by others

### `admin_user`
- Full access
- SELECT, INSERT, DELETE, UPDATE on all rows

---

## 📸 Expected Behavior

| Action                       | Reader| Writer| Admin|
|------------------------------|-------|-------|------|
| View public row              | Y     | Y     | Y    |
| View classified row          | N     | N     | Y    |
| View own inserted row        | N     | Y     | Y    |
| Insert with foreign owner    | N     | N     | Y    |
| Insert with self as owner    | N     | Y     | Y    |

---

## Docker Notes 

```yaml
# docker-compose.yml
version: "3.9"
services:
  db:
    image: postgres:17
    container_name: granular_pg
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: granular_access
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

---

# Integrator Instructions

This guide will help you connect to the `granular_access` PostgreSQL database and verify the access restrictions based on your role. You must use the terminal/CLI — no code or GUI tools.

---

## 🔌 1. Connect to the database

Replace `MY_IP_ADDRESS` with the IP address of the Exposee.

```bash
psql -U reader_user -d granular_access -h MY_IP_ADDRESS -W
psql -U writer_user -d granular_access -h MY_IP_ADDRESS -W
psql -U admin_user  -d granular_access -h MY_IP_ADDRESS -W
```

Use the following passwords:
- `reader_user` → `reader123`
- `writer_user` → `writer123`
- `admin_user`  → `admin123`


## 2. Test as `reader_user`

```sql
SELECT * FROM sensitive_data;
```
You should only see rows where `category = 'public'`  
You should not see private, restricted, or classified rows

---

## 3. Test as `writer_user`

### a. Try selecting data:
```sql
SELECT * FROM sensitive_data;
```
Should return only rows where `owner = 'writer_user'` (if any)

### b. Insert a valid row:

```sql
INSERT INTO sensitive_data (category, content, owner)
VALUES ('private', 'Writer test row', 'writer_user');
```
Should succeed

### c. Re-run SELECT:

```sql
SELECT * FROM sensitive_data;

```
 Should return your inserted row

### d. Try inserting with a different owner (should fail):
```sql
INSERT INTO sensitive_data (category, content, owner)
VALUES ('private', 'This should fail', 'admin');

```
 Expected result: permission denied (rejected by RLS policy)

---

## 4. Test as `admin_user`

```sql
SELECT * FROM sensitive_data;
```
You should see **all rows**

Try inserting if desired — admin has full access:

```sql
INSERT INTO sensitive_data (category, content, owner)
VALUES ('classified', 'Admin test row', 'admin');

```
 Should succeed

---

## 📸 5. Take Screenshots

Take screenshots of the following steps as documentation:

- Terminal connections for each user
- `SELECT` results for each user
- `INSERT` attempts: both success and failure
- Any permission denied messages

---

This ensures verification of fine-grained access through PostgreSQL Row-Level Security (RLS).


