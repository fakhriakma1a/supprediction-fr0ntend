import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface STOInfo {
  id: string;
  supply: number;
  warehouse: string;
  potensiKonsumen: number;
  arsitekturTersedia: string;
  status: "Normal" | "Low Demand" | "High Demand";
}

interface SalesRecord {
  date: string;
  totalBarangTerjual: number;
}

interface ODPData {
  arsitekturId: string;
  totalPort: number;
  usedPort: number;
  status: "Available" | "Not Available";
}

const mockSTOData: Record<string, STOInfo> = {
  JGL: {
    id: "JGL",
    supply: 12,
    warehouse: "CILEUNGSI WH",
    potensiKonsumen: 7.2,
    arsitekturTersedia: "5/10",
    status: "Normal",
  },
  DPK: {
    id: "DPK",
    supply: 6,
    warehouse: "BEKASI WH",
    potensiKonsumen: 5.1,
    arsitekturTersedia: "3/8",
    status: "Low Demand",
  },
  TGR: {
    id: "TGR",
    supply: 18,
    warehouse: "TANGERANG WH",
    potensiKonsumen: 9.3,
    arsitekturTersedia: "8/12",
    status: "High Demand",
  },
};

const mockSalesData: SalesRecord[] = [
  { date: "23-01-2025", totalBarangTerjual: 4 },
  { date: "24-01-2025", totalBarangTerjual: 3 },
  { date: "25-01-2025", totalBarangTerjual: 2 },
  { date: "26-01-2025", totalBarangTerjual: 6 },
  { date: "27-01-2025", totalBarangTerjual: 5 },
];

const mockODPData: ODPData[] = [
  {
    arsitekturId: "ODP-JGL-FAX",
    totalPort: 8,
    usedPort: 5,
    status: "Not Available",
  },
  {
    arsitekturId: "ODP-JGL-FBX",
    totalPort: 8,
    usedPort: 2,
    status: "Available",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Normal":
      return "bg-green-500";
    case "Low Demand":
      return "bg-orange-600";
    case "High Demand":
      return "bg-blue-600";
    default:
      return "bg-gray-500";
  }
};

