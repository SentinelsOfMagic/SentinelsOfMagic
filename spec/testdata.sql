INSERT INTO users_house_items (user_id, houses_items_id) VALUES
(1, 1),
(1, 2),
(1, 3);

INSERT INTO users_private_items (user_id, private_item_id) VALUES (1, 1);

INSERT INTO items (itemname) VALUES
('peanut butter'),
('bananas'),
('icecream'),
('secret item');

INSERT INTO houses (housename, password, salt) VALUES
('SentinelsOfMagic', 'whatsthehashfunction', 'pepper'),
('hovse', 'password', 'msg');

INSERT INTO users (username, house_id) VALUES
('connor', 1),
('ivanna', 1),
('khoa', 1),
('april', 1),
('ramsha', 2);

INSERT INTO houses_items (house_id, item_id, need_to_restock, notes, user_id) VALUES
(1, 2, true, 'what about plantains?', NULL),
(1, 1, false, 'its pronounced gif', 3),
(1, 3, true, DEFAULT, 1),
(2, 3, false, 'pistachio flavored1', 5);

INSERT INTO private_items (user_id, item_id, need_to_restock, notes) VALUES
(1, 4, false, 'must not let anyone know');
