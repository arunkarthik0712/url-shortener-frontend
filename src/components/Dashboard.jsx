import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import axiosInstance from "../api/axiosInstance";
import UrlList from "./UrlList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const [dailyCounts, setDailyCounts] = useState([]);
  const [monthlyCounts, setMonthlyCounts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axiosInstance.get("/api/urls/dash/count", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (data && data.dailyCounts && data.monthlyCounts) {
          setDailyCounts(data.dailyCounts);
          setMonthlyCounts(data.monthlyCounts);
        } else {
          setDailyCounts([]);
          setMonthlyCounts([]);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error fetching dashboard data",
          {
            theme: "colored",
          }
        );
      }
    };

    fetchDashboardData();
  }, []);

  const dailyData = {
    labels: dailyCounts.map(({ date }) => date),
    datasets: [
      {
        label: "URLs Created per Day",
        data: dailyCounts.map(({ count }) => count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const monthlyData = {
    labels: monthlyCounts.map(({ month }) => month),
    datasets: [
      {
        label: "URLs Created per Month",
        data: monthlyCounts.map(({ count }) => count),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="container-fluid container-dash mt-4">
      <div className="title">
        <h3 className="text-start mb-3">Dashboard</h3>
      </div>
      <div className="row">
        <div className="col-md-6 mt-2">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Daily URL Creation</h2>
              <Bar data={dailyData} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Monthly URL Creation</h2>
              <Line data={monthlyData} />
            </div>
          </div>
        </div>
      </div>
      <UrlList />
    </div>
  );
};

export default Dashboard;
