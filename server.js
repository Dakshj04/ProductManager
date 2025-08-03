import express from "express";
import cors from "cors";
import tutorialRoutes from "./app/routes/product.routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Root route (so "Cannot GET /" doesn't appear)
app.get("/", (req, res) => {
  res.send("API is running. Try /api/tutorials");
});

// ✅ Register tutorial routes
tutorialRoutes(app);

// ✅ Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
