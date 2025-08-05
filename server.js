import 'dotenv/config';
import express from "express";
import cors from "cors";
import productRoutes from "./app/routes/product.routes.js";


console.log('Environment variables:');
console.log('HOST:', process.env.HOST);
console.log('USER:', process.env.USER);
console.log('DB:', process.env.DB);

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Root route (so "Cannot GET /" doesn't appear)
app.get("/", (req, res) => {
  res.send("API is running. Try /api/products");
});

// ✅ Register tutorial routes
productRoutes(app);

// ✅ Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
