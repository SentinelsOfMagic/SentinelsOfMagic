DROP TABLE IF EXISTS users_private_items;
DROP TABLE IF EXISTS private_items;
DROP TABLE IF EXISTS users_house_items;
DROP TABLE IF EXISTS houses_items;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS houses;
DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  itemname text UNIQUE NOT NULL
);

CREATE TABLE houses (
  id  SERIAL PRIMARY KEY,
  housename varchar(64) UNIQUE NOT NULL,
  password varchar(64) NOT NULL,
  salt text NOT NULL
);

CREATE INDEX houses_housename_index ON houses (housename);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username text NOT NULL,
  house_id integer NOT NULL
);

CREATE INDEX users_house_id_index ON users (house_id);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  hash varchar(64) NOT NULL,
  house_id integer,
  user_id integer
);

CREATE TABLE houses_items (
  id SERIAL PRIMARY KEY,
  house_id integer NOT NULL,
  item_id integer NOT NULL,
  need_to_restock boolean NOT NULL,
  notes text DEFAULT '',
  user_id integer
);

CREATE INDEX houses_items_house_id_index ON houses_items (house_id);

CREATE TABLE users_house_items (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    houses_items_id integer NOT NULL
);

CREATE INDEX users_house_items_user_id_index ON users_house_items (user_id);

CREATE TABLE private_items (
  id SERIAL PRIMARY KEY,
  user_id integer NOT NULL,
  item_id integer NOT NULL,
  need_to_restock boolean NOT NULL,
  notes text DEFAULT ''
);

CREATE INDEX private_items_user_id_index ON private_items (user_id);

CREATE TABLE users_private_items (
  id SERIAL PRIMARY KEY,
  user_id integer NOT NULL,
  private_item_id integer NOT NULL
);

CREATE INDEX users_private_items_user_id_index ON users_private_items (user_id);

