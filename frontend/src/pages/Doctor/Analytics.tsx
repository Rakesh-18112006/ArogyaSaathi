import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Analytics() {
  const chartData = {
    labels: ["Malaria", "Dengue", "Flu", "Covid"],
    datasets: [
      {
        label: "Cases",
        data: [5, 3, 8, 2], // mock
        backgroundColor: "rgba(37, 99, 235, 0.7)",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Disease Trend Analytics</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default Analytics;