export default function STODetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const stoData = id ? mockSTOData[id] : null;

  if (!stoData) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="px-8 pb-8">
          <div className="text-center py-16">
            <h1 className="font-poppins text-2xl font-bold text-black">
              STO not found
            </h1>
            <Button
              onClick={() => navigate("/sto-manage")}
              className="mt-4 bg-sup-red hover:bg-red-600 text-white font-poppins font-medium rounded-2xl px-6 py-2"
            >
              Back to List
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-6 lg:px-24 pb-8 space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mt-8">
          <h1 className="font-poppins text-5xl font-bold text-black">
            STO Details
          </h1>
          <Button
            onClick={() => navigate("/sto-manage")}
            className="bg-sup-red hover:bg-red-600 text-white font-poppins font-medium rounded-2xl px-6 py-3 flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17 10H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 5L3 10L8 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to List
          </Button>
        </div>

        {/* STO Information Card */}
        <Card className="sup-shadow rounded-3xl">
          <CardContent className="p-8">
            <h2 className="font-poppins text-3xl font-medium text-black mb-6">
              STO's Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex">
                  <span className="font-poppins text-xl text-black w-48">
                    Kode STO
                  </span>
                  <span className="font-poppins text-xl text-black">:</span>
                  <span className="font-poppins text-xl text-black ml-4">
                    {stoData.id}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-poppins text-xl text-black w-48">
                    Supply
                  </span>
                  <span className="font-poppins text-xl text-black">:</span>
                  <span className="font-poppins text-xl text-black ml-4">
                    {stoData.supply}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-poppins text-xl text-black w-48">
                    Warehouse terhubung
                  </span>
                  <span className="font-poppins text-xl text-black">:</span>
                  <span className="font-poppins text-xl text-black ml-4">
                    {stoData.warehouse}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-poppins text-xl text-black w-48">
                    Potensi Konsumen
                  </span>
                  <span className="font-poppins text-xl text-black">:</span>
                  <span className="font-poppins text-xl text-black ml-4">
                    {stoData.potensiKonsumen}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-poppins text-xl text-black w-48">
                    Arsitektur tersedia
                  </span>
                  <span className="font-poppins text-xl text-black">:</span>
                  <span className="font-poppins text-xl text-black ml-4">
                    {stoData.arsitekturTersedia}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-poppins text-xl text-black w-48">
                    Status
                  </span>
                  <span className="font-poppins text-xl text-black">:</span>
                  <span
                    className={`px-4 py-1 rounded-2xl text-black font-poppins font-normal text-base ml-4 ${getStatusColor(stoData.status)}`}
                  >
                    {stoData.status}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Record Card */}
        <Card className="sup-shadow rounded-3xl">
          <CardContent className="p-8">
            <h2 className="font-poppins text-3xl font-medium text-black mb-6">
              STO's sales record
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-poppins text-xl text-gray-600 mb-4">
                  Tanggal
                </h3>
                <div className="space-y-3">
                  {mockSalesData.map((record, index) => (
                    <div
                      key={index}
                      className="font-poppins text-xl text-black"
                    >
                      {record.date}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-poppins text-xl text-gray-600 mb-4">
                  Total_barang_terjual
                </h3>
                <div className="space-y-3">
                  {mockSalesData.map((record, index) => (
                    <div
                      key={index}
                      className="font-poppins text-xl text-black"
                    >
                      {record.totalBarangTerjual}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Trend Prediction Card */}
        <Card className="sup-shadow rounded-3xl">
          <CardContent className="p-8">
            <h2 className="font-poppins text-3xl font-medium text-black mb-6">
              STO's Sales Trend Prediction
            </h2>
            <div className="h-80 bg-gray-50 rounded-3xl flex items-center justify-center">
              {/* Simplified chart representation */}
              <div className="relative w-full h-full p-8">
                <div className="absolute bottom-8 left-8 right-8 h-px bg-gray-300"></div>
                <div className="absolute left-8 top-8 bottom-8 w-px bg-gray-300"></div>

                {/* Trend line simulation */}
                <svg
                  className="absolute inset-8"
                  viewBox="0 0 400 200"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 120 L50 100 L100 80 L150 90 L200 70 L250 85 L300 75 L350 80 L400 75"
                    fill="none"
                    stroke="#8884d8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute bottom-2 right-8 bg-white px-2 py-1 rounded text-sm font-poppins text-gray-600">
                  2025-01-04 prediction: 61
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section with ODP Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available ODP */}
          <Card className="sup-shadow rounded-3xl">
            <CardContent className="p-8">
              <h2 className="font-poppins text-3xl font-medium text-black mb-6">
                STO's Available ODP
              </h2>
              <div className="flex items-center justify-center h-64">
                <div className="relative">
                  {/* Donut chart representation */}
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#4caf50"
                      strokeWidth="25"
                      strokeDasharray="150 350"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#2196f3"
                      strokeWidth="25"
                      strokeDasharray="100 400"
                      strokeDashoffset="-150"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="bg-gray-200 px-3 py-1 rounded-2xl">
                      <span className="font-poppins text-sm text-black">
                        Available: 1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ODP List */}
          <Card className="sup-shadow rounded-3xl">
            <CardContent className="p-8">
              <h2 className="font-poppins text-3xl font-medium text-black mb-6">
                STO'S ODP list
              </h2>

              {/* Table Headers */}
              <div className="grid grid-cols-4 gap-4 mb-4 font-poppins text-xl font-semibold text-black">
                <div>Arsitektur_id</div>
                <div>Total_port</div>
                <div>Used_port</div>
                <div>Status</div>
              </div>

              {/* Table Data */}
              <div className="space-y-3">
                {mockODPData.map((odp, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 items-center p-3 rounded-2xl border border-black"
                  >
                    <div className="font-poppins text-xl text-black">
                      {odp.arsitekturId}
                    </div>
                    <div className="font-poppins text-xl text-black">
                      {odp.totalPort}
                    </div>
                    <div className="font-poppins text-xl text-black">
                      {odp.usedPort}
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-2xl text-sm font-poppins text-black ${
                          odp.status === "Available"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {odp.status}
                      </span>
                    </div>
                  </div>
                ))}
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
