import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function EditLocation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    city: "",
    state: "",
    district: "",
    pincode: "",
    image: "",
    status: "Active",
  });

  useEffect(() => {
    const locations =
      JSON.parse(localStorage.getItem("locations")) || [];

    const location = locations.find(
      (item) => item.id === Number(id)
    );

    if (location) {
      setFormData(location);
      setPreview(location.image);
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const image = URL.createObjectURL(file);

      setPreview(image);

      setFormData({
        ...formData,
        image,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const locations =
      JSON.parse(localStorage.getItem("locations")) || [];

    const updated = locations.map((item) =>
      item.id === Number(id)
        ? { ...formData, id: Number(id), image: preview }
        : item
    );

    localStorage.setItem(
      "locations",
      JSON.stringify(updated)
    );

    alert("Location Updated Successfully");

    navigate("/locations");
  };

  return (
    <AdminLayout>
      <div className="container-fluid">

        <div className="card shadow">

          <div className="card-header bg-warning">
            <h3>Edit Location</h3>
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>City Name</label>

                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>State</label>

                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

              

              

              

              

             
              </div>

              <button
                type="submit"
                className="btn btn-success"
              >
                Update Location
              </button>

              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => navigate("/locations")}
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default EditLocation;