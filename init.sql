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
  password VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS "vehicle"
(
  id BIGSERIAL PRIMARY KEY,
  "name" TEXT
);

-- Seed data into tables
INSERT INTO vehicle("name", owner)
VALUES 
('Audi'), 
('Honda'), 
('BMW');


