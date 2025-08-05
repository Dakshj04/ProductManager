// app/models/product.model.js
import db from "./db.js";

// Constructor (optional)
export const Product = function(product) {
  this.title = product.title;
  this.description = product.description;
  this.price = product.price;
  this.published = product.published;
};

// Get all products
Product.getAll = (result) => {
  db.query("SELECT * FROM products", (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};

// Get by ID
Product.getById = (id, result) => {
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, res) => {
    if (err) return result(err, null);
    if (res.length) return result(null, res[0]);
    result({ kind: "not_found" }, null);
  });
};

// Create
Product.create = (newProduct, result) => {
  db.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) return result(err, null);
    result(null, { id: res.insertId, ...newProduct });
  });
};

// Update
Product.update = (id, product, result) => {
  db.query(
    "UPDATE products SET title = ?, description = ?, price = ?, published = ? WHERE id = ?",
    [product.title, product.description, product.price, product.published, id],
    (err, res) => {
      if (err) return result(err, null);
      if (res.affectedRows == 0) return result({ kind: "not_found" }, null);
      result(null, { id, ...product });
    }
  );
};

// Delete
Product.remove = (id, result) => {
  db.query("DELETE FROM products WHERE id = ?", [id], (err, res) => {
    if (err) return result(err, null);
    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);
    result(null, res);
  });
};
