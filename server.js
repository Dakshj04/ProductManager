// server.js
import express from "express";
import cors from "cors";
import productRoutes from "./app/routes/product.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Product API." });
});

// Product routes
app.use("/api/products", productRoutes);

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
