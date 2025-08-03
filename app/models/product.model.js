import { query as _query } from "./db.js";


_query(
  `CREATE TABLE IF NOT EXISTS tutorials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    published BOOLEAN DEFAULT FALSE
  )`,
  (err) => {
    if (err) {
      console.error("❌ Failed to create 'products' table:", err.message);
    } else {
      console.log("✅ 'product' table is ready.");
    }
  }
);

// Constructor class
class Product {
  constructor(product) {
    this.title = product.title;
    this.description = product.description;
    this.published = product.published;
  }

  static create(newProduct, result) {
    _query("INSERT INTO tutorials SET ?", newProduct, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newProduct });
    });
  }

  static findById(id, result) {
    _query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
      } else {
        result({ kind: "not_found" }, null);
      }
    });
  }

  static getAll(title, result) {
    let query = "SELECT * FROM tutorials";
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }

    _query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      result(null, res);
    });
  }

  static getAllPublished(result) {
    _query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
  }

  static updateById(id, product, result) {
    _query(
      "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
      [product.title, product.description, product.published, id],
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        }

        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        result(null, { id: id, ...product });
      }
    );
  }

  static remove(id, result) {
    _query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    });
  }

  static removeAll(result) {
    _query("DELETE FROM tutorials", (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      result(null, res);
    });
  }
}

export default Product;
