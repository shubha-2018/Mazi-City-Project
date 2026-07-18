const locationRoutes = require("./routes/locationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const businessRoutes = require("./routes/businessRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const sliderRoutes = require("./routes/sliderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const electronicsRoutes = require("./routes/electronicsRoutes");
const clothingRoutes = require("./routes/clothingRoutes");
const furnitureRoutes = require("./routes/furnitureRoutes");
const popularShopRoutes = require("./routes/popularShopRoutes");
require("dotenv").config();



const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api", authRoutes);
app.use("/api/login", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/businesses", businessRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/groceries", groceryRoutes);
app.use("/api/electronics", electronicsRoutes);
app.use("/api/clothing", clothingRoutes);
app.use("/api/furniture", furnitureRoutes);
app.use("/api/popular-shops", popularShopRoutes);


app.get("/", (req, res) => {
  res.send("Mazi City Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});