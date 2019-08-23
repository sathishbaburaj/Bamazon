DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
id INT(10) NOT NULL AUTO_INCREMENT ,
products_name VARCHAR(50) NOT NULL,
department_id INT(10) NOT NULL,
price decimal(10,2) NOT NULL,
stock_quantity int(10) NOT NULL

);
SELECT * FROM products;
INSERT INTO products (id,products_name,department_id,price,stock_quantity)
VALUES (1,"Echo dot",1,34.99,100),
(2,"Micolindun V3blue Gaming Headset for PS4 Xbox One",1,32.99,25),
(3,"LEGO Creator 3in1 Underwater Robot",2,19.99,15),
(4,"Head Accel Road Bike",4,499.99,20),
(5,"The Unofficial Harry Potter Cookbook",5,24.34,10),
(6,"Google Pixelbook",1,999.99,50),
(7,"iRobot Roomba 690 Robot Vacuum",6,379.99,12),
(8,"ALBOHES Bread Maker",7,159.99,20),
(9,"Car Phone mount",8,19.99,100),
(10,"Avengers Endgame-Blue ray",9,24.99,50)

