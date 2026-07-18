import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ dashboard }) {
  const data = {
    labels: [
      "Locations",
      "Categories",
      "Businesses",
      "Popular",
    ],

    datasets: [
      {
        label: "Total",
        data: [
          dashboard.totalLocations,
          dashboard.totalCategories,
          dashboard.totalBusinesses,
          dashboard.popularBusinesses,
        ],
      },
    ],
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header">
        <h5 className="mb-0">Statistics</h5>
      </div>

      <div className="card-body">
        <Bar data={data} />
      </div>
    </div>
  );
}

export default DashboardChart;