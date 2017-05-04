DROP TABLE IF EXISTS users_private_items;
DROP TABLE IF EXISTS private_items;
DROP TABLE IF EXISTS users_house_items;
DROP TABLE IF EXISTS houses_items;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS houses;
DROP TABLE IF EXISTS items;



CREATE TABLE items (
  id integer NOT NULL PRIMARY KEY,
  itemname text UNIQUE NOT NULL
);

CREATE TABLE houses (
  id  integer NOT NULL PRIMARY KEY,
  housename varchar(64) UNIQUE NOT NULL,
  password varchar(64) NOT NULL,
  salt text NOT NULL
);

CREATE INDEX houses_housename_index ON houses (housename);

CREATE TABLE users (
  id integer NOT NULL PRIMARY KEY,
  username text NOT NULL,
  house_id integer NOT NULL
);

CREATE INDEX users_house_id_index ON users (house_id);

CREATE TABLE sessions (
  id integer NOT NULL PRIMARY KEY,
  hash varchar(64) NOT NULL,
  house_id integer NOT NULL,
  user_id integer
);

CREATE TABLE houses_items (
  id integer NOT NULL PRIMARY KEY,
  house_id integer NOT NULL,
  item_id integer NOT NULL,
  need_to_restock boolean NOT NULL,
  notes text DEFAULT '',
  user_id integer
);

CREATE INDEX houses_items_house_id_index ON houses_items (house_id);

CREATE TABLE users_house_items (
    id integer NOT NULL PRIMARY KEY,
    user_id integer NOT NULL,
    houses_items_id integer NOT NULL
);

CREATE INDEX users_house_items_user_id_index ON users_house_items (user_id);

CREATE TABLE private_items (
  id integer NOT NULL PRIMARY KEY,
  user_id integer NOT NULL,
  item_id integer NOT NULL,
  need_to_restock boolean NOT NULL,
  notes text DEFAULT ''
);

CREATE INDEX private_items_user_id_index ON private_items (user_id);

CREATE TABLE users_private_items (
  id integer NOT NULL PRIMARY KEY,
  user_id integer NOT NULL,
  private_item_id integer NOT NULL
);

CREATE INDEX users_private_items_user_id_index ON users_private_items (user_id);

INSERT INTO items (id, itemname) VALUES
(1, 'peanut butter'),
(2, 'bananas'),
(3, 'icecream'),
(4, 'secret item');

INSERT INTO houses (id, housename, password, salt) VALUES
(1, 'SentinelsOfMagic', 'whatsthehashfunction', 'pepper'),
(2, 'hovse', 'password', 'msg');

INSERT INTO users (id, username, house_id) VALUES
(1, 'connor', 1),
(2, 'ivanna', 1),
(3, 'khoa', 1),
(4, 'april', 1),
(5, 'ramsha', 2);

INSERT INTO houses_items (id, house_id, item_id, need_to_restock, notes, user_id) VALUES
(1, 1, 2, true, 'what about plantains?', NULL),
(2, 1, 1, false, 'its pronounced gif', 3),
(3, 1, 3, true, DEFAULT, 1),
(4, 2, 3, false, 'pistachio flavored1', 5);

INSERT INTO private_items (id, user_id, item_id, need_to_restock, notes) VALUES
(1, 1, 4, false, 'must not let anyone know');
