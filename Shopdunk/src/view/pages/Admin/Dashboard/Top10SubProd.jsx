import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { TimePicker } from "@mui/x-date-pickers";
import MonthYearPicker from "./TimePicker";
import { useEffect, useState } from "react";
import { getTop10SubProd } from "../../../../services/dashboardService";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TopSubProducts() {
    const [selectedTime, setSelectedTime] = useState({
        year: new Date().getFullYear().toString(),
        month: null,
      });
    const [data,setData] = useState([]);
    const handleGetListData = async (year,month)=>{
        let rs = await getTop10SubProd(year,month);
        if(rs && rs?.length>0){
            
            setData(rs);
        }else{
            setData([])
        }
    }
    useEffect(() => {
        handleGetListData(selectedTime.year, selectedTime.month);
      }, [selectedTime]);
  const labels = data.map(
    (item) => item.sub_product.name
  );
  const values = data.map((item) => Number(item.total_sold));
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
        <MonthYearPicker onChange={(val) => setSelectedTime(val)}/>
      {/* Chart */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-center">
          📊 Top 10 sản phẩm chi tiết bán chạy theo {selectedTime.month !== null ? `tháng ${selectedTime.month}`: ``} năm {selectedTime.year}
        </h2>
        <Bar data={chartData} />
      </div>

      {/* Table */}
      {/* <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-center">
          📋 Product Details
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Sub-product</th>
                <th className="p-2">Main Product</th>
                <th className="p-2 text-right">Sold</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => (
                <tr key={item.subProductid} className="border-b">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{item.sub_product.name}</td>
                  <td className="p-2">
                    {item.sub_product.product_detail.product.name}
                  </td>
                  <td className="p-2 text-right">{item.total_sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
