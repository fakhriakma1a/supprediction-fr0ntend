import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Package, TrendingUp, AlertTriangle, MapPin, Database } from 'lucide-react';

// TypeScript interfaces untuk Tooltip
interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

// Sample data untuk grafik - ganti dengan data asli dari API/backend Anda
const chartData = [
  {
    date: '2025-01-01',
    actual: 45,
    predicted: 42,
  },
  {
    date: '2025-01-02',
    actual: 52,
    predicted: 48,
  },
  {
    date: '2025-01-03',
    actual: 50,
    predicted: 41,
  },
  {
    date: '2025-01-04',
    actual: 61,
    predicted: 58,
  },
  {
    date: '2025-01-05',
    actual: 55,
    predicted: 52,
  },
  {
    date: '2025-01-06',
    actual: 67,
    predicted: 63,
  },
  {
    date: '2025-01-07',
    actual: 43,
    predicted: 47,
  },
];

// Custom Tooltip Component untuk menampilkan info saat hover
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-32">
        <p className="text-gray-600 text-sm font-poppins mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm font-poppins font-medium" style={{ color: entry.color }}>
              {entry.name === 'actual' ? 'Actual' : 'Predicted'}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Mock data for the dashboard
const metricsData = [
  {
    title: "Total STO",
    value: "2172",
    icon: (
      <div className="w-15 h-15 rounded-lg bg-blue-100 flex items-center justify-center">
        <MapPin className="w-16 h-16 text-blue-600" />
      </div>
    ),
  },
  {
    title: "Total Warehouse",
    value: "473",
    icon: (
      <div className="w-15 h-15 rounded-lg bg-green-100 flex items-center justify-center">
        <Package className="w-16 h-16 text-green-600" />
      </div>
    ),
  },
  {
    title: "Warehouse on Alert",
    value: "12",
    icon: (
      <div className="w-15 h-15 rounded-lg bg-red-100 flex items-center justify-center">
        <AlertTriangle className="w-16 h-16 text-red-600" />
      </div>
    ),
  },
  {
    title: "Prediction Accuracy",
    value: "92.5%",
    icon: (
      <div className="w-15 h-15 rounded-lg bg-purple-100 flex items-center justify-center">
        <TrendingUp className="w-16 h-16 text-purple-600" />
      </div>
    ),
  },
];

const salesLeaderboard = [
  { rank: 1, id: "TGR", value: "6", color: "#FFD700" },
  { rank: 2, id: "BGR", value: "5", color: "#C0C0C0" },
  { rank: 3, id: "JGL", value: "4", color: "#CD7F32" },
  { rank: 4, id: "JKT", value: "4", color: "#676767" },
  { rank: 5, id: "BTN", value: "3", color: "#676767" },
];

const warehouseLeaderboard = [
  { rank: 1, id: "JATINEGARA WH", value: "52", color: "#FFD700" },
  { rank: 2, id: "CILEUNGSI WH", value: "50", color: "#C0C0C0" },
  { rank: 3, id: "GANDARIA WH", value: "48", color: "#CD7F32" },
  { rank: 4, id: "GAMBIR WH", value: "46", color: "#676767" },
  { rank: 5, id: "CILEGON WH", value: "43", color: "#676767" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-8 pb-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="font-poppins text-5xl font-bold text-black mb-2">
            Hi, Welcome back Admin!
          </h2>
          <p className="font-poppins text-3xl text-sup-dark-gray">
            Here's the dashboard, you can view the information from the system
            data.
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-[1240px] mx-auto space-y-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {metricsData.map((metric, index) => (
              <Card
                key={index}
                className="sup-shadow border-black rounded-3xl bg-white"
              >
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="font-poppins text-xl font-normal text-black">
                      {metric.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-poppins text-4xl font-semibold text-black">
                        {metric.value}
                      </span>
                      <div className="flex-shrink-0">{metric.icon}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Chart Section - BAGIAN YANG DIUBAH */}
          <Card className="chart-shadow rounded-3xl bg-white">
            <CardContent className="p-8">
              <h3 className="font-poppins text-4xl font-semibold text-black mb-6">
                Supply Predictions vs Actual Graph
              </h3>

              {/* Interactive Chart Container */}
              <div className="relative h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
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
                    
                    {/* Actual Data Line */}
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="Actual"
                      stroke="#6b7280"
                      strokeWidth={3}
                      dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
                      activeDot={{ 
                        r: 6, 
                        fill: '#6b7280',
                        stroke: '#ffffff',
                        strokeWidth: 2
                      }}
                    />
                    
                    {/* Predicted Data Line */}
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
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Sales Record Leaderboard */}
            <Card className="chart-shadow rounded-3xl bg-white">
              <CardContent className="p-8">
                <h3 className="font-poppins text-4xl font-semibold text-black mb-6">
                  Sales Record Leaderboard
                </h3>

                {/* Header Row */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-2xl">
                  <span className="font-poppins text-xl font-semibold text-black">
                    Rank
                  </span>
                  <span className="font-poppins text-xl font-semibold text-black text-left">
                    STO_id
                  </span>
                  <span className="font-poppins text-xl font-semibold text-black text-center">
                    Avg_moving_sales
                  </span>
                </div>

                {/* Data Rows */}
                <div className="space-y-3">
                  {salesLeaderboard.map((item) => (
                    <div
                      key={item.rank}
                      className="grid grid-cols-3 gap-4 items-center p-4 bg-white border border-black rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: item.color }}
                        >
                          <span className="font-poppins font-semibold text-base text-black">
                            {item.rank}
                          </span>
                        </div>
                      </div>
                      <span className="font-poppins text-xl text-black text-left">
                        {item.id}
                      </span>
                      <span className="font-poppins text-xl text-black text-center">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Warehouse Supply Leaderboard */}
            <Card className="chart-shadow rounded-3xl bg-white">
              <CardContent className="p-8">
                <h3 className="font-poppins text-4xl font-semibold text-black mb-6">
                  Warehouse Supply Leaderboard
                </h3>

                {/* Header Row */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-2xl">
                  <span className="font-poppins text-xl font-semibold text-black">
                    Rank
                  </span>
                  <span className="font-poppins text-xl font-semibold text-black text-left">
                    WH_id
                  </span>
                  <span className="font-poppins text-xl font-semibold text-black text-center">
                    Total_supply
                  </span>
                </div>

                {/* Data Rows */}
                <div className="space-y-3">
                  {warehouseLeaderboard.map((item) => (
                    <div
                      key={item.rank}
                      className="grid grid-cols-3 gap-4 items-center p-4 bg-white border border-black rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: item.color }}
                        >
                          <span className="font-poppins font-semibold text-base text-black">
                            {item.rank}
                          </span>
                        </div>
                      </div>
                      <span className="font-poppins text-xl text-black text-left">
                        {item.id}
                      </span>
                      <span className="font-poppins text-xl text-black text-center">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}