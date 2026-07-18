import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import API from "../api/api";


function AddFurniture() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    image: "",
    businessTitle: "",
    storeName: "",
    rating: "",
    review: "",
    location: "",
    description: "",
    mobileNumber: "",
    whatsappNumber: "",
  });

  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // No categories to load
  }, []);

  useEffect(() => {
    if (!isEditMode) return;
    const fetchItem = async () => {
      try {
        const res = await API.get(`/furniture/${id}`);
        if (res.data && res.data.data) {
          setFormData(res.data.data);
        }
      } catch (err) {
        alert("Furniture item not found");
        navigate("/furniture");
      }
    };
    fetchItem();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && typeof formData[key] === 'string' && formData[key].startsWith('http')) return;
        data.append(key, formData[key]);
      });
      if (isEditMode) {
        await API.put(`/furniture/${id}`, data, { headers: { "Content-Type": "multipart/form-data" }});
        alert("Furniture Updated Successfully");
      } else {
        await API.post("/furniture", data, { headers: { "Content-Type": "multipart/form-data" }});
        alert("Furniture Added Successfully");
      }
      navigate("/furniture");
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitError("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <AdminLayout>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>{isEditMode ? "Edit Furniture" : "Add Furniture"}</h3>
        </div>

        <div className="card-body">
          {submitError && (
            <div className="alert alert-danger mb-3">{submitError}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Furniture Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
                required={!isEditMode}
              />
            </div>

            {formData.image && (
              <div className="mb-3">
                <img
                  src={typeof formData.image === 'string' ? (formData.image.startsWith('http') ? formData.image : `http://localhost:5000/uploads/${formData.image}`) : URL.createObjectURL(formData.image)}
                  alt="Preview"
                  width="120"
                  className="img-thumbnail"
                />
              </div>
            )}

            <div className="mb-3">
              <label>Business Title</label>
              <input
                type="text"
                className="form-control"
                name="businessTitle"
                value={formData.businessTitle}
                onChange={handleChange}
                placeholder="e.g., Premium Furniture"
                required
              />
            </div>

            <div className="mb-3">
              <label>Store Name</label>
              <input
                type="text"
                className="form-control"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="e.g., Comfort Home"
                required
              />
            </div>

            <div className="mb-3">
              <label>Rating</label>
              <input
                type="number"
                className="form-control"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="e.g., 4.6"
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            <div className="mb-3">
              <label>Review Count</label>
              <input
                type="number"
                className="form-control"
                name="review"
                value={formData.review}
                onChange={handleChange}
                placeholder="e.g., 95"
                min="0"
              />
            </div>

            <div className="mb-3">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Industrial Area"
                required
              />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter detailed description..."
                required
              />
            </div>

            <div className="mb-3">
              <label>Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="e.g., +92 300 1234567"
                required
              />
            </div>

            <div className="mb-3">
              <label>WhatsApp Number</label>
              <input
                type="tel"
                className="form-control"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="e.g., +92 300 7654321"
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                {isEditMode ? "Update Furniture" : "Add Furniture"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/furniture")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddFurniture;
