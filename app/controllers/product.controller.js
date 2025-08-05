// app/controllers/product.controller.js
import { Product } from "../models/product.model.js";

export const getAllProducts = (req, res) => {
  Product.getAll((err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    res.send(data);
  });
};

export const getProductById = (req, res) => {
  Product.getById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).send({ message: "Not found." });
      return res.status(500).send({ message: err.message });
    }
    res.send(data);
  });
};

export const createProduct = (req, res) => {
  const { title, description, price, published } = req.body;
  const product = { title, description, price, published };

  Product.create(product, (err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    res.status(201).send(data);
  });
};

export const updateProduct = (req, res) => {
  const { title, description, price, published } = req.body;
  Product.update(req.params.id, { title, description, price, published }, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).send({ message: "Not found." });
      return res.status(500).send({ message: err.message });
    }
    res.send(data);
  });
};

export const deleteProduct = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).send({ message: "Not found." });
      return res.status(500).send({ message: err.message });
    }
    res.send({ message: "Deleted successfully" });
  });
};
