import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function AddSlider() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSlider = {
      id: Date.now(),
      title,
      subtitle,
      image: preview,
      status,
    };

    const sliders = JSON.parse(localStorage.getItem("sliders")) || [];

    sliders.push(newSlider);

    localStorage.setItem("sliders", JSON.stringify(sliders));

    alert("Slider Added Successfully");

    navigate("/slider");
  };

  return (
    <AdminLayout>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Add Home Slider</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Slider Title</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Slider Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Slider Subtitle</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Slider Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Choose Slider Image</label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
                required
              />
            </div>

            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-thumbnail"
                  width="250"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Status</label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success">
              Save Slider
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddSlider;