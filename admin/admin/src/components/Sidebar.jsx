import { Link } from "react-router-dom";
import {
  FaHome,
  FaImages,
  FaList,
  FaLayerGroup,
  FaStore,
  FaHotel,
  FaUtensils,
  FaCalendarAlt,
  FaImage,
  FaEnvelope,
  FaCog,
  FaMapMarkerAlt,
  FaDesktop,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "260px", minHeight: "100vh" }}
    >
      <h3 className="text-center mb-4">Mazi City</h3>

      <ul className="nav flex-column">

        {/* Dashboard */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard">
            <FaHome className="me-2" />
            Dashboard
          </Link>
        </li>

        {/* Home Slider */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/slider">
            <FaImages className="me-2" />
            Home Slider
          </Link>
        </li>

        {/* Locations */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/locations">
            <FaMapMarkerAlt className="me-2" />
            Locations
          </Link>
        </li>

        {/* Categories */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/categories">
            <FaList className="me-2" />
            Categories
          </Link>
        </li>

        {/* Businesses */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/subcategories">
            <FaLayerGroup className="me-2" />
            Businesses
          </Link>
        </li>

        {/* Grocery */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/groceries">
            <FaUtensils className="me-2" />
            Grocery
          </Link>
        </li>

        {/* Electronics */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/electronics">
            <FaDesktop className="me-2" />
            Electronics
          </Link>
        </li>

        {/* Clothing */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/clothing">
            👕 Clothing
          </Link>
        </li>

        {/* Furniture */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/furniture">
            🪑 Furniture
          </Link>
        </li>

        {/* Popular Shops */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/popular-shop">
            <FaStore className="me-2" />
            Popular Shops
          </Link>
        </li>

        
      

      

       
        {/* Contact */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/contacts">
            <FaEnvelope className="me-2" />
            Contact Messages
          </Link>
        </li>

        {/* Settings */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/settings">
            <FaCog className="me-2" />
            Settings
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;