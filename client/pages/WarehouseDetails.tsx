import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CustomTooltip } from "@/components/CustomTooltip";

interface STORecord {
  id: string;
  predictedSupply: number;
  status: "Normal" | "Low demand" | "High demand";
}

const mockSTOData: STORecord[] = [
  { id: "JGL", predictedSupply: 12, status: "Normal" },
  { id: "DPK", predictedSupply: 6, status: "Low demand" },
  { id: "TGR", predictedSupply: 18, status: "High demand" },
];

const getSTOStatusColor = (status: string) => {
  switch (status) {
    case "Normal":
      return "bg-green-500";
    case "Low demand":
      return "bg-orange-600";
    case "High demand":
      return "bg-blue-600";
    default:
      return "bg-gray-500";
  }
};

// Supply trend chart data for Recharts
const supplyTrendData = [
  {
    date: '2025-01-01',
    supply: 25,
    predicted: 23,
  },
  {
    date: '2025-01-02',
    supply: 28,
    predicted: 26,
  },
  {
    date: '2025-01-03',
    supply: 23,
    predicted: 21,
  },
  {
    date: '2025-01-04',
    supply: 31,
    predicted: 29,
  },
  {
    date: '2025-01-05',
    supply: 27,
    predicted: 25,
  },
  {
    date: '2025-01-06',
    supply: null,
    predicted: 30,
  },
  {
    date: '2025-01-07',
    supply: null,
    predicted: 28,
  },
];

