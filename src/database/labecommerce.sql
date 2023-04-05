-- Active: 1680539604478@@127.0.0.1@3306

-- Exercicio 2
-- Create User
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users
VALUES ("1", "ste@labenu","123mudar"),
       ("2", "maria@labenu",  "mudar321"),
       ("3", "Joao@labenu",  "joao123@");

--Get All Users
SELECT * FROM users;

-- Create Product
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT  NOT NULL, 
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products 
VALUES ("p1", "calca", 80, "roupas"),
       ("p2", "sandalia", 50, "calçados"),
       ("p3", "vestido", 94.25, "roupas");

-- Get All Products 
SELECT * FROM products;

DROP TABLE users;

-- Search Product by name
SELECT * FROM products
WHERE name LIKE "%sandalia";

--Get Products by id
SELECT * FROM products WHERE id = "p1";

-- Delete User by id
DELETE FROM users WHERE id="2";

-- Delete Product by id
DELETE FROM products WHERE id="p3";

-- Edit User by id
UPDATE users SET email = "steph@labenu" WHERE id = "1";

-- Edit Product by id
UPDATE products SET name = "calça" WHERE id = "p1";

-- Get All Users
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versão 1
SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

-- Get All Products versão 2
SELECT * FROM products
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;