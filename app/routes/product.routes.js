import express from 'express';
import * as products from '../controllers/product.controller.js';

export default function (app){
  const router = express.Router();

  router.post("/", products.create);
  router.get("/", products.findAll);
  router.get("/published", products.findAllPublished);
  router.get("/:id", products.findOne);
  router.put("/:id", products.update);
  router.delete("/:id", products.deleteOne); // Renamed to avoid confusion with deleteAll
  router.delete("/", products.deleteAll);

  app.use('/api/products', router);
}
