-- Active: 1680539604478@@127.0.0.1@3306

-- Exercicio 2

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users
VALUES ("1", "ste@labenu","123mudar");

INSERT INTO users
VALUES ("2", "maria@labenu",  "mudar321");

INSERT INTO users
VALUES ("3", "Joao@labenu",  "joao123@");

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT  NOT NULL, 
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products 
VALUES ("p1", "calca", 80, "roupas");

INSERT INTO products 
VALUES ("p2", "sandalia", 50, "calçados");

INSERT INTO products 
VALUES ("p3", "vestido", 94.25, "roupas");

INSERT INTO products 
VALUES ("p4", "bota", 150, "calçados");

INSERT INTO products 
VALUES ("p5", "cropped", 50, "roupas");

INSERT INTO products 
VALUES ("p6", "brincos", 99, "acessórios");


SELECT * FROM products;