export default function WarehouseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Mock warehouse data
  const warehouseInfo = {
    name: "DEPOK WH",
    address: "Jl. Nusantara 2 No.11, Depok",
    distance: "20.2 Km",
    connectedSTOs: 12,
    currentTotalSupply: 23,
    status: "Low Stock",
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-6 md:px-20 lg:px-24 pb-8">
        {/* Page Title and Back Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-black">
            WAREHOUSE Details
          </h1>
          <Button
            onClick={() => navigate("/warehouse-manage")}
            className="bg-sup-red hover:bg-red-600 text-black font-poppins font-medium text-lg px-6 py-3 rounded-2xl flex items-center gap-3"
          >
            <svg width="20" height="18" viewBox="0 0 20 19" fill="none">
              <path
                d="M17 9.32178H3"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 4.80005L3 9.32179L8 13.8435"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to List
          </Button>
        </div>

        {/* Warehouse Information Card */}
        <Card className="rounded-3xl shadow-lg mb-8">
          <CardContent className="p-8">
            <h2 className="font-poppins text-2xl md:text-3xl font-medium text-black mb-6">
              Warehouse's Information : {warehouseInfo.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl">
              <div className="flex">
                <span className="font-poppins text-black w-48">
                  Alamat Warehouse
                </span>
                <span className="font-poppins text-black mx-2">:</span>
                <span className="font-poppins text-black">
                  {warehouseInfo.address}
                </span>
              </div>

              <div className="flex">
                <span className="font-poppins text-black w-48">
                  Jarak dari WH Pusat
                </span>
                <span className="font-poppins text-black mx-2">:</span>
                <span className="font-poppins text-black">
                  {warehouseInfo.distance}
                </span>
              </div>

              <div className="flex">
                <span className="font-poppins text-black w-48">
                  Jumlah STO terhubung
                </span>
                <span className="font-poppins text-black mx-2">:</span>
                <span className="font-poppins text-black">
                  {warehouseInfo.connectedSTOs}
                </span>
              </div>

              <div className="flex">
                <span className="font-poppins text-black w-48">
                  Current Total supply
                </span>
                <span className="font-poppins text-black mx-2">:</span>
                <span className="font-poppins text-black">
                  {warehouseInfo.currentTotalSupply}
                </span>
              </div>

              <div className="flex items-center">
                <span className="font-poppins text-black w-48">
                  Status Warehouse
                </span>
                <span className="font-poppins text-black mx-2">:</span>
                <span className="px-4 py-2 rounded-2xl text-black font-poppins bg-orange-500">
                  {warehouseInfo.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Section */}
        <Card className="chart-shadow rounded-3xl mb-8">
          <CardContent className="p-8">
            <h2 className="font-poppins text-2xl md:text-3xl font-medium text-black mb-6">
              Warehouse Total Supply Trend Prediction
            </h2>

            {/* Interactive Chart Container */}
            <div className="relative h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl p-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={supplyTrendData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => value.split('-')[2]} // Show only day
                    className="font-poppins"
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    className="font-poppins"
                  />
                  
                  {/* Custom Tooltip */}
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }}
                  />
                  
                  {/* Legend */}
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontFamily: 'Poppins' }}
                  />
                  
                  {/* Supply Data Line */}
                  <Line
                    type="monotone"
                    dataKey="supply"
                    name="Supply"
                    stroke="#6b7280"
                    strokeWidth={3}
                    dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
                    activeDot={{ 
                      r: 6, 
                      fill: '#6b7280',
                      stroke: '#ffffff',
                      strokeWidth: 2
                    }}
                    connectNulls={false}
                  />
                  
                  {/* Predicted Supply Line */}
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    name="Predicted"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ 
                      r: 6, 
                      fill: '#10b981',
                      stroke: '#ffffff',
                      strokeWidth: 2
                    }}
                    connectNulls={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section - Charts and STO List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribution Chart */}
          <Card className="rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <h2 className="font-poppins text-2xl md:text-3xl font-medium text-black mb-6">
                Distribusi Supply STO
              </h2>

              {/* Pie Chart Placeholder */}
              <div className="flex items-center justify-center h-64">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Pie chart segments */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#76FF45"
                    strokeWidth="40"
                    strokeDasharray="125.6 377"
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#F82D2D"
                    strokeWidth="40"
                    strokeDasharray="87.9 377"
                    strokeDashoffset="-125.6"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#4C2CFF"
                    strokeWidth="40"
                    strokeDasharray="163.5 377"
                    strokeDashoffset="-213.5"
                    transform="rotate(-90 100 100)"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="bg-gray-200 rounded-2xl p-3 mt-4 text-center">
                <div className="text-xs text-black font-poppins">STO-DPK :</div>
                <div className="text-sm text-black font-poppins font-medium">
                  12
                </div>
              </div>
            </CardContent>
          </Card>

          {/* STO List */}
          <Card className="rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <h2 className="font-poppins text-2xl md:text-3xl font-medium text-black mb-6">
                Warehouse STO list
              </h2>

              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="font-poppins text-xl font-semibold text-black">
                  STO_id
                </div>
                <div className="font-poppins text-xl font-semibold text-black">
                  Predicted_supply
                </div>
                <div className="font-poppins text-xl font-semibold text-black">
                  Status
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {mockSTOData.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border border-black rounded-2xl bg-white items-center"
                  >
                    <div className="font-poppins text-xl text-black font-medium">
                      {item.id}
                    </div>
                    <div className="font-poppins text-xl text-black font-medium text-center">
                      {item.predictedSupply}
                    </div>
                    <div className="flex justify-center">
                      <span
                        className={`px-4 py-2 rounded-2xl text-black font-poppins text-sm ${getSTOStatusColor(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Empty rows for design consistency */}
                <div className="grid grid-cols-3 gap-4 p-4 border border-black rounded-2xl bg-white">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 border border-black rounded-2xl bg-white">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 font-poppins font-semibold text-base text-black hover:bg-gray-100"
                >
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path
                      d="M11 11.25L4 6L11 0.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    className="w-9 h-9 bg-sup-red text-white rounded-lg font-poppins font-semibold"
                    size="sm"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    className="w-9 h-9 bg-white border border-gray-300 rounded-lg font-poppins font-semibold"
                    size="sm"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    className="w-9 h-9 bg-white border border-gray-300 rounded-lg font-poppins font-semibold"
                    size="sm"
                  >
                    3
                  </Button>
                  <Button
                    variant="outline"
                    className="w-9 h-9 bg-white border border-gray-300 rounded-lg font-poppins font-semibold"
                    size="sm"
                  >
                    ...
                  </Button>
                  <Button
                    variant="outline"
                    className="w-9 h-9 bg-white border border-gray-300 rounded-lg font-poppins font-semibold"
                    size="sm"
                  >
                    5
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="flex items-center gap-2 font-poppins font-semibold text-base text-black hover:bg-gray-100"
                >
                  Next
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path
                      d="M5 11.25L12 6L5 0.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
