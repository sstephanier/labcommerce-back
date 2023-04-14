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

-- Relações SQL
-- Create Purchase
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

DROP TABLE purchases;

-- Insert Purchase
INSERT INTO purchases 
VALUES ("1", 150.50, 0, NULL, "1"),
       ("2", 80.00, 1, "2023-03-31 10:30:00", "3"),
       ("3", 250.00, 0, NULL, "2");

SELECT * FROM purchases;

--Exercício 2

-- Inserir dois pedidos para cada usuário
INSERT INTO purchases
     VALUES 
    ("p1", 120.50, 0, NULL, "1"), 
    ("p2", 250.00, 0, NULL, "1"),
    ("p3", 85.00, 0, NULL, "2"),
    ("p4", 150.00, 0, NULL, "2"),
    ("p5", 50.00, 0, NULL, "3"),
    ("p6", 180.00, 0, NULL, "3");


-- Editar o status da data de entrega de um pedido
UPDATE purchases SET delivered_at = DATETIME('now') WHERE id = "p2";

SELECT * FROM purchases;

-- Ex 3

SELECT 
purchases.id, 
purchases.total_price, 
purchases.paid, 
purchases.delivered_at, 
users.email
FROM purchases
INNER JOIN users ON purchases.buyer_id = users.id
WHERE purchases.buyer_id = "1";

SELECT id, total_price, 
CASE 
WHEN paid = 1 
THEN 'paid' 
ELSE 'not paid' 
END AS status, delivered_at, buyer_id 
FROM purchases;

-- Relações SQL-II
-- Create table purchases_products
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

-- Inserção dos dados na tabela purchases_products
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
       ("c001", "p1", 5),
       ("c001", "p2", 3),
       ("c002", "p3", 2);

SELECT * FROM purchases_products;

DROP Table purchases_products;

-- Consulta com junção INNER-JOIN
SELECT purchases_products.purchase_id, purchases_products.product_id, purchases_products.quantity,
       purchases.total_price, purchases.paid, purchases.delivered_at,
       products.name, products.price, products.category
FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN products ON purchases_products.product_id = products.id;