CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

CREATE TABLE public.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(8,2) NOT NULL
);

CREATE TABLE public.knex_migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    batch INTEGER,
    migration_time TIMESTAMPTZ
);

CREATE TABLE public.knex_migrations_lock (
    index INTEGER PRIMARY KEY,
    is_locked INTEGER
);

-- Sample data
INSERT INTO public.users (first_name, last_name) VALUES
('John', 'Doe'),
('Jane', 'Smith');

INSERT INTO public.products (name, price) VALUES
('Apple', 3.50),
('Banana', 2.20);

INSERT INTO public.knex_migrations (name, batch, migration_time) VALUES
('20250403070649_create_users_products_tablenpx.js', 1, NOW());

INSERT INTO public.knex_migrations_lock (index, is_locked) VALUES (1, 0);
