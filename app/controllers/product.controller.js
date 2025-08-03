import Product from "../models/product.model.js";

// ✅ Create and Save a new Product
export function create(req, res) {
  const { title, description, published } = req.body;

  if (!title || !description) {
    return res.status(400).send({
      message: "Title and Description cannot be empty!"
    });
  }

  const product = new Product({
    title,
    description,
    published: published ?? false
  });

  Product.create(product, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Error creating the Product."
      });
    }
    res.send(data);
  });
}

// ✅ Retrieve all Products (optionally filtered by title)
export function findAll(req, res) {
  const title = req.query.title;

  Product.getAll(title, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Error retrieving Products."
      });
    }
    res.send(data);
  });
}

// ✅ Retrieve one Product by ID
export function findOne(req, res) {
  const id = req.params.id;

  Product.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Product not found with id ${id}.`
        });
      }
      return res.status(500).send({
        message: `Error retrieving Product with id ${id}.`
      });
    }
    res.send(data);
  });
}

// ✅ Retrieve all published Products
export function findAllPublished(req, res) {
  Product.getAllPublished((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Error retrieving published Products."
      });
    }
    res.send(data);
  });
}

// ✅ Update a Product by ID
export function update(req, res) {
  const id = req.params.id;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Request body cannot be empty."
    });
  }

  Product.updateById(id, new Product(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Product not found with id ${id}.`
        });
      }
      return res.status(500).send({
        message: `Error updating Product with id ${id}.`
      });
    }
    res.send(data);
  });
}

// ✅ Delete one Product by ID
export function deleteOne(req, res) {
  const id = req.params.id;

  Product.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Product not found with id ${id}.`
        });
      }
      return res.status(500).send({
        message: `Could not delete Product with id ${id}.`
      });
    }
    res.send({ message: `Product with id ${id} was deleted successfully.` });
  });
}

// ✅ Delete all Products
export function deleteAll(req, res) {
  Product.removeAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Error deleting all Products."
      });
    }
    res.send({ message: `All Products were deleted successfully.` });
  });
}
