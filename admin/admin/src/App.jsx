import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Locations from "./pages/Locations";
import AddLocation from "./pages/AddLocation";
import EditLocation from "./pages/EditLocation";

import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";

import Subcategories from "./pages/Subcategories";
import AddSubcategory from "./pages/AddSubcategory";

import Groceries from "./pages/Groceries";
import AddGrocery from "./pages/AddGrocery";

import Electronics from "./pages/Electronics";
import AddElectronics from "./pages/AddElectronics";

import Clothing from "./pages/Clothing";
import AddClothing from "./pages/AddClothing";

import Furniture from "./pages/Furniture";
import AddFurniture from "./pages/AddFurniture";

import Slider from "./pages/Slider";
import AddSlider from "./pages/AddSlider";

import PopularShop from "./pages/PopularShop";
import AddPopularShop from "./pages/AddPopularShop";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Locations */}
      <Route path="/locations" element={<Locations />} />
      <Route path="/locations/add" element={<AddLocation />} />
      <Route path="/locations/edit/:id" element={<EditLocation />} />

      {/* Categories */}
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/add" element={<AddCategory />} />
      <Route path="/categories/edit/:id" element={<AddCategory />} />

      {/* Subcategories */}
      <Route path="/subcategories" element={<Subcategories />} />
      <Route path="/subcategories/add" element={<AddSubcategory />} />
      <Route path="/subcategories/edit/:id" element={<AddSubcategory />} />

      {/* Grocery */}
      <Route path="/groceries" element={<Groceries />} />
      <Route path="/groceries/add" element={<AddGrocery />} />
      <Route path="/groceries/edit/:id" element={<AddGrocery />} />

      {/* Electronics */}
      <Route path="/electronics" element={<Electronics />} />
      <Route path="/electronics/add" element={<AddElectronics />} />
      <Route path="/electronics/edit/:id" element={<AddElectronics />} />

      {/* Clothing */}
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/clothing/add" element={<AddClothing />} />
      <Route path="/clothing/edit/:id" element={<AddClothing />} />

      {/* Furniture */}
      <Route path="/furniture" element={<Furniture />} />
      <Route path="/furniture/add" element={<AddFurniture />} />
      <Route path="/furniture/edit/:id" element={<AddFurniture />} />

      {/* Home Slider */}
      <Route path="/slider" element={<Slider />} />
      <Route path="/slider/add" element={<AddSlider />} />

      {/* Popular Shop */}
      <Route path="/popular-shop" element={<PopularShop />} />
      <Route path="/popular-shop/add" element={<AddPopularShop />} />
      <Route path="/popular-shop/edit/:id" element={<AddPopularShop />} />

    </Routes>
  );
}

export default App;