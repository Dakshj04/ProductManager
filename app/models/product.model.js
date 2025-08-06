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
export const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

// Get by ID
export const getById = async (id) => {
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  if (rows.length === 0) {
    throw { kind: "not_found" };
  }
  return rows[0];
};

// Create
export const create = async (newProduct) => {
  const [result] = await db.query("INSERT INTO products SET ?", newProduct);
  return { id: result.insertId, ...newProduct };
};

// Update
export const update = async (id, product) => {
  const [result] = await db.query(
    "UPDATE products SET title = ?, description = ?, price = ?, published = ? WHERE id = ?",
    [product.title, product.description, product.price, product.published, id]
  );
  
  if (result.affectedRows === 0) {
    throw { kind: "not_found" };
  }
  return { id, ...product };
};

// Delete
export const remove = async (id) => {
  const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
  
  if (result.affectedRows === 0) {
    throw { kind: "not_found" };
  }
  return result;
};
