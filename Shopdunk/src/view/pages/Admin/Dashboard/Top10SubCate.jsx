import { Bar, Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { TimePicker } from "@mui/x-date-pickers";
import MonthYearPicker from "./TimePicker";
import { useEffect, useState } from "react";
import { getTop10SubProd, getTop10Prod, getTop10Users, getTop10SubCate } from "../../../../services/dashboardService";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, ChartDataLabels);

export default function TopSubCate() {
  const [selectedTime, setSelectedTime] = useState({
    year: new Date().getFullYear().toString(),
    month: null,
  });
  const [data, setData] = useState([]);
  const handleGetListData = async (year, month) => {
    let rs = await getTop10SubCate(year, month);
    if (rs && rs?.length > 0) {
      console.log(rs);
      setData(rs);
    } else {
      setData([])
    }
  }
  useEffect(() => {
    handleGetListData(selectedTime.year, selectedTime.month);
  }, [selectedTime]);
  const labels = data.map(
    (item) => item.subCategoryName ? `${item.subCategoryName}` : "Khác"
  );
  const values = data.map((item) => Number(item.total_sold));
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#333',
        anchor: 'center',
        align: 'center',
        formatter: function (value, context) {
          const data = context.chart.data.datasets[0].data;
          const total = data.reduce((acc, val) => acc + val, 0);
          const percentage = (value / total) * 100;
          return percentage.toFixed(1) + '%';
        },
        font: {
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Đã bán: ${context.raw}`;
          },
        },
      },
    },
  };
  const COLORS = [
    "#f87171",
    "#fb923c",
    "#facc15",
    "#4ade80",
    "#2dd4bf",
    "#60a5fa",
    "#a78bfa",
    "#f472b6",
    "#94a3b8",
    "#fcd34d",
  ];
  const chartData = {
    labels,
    datasets: [
      {
        label: "Units Sold",
        data: values,
        backgroundColor: COLORS,
        borderRadius: 8,
      },
    ],
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <MonthYearPicker onChange={(val) => setSelectedTime(val)} />
      {/* Chart */}
      {chartData.datasets[0].data.length > 0 ?
        (<div className="p-4" >
          <h2 className="text-xl font-semibold mb-2 text-center"
            style={{
              minHeight: "77px"
            }}>
            📊 Top 10 danh mục có lượt mua nhiều nhất theo {selectedTime.month !== null ? `tháng ${selectedTime.month}` : ``} năm {selectedTime.year}
          </h2>
          <div className="p-4 d-flex justify-content-center">
            <Pie data={chartData} options={options} style={{ height: "220px", maxHeight: "100%" }} />
          </div>
        </div>) : (<div
          style={{
            position: "relative",
          }}
          className="text-center text-gray-500 italic p-8">
          <h2 className="mt-4 text-xl font-semibold mb-2 text-center"
            style={{
              minHeight: "77px"
            }}>
            📊 Top 10 danh mục có lượt mua nhiều nhất theo {selectedTime.month !== null ? `tháng ${selectedTime.month}` : ``} năm {selectedTime.year}
          </h2>
          <div
            style={{
              margin: "28px",
              width: "340px",
              height: "340px",
              background: "#b8b8b8",
              borderRadius: "50%"
            }}
          >
            <div style={{
              position: "absolute",
              right: "40px",
              display: "flex"
            }}>
              <span style={{
                marginRight: "8px",
                width: "28px",
                background: "#b8b8b8",
                display: "block",
                borderRadius: "2px"
              }}></span>
              <span>No data found</span>
            </div>
          </div>
        </div>)
      }
    </div>
  );
}
