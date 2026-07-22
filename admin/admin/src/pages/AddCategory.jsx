import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import API from "../api/api";

function AddCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      loadCategory();
    }
  }, []);

  const loadCategory = async () => {
    try {
      const res = await API.get(`/categories/${id}`);

      const category = res.data.data;

      setName(category.name);
      setDescription(category.description);
      setStatus(category.status);

      if (category.image) {
        setImage(`https://mazi-city-project-1.onrender.com/uploads/${category.image}`);
      }

    } catch (err) {
      console.log(err);
      alert("Category Not Found");
      navigate("/categories");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("status", status);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (isEditMode) {

        await API.put(`/categories/${id}`, formData);

        alert("Category Updated Successfully");

      } else {

        await API.post("/categories", formData);

        alert("Category Added Successfully");

      }

      navigate("/categories");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Something went wrong."
      );

    }
  };

  return (
    <AdminLayout>

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>
            {isEditMode ? "Edit Category" : "Add Category"}
          </h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Category Name</label>

              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Description</label>

              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Category Image</label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {image && (

              <div className="mb-3">

                <img
                  src={image}
                  alt="Preview"
                  width="120"
                  className="img-thumbnail"
                />

              </div>

            )}

            <div className="mb-3">

              <label>Status</label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              {isEditMode
                ? "Update Category"
                : "Save Category"}
            </button>

          </form>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AddCategory;