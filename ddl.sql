CREATE TABLE supplier (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE product (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    minimum_margin DECIMAL(10, 2),
    price DECIMAL(10, 2)
);

-- create table Logistic - product_id (pk), stock, supplier_id (pk), supplier_price
CREATE TABLE logistic (
    product_id INTEGER,
    stock INTEGER,
    supplier_id INTEGER,
    supplier_price DECIMAL(10, 2),
    PRIMARY KEY (product_id, supplier_id)
);

-- create table customer - id (pk), name
CREATE TABLE customer (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

-- create table rfqAcceptedHistory, - id (pk, autoincrement), Customer_id, product_id, price_requested, price_suggestion, price_acepted
CREATE TABLE rfqAcceptedHistory (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    customer_id INTEGER,
    product_id INTEGER,
    price_requested DECIMAL(10, 2),
    price_suggestion DECIMAL(10, 2),
    price_accepted DECIMAL(10, 2)
);

-- inject data to customer use 10 random dumy data use faker 
INSERT INTO customer (name) VALUES ('John'), ('Doe'), ('Jane'), ('Doe'), ('Foo'), ('Bar'), ('Baz'), ('Qux'), ('Quux'), ('Corge');
-- inject data to Product use 10 random goods dumy data use faker
INSERT INTO product (name, minimum_margin, price) VALUES ('Laptop', 0.1, 1000), ('Mouse', 0.1, 10), ('Keyboard', 0.1, 20), ('Monitor', 0.1, 200), ('Headset', 0.1, 50), ('Speaker', 0.1, 100), ('Printer', 0.1, 200), ('Scanner', 0.1, 200), ('Projector', 0.1, 500), ('UPS', 0.1, 100);
-- inject data logistic use 10 random data use faker
INSERT INTO logistic (product_id, stock, supplier_id, supplier_price) VALUES (1, 100, 1, 900), (2, 100, 1, 9), (3, 100, 1, 18), (4, 100, 1, 180), (5, 100, 1, 45), (6, 100, 1, 90), (7, 100, 1, 180), (8, 100, 1, 180), (9, 100, 1, 450), (10, 100, 1, 90);
-- inject data rfqAcceptedHistory use 10 random data use faker
INSERT INTO rfqAcceptedHistory (customer_id, product_id, price_requested, price_suggestion, price_accepted) VALUES (1, 1, 1000, 900, 900), (2, 2, 10, 9, 9), (3, 3, 20, 18, 18), (4, 4, 200, 180, 180), (5, 5, 50, 45, 45), (6, 6, 100, 90, 90), (7, 7, 200, 180, 180), (8, 8, 200, 180, 180), (9, 9, 500, 450, 450), (10, 10, 100, 90, 90);
```










