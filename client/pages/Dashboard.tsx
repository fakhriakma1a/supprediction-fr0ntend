import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        className="text-green-600"
      >
        <rect
          width="60"
          height="60"
          rx="8"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path
          d="M30 42C36.6274 42 42 36.6274 42 30C42 23.3726 36.6274 18 30 18C23.3726 18 18 23.3726 18 30C18 36.6274 23.3726 42 30 42Z"
          fill="currentColor"
        />
        <path d="M27 25L35 30L27 35V25Z" fill="white" />
      </svg>
    ),
  },
  {
    title: "Total Warehouse",
    value: "473",
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        className="text-blue-600"
      >
        <rect
          width="60"
          height="60"
          rx="8"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path
          d="M15 22.5L30 15L45 22.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M21 26.25V37.5C21 39.0975 22.0975 40.5 23.25 40.5H36.75C37.9025 40.5 39 39.0975 39 37.5V26.25"
          stroke="currentColor"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M15 22.5L19.5 25.125L30 18.75L40.5 25.125L45 22.5L30 15L15 22.5Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
      </svg>
    ),
  },
  {
    title: "Warehouse on Alert",
    value: "12",
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        className="text-red-600"
      >
        <rect
          width="60"
          height="60"
          rx="8"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path
          d="M30 15L39 39H21L30 15Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M30 24V33"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="30" cy="36" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Prediction Accuracy",
    value: "92.5%",
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        className="text-purple-600"
      >
        <rect
          width="60"
          height="60"
          rx="8"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path d="M15 45L45 15" stroke="currentColor" strokeWidth="3" />
        <path
          d="M15 30L27 18L37.5 28.5L45 21"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="27" cy="18" r="3" fill="currentColor" />
        <circle cx="37.5" cy="28.5" r="3" fill="currentColor" />
      </svg>
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