import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import API from "../api/api";
import DashboardChart from "./DashboardChart";

import {
  BsGrid3X3Gap,
  BsGeoAlt,
  BsShop,
  BsArrowUpRight,
} from "react-icons/bs";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalCategories: 0,
    totalLocations: 0,
    totalBusinesses: 0,
    popularBusinesses: 0,
  });

  const [recentBusinesses, setRecentBusinesses] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadRecentBusinesses();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRecentBusinesses = async () => {
    try {
      const res = await API.get("/businesses/recent");
      setRecentBusinesses(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const stats = [
    {
      label: "Total Categories",
      value: dashboard.totalCategories,
      icon: BsGrid3X3Gap,
      bg: "#EEF2FF",
      fg: "#4F46E5",
    },
    {
      label: "Total Locations",
      value: dashboard.totalLocations,
      icon: BsGeoAlt,
      bg: "#ECFDF5",
      fg: "#059669",
    },
    {
      label: "Popular Businesses",
      value: dashboard.popularBusinesses,
      icon: BsShop,
      bg: "#FFF7ED",
      fg: "#EA580C",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-4">
        <h2 className="fw-semibold mb-1" style={{ color: "#1E1B3A" }}>
          Dashboard
        </h2>

        <p className="text-muted mb-0">
          Overview of your platform activity.
        </p>
      </div>

      <div className="row g-4">

        {/* Total Businesses */}
        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm h-100 text-white"
            style={{
              background:
                "linear-gradient(135deg,#0F766E 0%,#4338CA 100%)",
              borderRadius: "1rem",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-between p-4">

              <div className="d-flex justify-content-between align-items-start">
                <p
                  className="text-uppercase small mb-0"
                  style={{
                    letterSpacing: "0.05em",
                    opacity: 0.8,
                  }}
                >
                  Total Businesses
                </p>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(255,255,255,0.18)",
                  }}
                >
                  <BsShop size={20} />
                </div>
              </div>

              <div>
                <h1 className="fw-bold mb-1">
                  {dashboard.totalBusinesses}
                </h1>

                <p
                  className="mb-0 small d-flex align-items-center gap-1"
                  style={{ opacity: 0.85 }}
                >
                  <BsArrowUpRight />
                  Live Database
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="col-lg-8">

          <div
            className="card border-0 shadow-sm h-100"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-0">

              {stats.map((stat, i) => {

                const Icon = stat.icon;

                return (

                  <div
                    key={stat.label}
                    className={`d-flex align-items-center justify-content-between px-4 py-3 ${
                      i !== stats.length - 1 ? "border-bottom" : ""
                    }`}
                  >

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: 40,
                          height: 40,
                          background: stat.bg,
                        }}
                      >
                        <Icon
                          size={18}
                          style={{ color: stat.fg }}
                        />
                      </div>

                      <span className="text-muted">
                        {stat.label}
                      </span>

                    </div>

                    <h4
                      className="fw-bold mb-0"
                      style={{ color: "#1E1B3A" }}
                    >
                      {stat.value}
                    </h4>

                  </div>

                );

              })}

            </div>
          </div>

        </div>

      </div>

      <div className="mt-4">
        <DashboardChart dashboard={dashboard} />
      </div>

      {/* Recent Businesses */}

      <div className="card shadow-sm mt-4">

        <div className="card-header bg-white">
          <h5 className="mb-0">Recent Businesses</h5>
        </div>

        <div className="card-body p-0">

          <table className="table table-hover mb-0">

            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Business</th>
                <th>Store</th>
                <th>Category</th>
                <th>Rating</th>
              </tr>
            </thead>

            <tbody>

              {recentBusinesses.length === 0 ? (

                <tr>
                  <td colSpan="5" className="text-center py-3">
                    No Businesses Found
                  </td>
                </tr>

              ) : (

                recentBusinesses.map((item, index) => (

                  <tr key={item.id}>

                    <td>{index + 1}</td>

                    <td>{item.businessTitle}</td>

                    <td>{item.storeName}</td>

                    <td>{item.category}</td>

                    <td>{item.rating}</td>

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

export default Dashboard;