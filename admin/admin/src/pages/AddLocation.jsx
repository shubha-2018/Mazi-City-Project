import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import API from "../api/api";

function AddLocation() {
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    city: "",
    state: "",
    image: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setPreview(URL.createObjectURL(file));

  setFormData({
    ...formData,
    image: file,
  });
};

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const data = new FormData();

    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("status", formData.status);

    if(formData.image){
      data.append("image", formData.image);
    }

    await API.post("/locations", data,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });

    alert("Location Added Successfully");

    navigate("/locations");

  } catch(err){

    console.log(err);

    alert(err.response?.data?.message);

  }

};
  return (
    <AdminLayout>
      <div className="container-fluid">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            <h3>Add Location</h3>
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                {/* City */}

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    City Name
                  </label>

                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="Enter City Name"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* State */}

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="Enter State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Upload Image */}

               

                {/* Image Preview */}

             

                {/* Status */}

                

              </div>

              <button
                type="submit"
                className="btn btn-success"
              >
                Save Location
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

export default AddLocation;