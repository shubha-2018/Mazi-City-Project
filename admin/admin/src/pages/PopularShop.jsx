import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function PopularShop() {
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = () => {
    const data = JSON.parse(localStorage.getItem("popularShops")) || [];
    setShops(data);
  };

  const deleteShop = (id) => {
    if (!window.confirm("Delete this shop?")) return;

    const updated = shops.filter((shop) => shop.id !== id);

    localStorage.setItem("popularShops", JSON.stringify(updated));

    setShops(updated);
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Popular Shops</h3>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/popular-shop/add")}
        >
          + Add Popular Shop
        </button>
      </div>

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Shop Name</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Discount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {shops.length === 0 ? (

                <tr>

                  <td colSpan="8" className="text-center">

                    No Popular Shops Found

                  </td>

                </tr>

              ) : (

                shops.map((shop, index) => (

                  <tr key={shop.id}>

                    <td>{index + 1}</td>

                    <td>

                      <img
                        src={shop.image}
                        alt={shop.shopName}
                        width="100"
                        height="60"
                        style={{
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />

                    </td>

                    <td>{shop.shopName}</td>

                    <td>{shop.category}</td>

                    <td>{shop.rating}</td>

                    <td>{shop.discount}</td>

                    <td>

                      <span
                        className={`badge ${
                          shop.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {shop.status}
                      </span>

                    </td>

                    <td>

                      <button className="btn btn-warning btn-sm me-2">
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteShop(shop.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default PopularShop;