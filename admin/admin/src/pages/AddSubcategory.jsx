import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import API from "../services/api";

function AddSubcategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

const [formData, setFormData] = useState({
  image: "",
  businessTitle: "",
  storeName: "",
  category: "",
  rating: "",
  review: "",
  location: "",
  description: "",
  mobileNumber: "",
  whatsappNumber: "",
  is_popular: "No",
});

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

useEffect(() => {
  loadCategories();
}, []);

const loadCategories = async () => {
  try {
    setCategoriesLoading(true);

    const res = await API.get("/categories");

    setCategories(res.data);

    setCategoriesLoading(false);
  } catch (err) {
    console.log(err);
    setCategoriesLoading(false);
  }
};

useEffect(() => {
  if (isEditMode) {
    loadBusiness();
  }
}, [id]);

const loadBusiness = async () => {
  try {
    const res = await API.get(`/businesses/${id}`);

 setFormData({
  image: res.data.data.image,
  businessTitle: res.data.data.businessTitle,
  storeName: res.data.data.storeName,
  category: res.data.data.category,
  rating: res.data.data.rating,
  review: res.data.data.review,
  location: res.data.data.location,
  description: res.data.data.description,
  mobileNumber: res.data.data.mobileNumber,
  whatsappNumber: res.data.data.whatsappNumber,
  is_popular: res.data.data.is_popular || "No",
});
  } catch (err) {
    console.log(err);
    alert("Business not found");
    navigate("/subcategories");
  }
};
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

    data.append("businessTitle", formData.businessTitle);
    data.append("storeName", formData.storeName);
    data.append("category", formData.category);
    data.append("rating", formData.rating);
    data.append("review", formData.review);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("whatsappNumber", formData.whatsappNumber);
    data.append("is_popular", formData.is_popular);
    data.append("status", "Active");

    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    if (isEditMode) {
      await API.put(`/businesses/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Business Updated Successfully");
    } else {
      await API.post("/businesses", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Business Added Successfully");
    }

    navigate("/subcategories");
  } catch (err) {
    console.log(err);

    setSubmitError(
      err.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <AdminLayout>
      <div className="container-fluid">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            <h3>{isEditMode ? "Edit Business" : "Add Business"}</h3>
            <small>
              Categories Status: {" "}
              <span style={{
                fontWeight: "bold",
                color: categories.length > 0 ? "#90EE90" : "#FFD700"
              }}>
                {categories.length > 0 ? "✓ Loaded" : "⏳ Loading..."}
              </span>
            </small>
          </div>

          <div className="card-body">
            {submitError && (
              <div className="alert alert-danger mb-3">
                {submitError}
              </div>
            )}

            {categories.length === 0 && !categoriesLoading && (
              <div className="alert alert-info mb-3">
                <strong>ℹ️ Note:</strong> No categories found. Make sure to add categories first from the Categories page.
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>Business Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImage}
                    required={!isEditMode}
                  />
                </div>

                {formData.image && (
                  <div className="col-md-6 mb-3">
                    <img
  src={
    formData.image instanceof File
      ? URL.createObjectURL(formData.image)
      : `http://localhost:5000/uploads/${formData.image}`
  }
  alt="Preview"
  width="220"
  className="img-thumbnail"
/>
                  </div>
                )}

                <div className="col-md-6 mb-3">
                  <label>Business Title</label>
                  <input
                    type="text"
                    name="businessTitle"
                    className="form-control"
                    value={formData.businessTitle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    className="form-control"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Category</label>
                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={categoriesLoading}
                  >
                    <option value="">
                      {categoriesLoading ? "Loading categories..." : "Select Main Category"}
                    </option>
                    {categories.length > 0 ? (
                  categories.data?.map((cat) => (
                        // <option key={cat.id || cat.name} value={cat.name || cat.categoryName || cat}>
                        <option
 key={cat.id}
 value={cat.name}
>
                          {cat.name || cat.categoryName || cat}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    className="form-control"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="e.g., 4.6"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Review</label>
                  <input
                    type="number"
                    name="review"
                    className="form-control"
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="e.g., 128"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Location</label>
                  <textarea
                    name="location"
                    rows="3"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    className="form-control"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>WhatsApp Number</label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    className="form-control"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                  />

                </div>
                <div className="col-md-6 mb-3">
  <label>Popular Shop</label>

  <select
    className="form-select"
    name="is_popular"
    value={formData.is_popular}
    onChange={handleChange}
  >
    <option value="No">No</option>
    <option value="Yes">Yes</option>
  </select>
</div>

              </div>

              <button type="submit" className="btn btn-success">
                {isEditMode ? "Update Business" : "Save Business"}
              </button>

              <button
                type="reset"
                className="btn btn-secondary ms-2"
              >
                Reset
              </button>

            </form>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default AddSubcategory;