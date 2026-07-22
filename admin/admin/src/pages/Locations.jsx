import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import API from "../api/api";

function Locations() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      setLoading(true);

      const res = await API.get("/locations");

      setLocations(res.data.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteLocation = async (id) => {
    if (!window.confirm("Delete this location?")) return;

    try {
      await API.delete(`/locations/${id}`);

      alert("Location Deleted Successfully");

      loadLocations();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Unable to delete location."
      );
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Locations</h3>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/locations/add")}
          >
            + Add Location
          </button>
        </div>

        <div className="card shadow">
          <div className="card-body">

            {loading ? (
              <div className="text-center">
                <div className="spinner-border"></div>
              </div>
            ) : (

              <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {locations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Locations Found
                      </td>
                    </tr>
                  ) : (

                    locations.map((item, index) => (

                      <tr key={item.id}>

                        <td>{index + 1}</td>

                        <td>
                          {item.image && (
                            <img
                              src={`https://mazi-city-project-1.onrender.com/uploads/${item.image}`}
                              alt={item.city}
                              width="60"
                              height="60"
                              style={{
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                          )}
                        </td>

                        <td>{item.city}</td>

                        <td>{item.state}</td>

                        <td>
                          <span
                            className={`badge ${item.status === "Active"
                                ? "bg-success"
                                : "bg-danger"
                              }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              navigate(`/locations/edit/${item.id}`)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteLocation(item.id)}
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

      </div>
    </AdminLayout>
  );
}

export default Locations;