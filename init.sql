-- Connect to postgres database first...
\c postgres;

-- Auto destroy defaultdb on start.
DROP DATABASE IF EXISTS defaultdb;

-- Create the database
CREATE DATABASE defaultdb;

-- Connect to the database
\c defaultdb;

-- Create tables
CREATE TABLE IF NOT EXISTS "user"
(
  username VARCHAR(16) PRIMARY KEY,
  password VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS "vehicle"
(
  id BIGSERIAL PRIMARY KEY,
  "name" TEXT
);

-- Seed data into tables
INSERT INTO "user"(username, password)
VALUES 
('john123', 'password123'), 
('mike123', 'password123'), 
('jake123', 'password123');

INSERT INTO vehicle("name")
VALUES 
('Audi'), 
('Honda'), 
('BMW');


