import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import API from "../api/api";

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const res = await API.get("/categories");

      // Backend Response:
      // {
      //   success:true,
      //   data:[]
      // }

      setCategories(res.data.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await API.delete(`/categories/${id}`);

      alert("Category Deleted Successfully");

      loadCategories();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Unable to delete category."
      );
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3>Categories</h3>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/categories/add")}
        >
          + Add Category
        </button>

      </div>

      <div className="card shadow">

        <div className="card-body">

          {loading ? (

            <div className="text-center py-5">
              <div className="spinner-border"></div>
            </div>

          ) : (

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {categories.length === 0 ? (

                  <tr>
                    <td colSpan="6" className="text-center">
                      No Categories Found
                    </td>
                  </tr>

                ) : (

                  categories.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>

                        {item.image && (

                          <img
                            src={`https://mazi-city-project-1.onrender.com/uploads/${item.image}`}
                            alt={item.name}
                            width="60"
                            height="60"
                            style={{
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />

                        )}

                      </td>

                      <td>{item.name}</td>

                      <td>{item.description}</td>

                      <td>

                        <span
                          className={`badge ${item.status === "Active"
                              ? "bg-success"
                              : "bg-secondary"
                            }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            navigate(`/categories/edit/${item.id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteCategory(item.id)}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </AdminLayout>
  );
}

export default Categories;