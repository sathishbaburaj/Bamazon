var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon_db",
  port: 3306
});

connection.connect(function(err) {
  if (err) throw err;
});

var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("------------------------------------------------------------");
    console.log("Welcome to Bamazon");
    console.log("------------------------------------------------------------");
    console.log("");
    console.log("Find your product below");

    var table = new Table({
      head: ["Product Id", "Product Descrioption", "Cost"],
      colWidths: [12, 50, 8],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["aqua"],
        compact: true
      }
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].products_name, res[i].price]);
    }

    console.log(table.toString());
    console.log("");
    shopping();

    // connection.end();
    // instantiate
  });
};

var shopping = function() {
  inquirer
    .prompt({
      name: "producttoBuy",
      type: "input",
      message:
        "Please enter the product id of the item that you want to purchase"
    })
    .then(function(answer) {
      var selection = answer.producttoBuy;
      connection.query("SELECT * FROM products WHERE id=?", selection, function(
        err,
        res
      ) {
        if (err) throw err;
        if (res.length === 0) {
          console.log(
            "That product doesn't exist,Please enter a Product from the list above"
          );
          shopping();
        } else {
          inquirer
            .prompt({
              name: "quantity",
              type: "input",
              message: "How many items would you like to purchase?"
            })
            .then(function(answer1) {
              var quantity = answer1.quantity;
              if (quantity > res[0].stock_quantity) {
                console.log(
                  "Sorry we have" +
                    res[0].stock_quantity +
                    "tems of the selected quantity"
                );
                shopping();
              } else {
                console.log("");
                console.log(res[0].products_name + " purchased");
                console.log(quantity + " quamtity @ $" + res[0].price);

                var newQuantity = res[0].stock_quantity - quantity;
                // console.log(newQuantity);
                connection.query(
                  "UPDATE products SET stock_quantity =? WHERE id =?",[ newQuantity,res[0].id],
                   
                  function(err, resUpdate) {
                    if (err) throw err;
                    console.log("");
                    console.log("Your Order has been Processed");
                    console.log("Thank you for Shopping with us...!");
                    console.log("");
                    connection.end();
                  }
                );
              }
            });
        }
      });
    });
};

display();
