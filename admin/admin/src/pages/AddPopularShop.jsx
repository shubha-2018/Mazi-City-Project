import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function AddPopularShop() {

  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [discount, setDiscount] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const shop = {
      id: Date.now(),
      image,
      shopName,
      category,
      rating,
      discount,
      address,
      phone,
      whatsapp,
      status,
    };

    const data =
      JSON.parse(localStorage.getItem("popularShops")) || [];

    data.push(shop);

    localStorage.setItem(
      "popularShops",
      JSON.stringify(data)
    );

    alert("Popular Shop Added Successfully");

    navigate("/popular-shop");

  };

  return (

    <AdminLayout>

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3>Add Popular Shop</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              placeholder="Shop Name"
              value={shopName}
              onChange={(e)=>setShopName(e.target.value)}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Rating"
              value={rating}
              onChange={(e)=>setRating(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Discount"
              value={discount}
              onChange={(e)=>setDiscount(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={(e)=>setWhatsapp(e.target.value)}
            />

            <input
              type="file"
              className="form-control mb-3"
              onChange={handleImage}
            />

            <select
              className="form-select mb-3"
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button className="btn btn-success">

              Save Shop

            </button>

          </form>

        </div>

      </div>

    </AdminLayout>

  );
}

export default AddPopularShop;