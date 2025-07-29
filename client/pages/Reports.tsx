import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

interface DataRecord {
  stoId: string;
  avgSales: number;
  predictedSupply: number;
}

interface WarehouseRecord {
  warehouseId: string;
  stoConnected: number;
  totalSupply: number;
}

const finalPemodelanData: DataRecord[] = [
  { stoId: "JKT", avgSales: 9.8, predictedSupply: 15 },
  { stoId: "BGR", avgSales: 8.5, predictedSupply: 12 },
  { stoId: "DPK", avgSales: 7.2, predictedSupply: 8 },
  { stoId: "JGL", avgSales: 4.2, predictedSupply: 5 },
  { stoId: "TNB", avgSales: 8.1, predictedSupply: 10 },
];

const warehouseSupplyData: WarehouseRecord[] = [
  { warehouseId: "CILEUNGSI WH", stoConnected: 10, totalSupply: 20 },
  { warehouseId: "DEPOK WH", stoConnected: 12, totalSupply: 23 },
  { warehouseId: "MATARAM WH", stoConnected: 7, totalSupply: 18 },
  { warehouseId: "GAMBIR WH", stoConnected: 13, totalSupply: 25 },
  { warehouseId: "MAUMERE WH", stoConnected: 4, totalSupply: 10 },
];

function DataTable({ data }: { data: DataRecord[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="text-[20px] font-normal text-[#5C5757] pb-4 pl-8 font-poppins">
              STO_id
            </th>
            <th className="text-[20px] font-normal text-[#5C5757] pb-4 font-poppins">
              Avg_sales
            </th>
            <th className="text-[20px] font-normal text-[#5C5757] pb-4 font-poppins">
              Predicted_supply
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="border-none">
              <td className="text-[20px] font-normal text-black py-2 pl-8 font-poppins">
                {record.stoId}
              </td>
              <td className="text-[20px] font-normal text-black py-2 font-poppins">
                {record.avgSales}
              </td>
              <td className="text-[20px] font-normal text-black py-2 font-poppins">
                {record.predictedSupply}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WarehouseTable({ data }: { data: WarehouseRecord[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="text-[20px] font-normal text-[#5C5757] pb-4 pl-8 font-poppins">
              Warehouse_id
            </th>
            <th className="text-[20px] font-normal text-[#5C5757] pb-4 font-poppins">
              STO Connected
            </th>
            <th className="text-[20px] font-normal text-[#5C5757] pb-4 font-poppins">
              Total_supply
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="border-none">
              <td className="text-[20px] font-normal text-black py-2 pl-8 font-poppins">
                {record.warehouseId}
              </td>
              <td className="text-[20px] font-normal text-black py-2 font-poppins">
                {record.stoConnected}
              </td>
              <td className="text-[20px] font-normal text-black py-2 font-poppins">
                {record.totalSupply}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExportButton() {
  const handleExport = () => {
    // Export functionality would be implemented here
    console.log("Exporting report...");
  };

  return (
    <Button
      onClick={handleExport}
      className="bg-sup-red hover:bg-red-600 text-black font-bold text-[22px] h-[60px] px-8 rounded-[12px] flex items-center gap-4"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 18.6665V22.1665C3.5 23.4557 4.54417 24.4998 5.83333 24.4998H22.1667C23.4558 24.4998 24.5 23.4557 24.5 22.1665V18.6665"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M14 3.5V17.5V16.3333"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M8.1665 11.6667L13.9998 17.5001L19.8332 11.6667"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </svg>
      Export report
    </Button>
  );
}

export default function Reports() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <Navigation />

      {/* Main Content */}
      <div className="px-8">
        {/* Page Title */}
        <h1 className="text-[50px] font-bold text-black mb-12 ml-16 font-poppins">
          Export Data Reports
        </h1>

        {/* Data Cards Container */}
        <div className="max-w-[1164px] mx-auto space-y-8">
          {/* Data Final_pemodelan Card */}
          <Card className="bg-white rounded-[24px] chart-shadow border-none p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="text-[28px] font-medium text-black mb-4 font-poppins">
                  Data Final_pemodelan
                </h2>
                <p className="text-[18px] font-light text-[#5C5757] mb-8 font-poppins">
                  Data prediksi supply per-STO hasil dari model perhitungan.
                </p>
              </div>
              <ExportButton />
            </div>

            <DataTable data={finalPemodelanData} />

            <p className="text-[18px] font-light text-[#5C5757] mt-8 pl-8 font-poppins">
              Showing preview 5 of 2300 records.
            </p>
          </Card>

          {/* Data Warehouse_supply Card */}
          <Card className="bg-white rounded-[24px] chart-shadow border-none p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="text-[28px] font-medium text-black mb-4 font-poppins">
                  Data Warehouse_supply
                </h2>
                <p className="text-[18px] font-light text-[#5C5757] mb-8 font-poppins">
                  Data total prediksi supply Warehouse hasil dari prediksi tiap
                  STO.
                </p>
              </div>
              <ExportButton />
            </div>

            <WarehouseTable data={warehouseSupplyData} />

            <p className="text-[18px] font-light text-[#5C5757] mt-8 pl-8 font-poppins">
              Showing preview 5 of 480 records.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
