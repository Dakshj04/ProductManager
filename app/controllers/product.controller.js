// app/controllers/product.controller.js
import { Product, getAllProducts, getById, create, update, remove } from "../models/product.model.js";

export const findAll = async (req, res) => {
  try {
    const data = await getAllProducts();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving products."
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const data = await getById(req.params.id);
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({ message: "Not found." });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, published } = req.body;
    const product = { title, description, price, published };
    const data = await create(product);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, published } = req.body;
    const data = await update(req.params.id, { title, description, price, published });
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({ message: "Not found." });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await remove(req.params.id);
    res.send({ message: "Deleted successfully" });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({ message: "Not found." });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};
