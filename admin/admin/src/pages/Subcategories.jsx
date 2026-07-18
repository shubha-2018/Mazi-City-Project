import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import API from "../services/api";
function Subcategories() {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table or card

  useEffect(() => {
   loadBusinesses();

    // Set view mode based on screen size
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? "card" : "table");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 const loadBusinesses = async () => {
  try {
    setLoading(true);

    const res = await API.get("/businesses");

    setSubcategories(res.data.data);

    setBackendStatus("connected");

    setError("");

    setLoading(false);

  } catch (err) {

    console.log(err);

    setBackendStatus("disconnected");

    setError("Backend Connection Failed");

    setLoading(false);

  }
};

const deleteSubcategory = async (id) => {

  if (!window.confirm("Delete this business?"))
    return;

  try {

    await API.delete(`/businesses/${id}`);

    alert("Business Deleted Successfully");

    loadBusinesses();

  } catch (err) {

    console.log(err);

    alert("Delete Failed");

  }

};

  return (
    <AdminLayout>
      <div className="responsive-header" style={styles.responsiveHeader}>
        <h3 style={styles.title}>Businesses</h3>
        <button
          className="btn btn-primary"
          style={styles.addButton}
          onClick={() => navigate("/subcategories/add")}
        >
          <span style={{ marginRight: "5px" }}>+</span> Add Business
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mb-3">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* TABLE VIEW - Desktop */}
          {viewMode === "table" && (
            <div className="card shadow" style={styles.card}>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-sm table-bordered table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th style={styles.headerCell}>ID</th>
                        <th style={styles.headerCell}>Image</th>
                        <th style={styles.headerCell}>Business Title</th>
                        <th style={styles.headerCell}>Store Name</th>
                        <th style={styles.headerCell}>Category</th>
                        <th style={styles.headerCell}>Rating</th>
                        <th style={styles.headerCell}>Review</th>
                        <th style={styles.headerCell}>Location</th>
                        <th style={styles.headerCell}>Description</th>
                        <th style={styles.headerCell}>Mobile</th>
                        <th style={styles.headerCell}>WhatsApp</th>
                        <th style={styles.headerCell}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subcategories.length === 0 ? (
                        <tr>
                          <td colSpan="12" className="text-center py-4">
                            <p style={styles.emptyText}>No Businesses Found</p>
                          </td>
                        </tr>
                      ) : (
                        subcategories.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                              {item.image && (
                                <img
                                  src={`http://localhost:5000/uploads/${item.image}`}
                                  alt={item.businessTitle}
                                  width="36"
                                  height="36"
                                  style={styles.tableImage}
                                />
                              )}
                            </td>
                            <td style={styles.tableCell}>{item.businessTitle || "—"}</td>
                            <td style={styles.tableCell}>{item.storeName || "—"}</td>
                            <td style={styles.tableCell}>{item.category || "—"}</td>
                            <td style={styles.tableCell}>{item.rating || "—"}</td>
                            <td style={styles.tableCell}>{item.review || "—"}</td>
                            <td style={styles.tableCell}>{item.location || "—"}</td>
                            <td style={styles.descriptionCell}>
                              {item.description ? item.description.substring(0, 40) + "..." : "—"}
                            </td>
                            <td style={styles.tableCell}>{item.mobileNumber || "—"}</td>
                            <td style={styles.tableCell}>{item.whatsappNumber || "—"}</td>
                            <td style={styles.actionCell}>
                              <button
                                className="btn btn-warning btn-sm me-1"
                                onClick={() => navigate(`/subcategories/edit/${item.id}`)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteSubcategory(item.id)}
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
            </div>
          )}

          {/* CARD VIEW - Mobile */}
          {viewMode === "card" && (
            <div style={styles.cardContainer}>
              {subcategories.length === 0 ? (
                <div className="alert alert-info text-center">
                  <p style={styles.emptyText}>No Businesses Found</p>
                </div>
              ) : (
                subcategories.map((item, index) => (
                  <div key={item.id} className="card" style={styles.businessCard}>
                    <div style={styles.cardHeader}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.businessTitle}
                          style={styles.cardImage}
                        />
                      )}
                      <div style={styles.cardHeaderText}>
                        <h5 style={styles.cardTitle}>{item.businessTitle}</h5>
                        <p style={styles.cardSubtitle}>{item.storeName}</p>
                      </div>
                    </div>

                    <div style={styles.cardBody}>
                      <div style={styles.infoRow}>
                        <span style={styles.label}>Category:</span>
                        <span>{item.category || "—"}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <span style={styles.label}>Rating:</span>
                        <span>⭐ {item.rating || "—"}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <span style={styles.label}>Reviews:</span>
                        <span>{item.review || "—"}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <span style={styles.label}>Location:</span>
                        <span>{item.location || "—"}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <span style={styles.label}>Description:</span>
                        <span style={styles.description}>
                          {item.description || "—"}
                        </span>
                      </div>
                      <div style={styles.infoRow}>
                        <span style={styles.label}>Mobile:</span>
                        <span>{item.mobileNumber || "—"}</span>
                      </div>
                      <div style={styles.infoRow}>
                        <span style={styles.label}>WhatsApp:</span>
                        <span>{item.whatsappNumber || "—"}</span>
                      </div>
                    </div>

                    <div style={styles.cardFooter}>
                      <button
                        className="btn btn-warning btn-sm flex-grow-1 me-2"
                        onClick={() => navigate(`/subcategories/edit/${item.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm flex-grow-1"
                        onClick={() => deleteSubcategory(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}

      <style>{`
        @media (max-width: 767px) {
          .responsive-header {
            flex-direction: column !important;
            gap: 10px !important;
            align-items: stretch !important;
          }
          .responsive-header button {
            width: 100% !important;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

const styles = {
  responsiveHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    gap: "10px",
    flexWrap: "wrap",
  },
  title: {
    margin: 0,
    fontSize: "clamp(20px, 5vw, 28px)",
  },
  addButton: {
    whiteSpace: "nowrap",
  },
  card: {
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  headerCell: {
    minWidth: "80px",
    fontSize: "clamp(12px, 2vw, 14px)",
    padding: "12px",
  },
  tableCell: {
    fontSize: "clamp(12px, 2vw, 14px)",
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  descriptionCell: {
    maxWidth: "120px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "clamp(12px, 2vw, 14px)",
  },
  actionCell: {
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
  },
  tableImage: {
    objectFit: "cover",
    borderRadius: "5px",
  },
  emptyText: {
    margin: 0,
    color: "#666",
    fontSize: "16px",
  },
  // Card styles
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
    },
  },
  businessCard: {
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e9ecef",
    alignItems: "center",
  },
  cardImage: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px",
    flexShrink: 0,
  },
  cardHeaderText: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardBody: {
    padding: "12px",
    flex: 1,
    overflow: "auto",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "13px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "6px",
  },
  label: {
    fontWeight: "600",
    color: "#333",
    minWidth: "80px",
  },
  description: {
    wordBreak: "break-word",
    textAlign: "right",
  },
  cardFooter: {
    display: "flex",
    gap: "8px",
    padding: "12px",
    borderTop: "1px solid #e9ecef",
  },
};

export default Subcategories;