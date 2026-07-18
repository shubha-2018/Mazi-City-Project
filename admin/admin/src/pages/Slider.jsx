import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function Slider() {
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    loadSliders();
  }, []);

  const loadSliders = () => {
    const data = JSON.parse(localStorage.getItem("sliders")) || [];
    setSliders(data);
  };

  const deleteSlider = (index) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;

    const updated = [...sliders];
    updated.splice(index, 1);

    localStorage.setItem("sliders", JSON.stringify(updated));
    setSliders(updated);
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Home Slider</h3>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/slider/add")}
        >
          + Add Slider
        </button>
      </div>

      <div className="card shadow">
        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Status</th>
                <th width="170">Action</th>
              </tr>
            </thead>

            <tbody>
              {sliders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No sliders found
                  </td>
                </tr>
              ) : (
                sliders.map((slider, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={slider.image}
                        alt={slider.title}
                        width="120"
                        height="60"
                        style={{
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    </td>

                    <td>{slider.title}</td>

                    <td>{slider.subtitle}</td>

                    <td>
                      <span
                        className={`badge ${
                          slider.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {slider.status}
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-warning btn-sm me-2">
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteSlider(index)}
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

export default Slider;