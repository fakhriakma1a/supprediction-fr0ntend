import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navigation from "@/components/Navigation";
import { usePredictionRange } from '@/hooks/usePredictionRange';

interface DataRecord {
  stoId: string;
  avgSales: number;
  predictedSupply: number;
  date: string;
}

interface WarehouseRecord {
  warehouseId: string;
  stoConnected: number;
  totalSupply: number;
  date: string;
}

const finalPemodelanData: DataRecord[] = [
  { stoId: "JKT", avgSales: 9.8, predictedSupply: 15, date: "2025-01-26" },
  { stoId: "BGR", avgSales: 8.5, predictedSupply: 12, date: "2025-01-26" },
  { stoId: "DPK", avgSales: 7.2, predictedSupply: 8, date: "2025-01-26" },
  { stoId: "JGL", avgSales: 4.2, predictedSupply: 5, date: "2025-01-26" },
  { stoId: "TNB", avgSales: 8.1, predictedSupply: 10, date: "2025-01-26" },
];

const warehouseSupplyData: WarehouseRecord[] = [
  { warehouseId: "CILEUNGSI WH", stoConnected: 10, totalSupply: 20, date: "2025-01-26" },
  { warehouseId: "DEPOK WH", stoConnected: 12, totalSupply: 23, date: "2025-01-26" },
  { warehouseId: "MATARAM WH", stoConnected: 7, totalSupply: 18, date: "2025-01-26" },
  { warehouseId: "GAMBIR WH", stoConnected: 13, totalSupply: 25, date: "2025-01-26" },
  { warehouseId: "MAUMERE WH", stoConnected: 4, totalSupply: 10, date: "2025-01-26" },
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
            <th className="text-[20px] font-normal text-[#5C5757] pb-4 font-poppins">
              Date
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
              <td className="text-[20px] font-normal text-black py-2 font-poppins">
                {record.date}
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
            <th className="text-[20px] font-normal text-[#5C5757] pb-4 font-poppins">
              Date
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
              <td className="text-[20px] font-normal text-black py-2 font-poppins">
                {record.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ExportButtonProps {
  data: DataRecord[] | WarehouseRecord[];
  filename: string;
  type: 'final_pemodelan' | 'warehouse_supply';
}

function ExportButton({ data, filename, type }: ExportButtonProps) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'xlsx'>('csv');

  const handleExport = () => {
    // Convert data to appropriate format
    let exportContent = '';
    const timestamp = new Date().toISOString().slice(0, 10);
    const fullFilename = `${filename}_${timestamp}.${exportFormat}`;

    if (exportFormat === 'csv') {
      if (type === 'final_pemodelan') {
        const csvData = data as DataRecord[];
        exportContent = 'STO_id,Avg_sales,Predicted_supply,Date\n';
        exportContent += csvData.map(row => 
          `${row.stoId},${row.avgSales},${row.predictedSupply},${row.date}`
        ).join('\n');
      } else {
        const csvData = data as WarehouseRecord[];
        exportContent = 'Warehouse_id,STO_Connected,Total_supply,Date\n';
        exportContent += csvData.map(row => 
          `${row.warehouseId},${row.stoConnected},${row.totalSupply},${row.date}`
        ).join('\n');
      }
    } else if (exportFormat === 'json') {
      exportContent = JSON.stringify(data, null, 2);
    }

    // Create and download file
    const blob = new Blob([exportContent], { 
      type: exportFormat === 'csv' ? 'text/csv' : 'application/json' 
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fullFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log(`Exported ${fullFilename} with ${data.length} records`);
  };

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-black rounded-lg px-4 py-2 font-poppins font-medium text-black hover:bg-gray-50"
          >
            {exportFormat.toUpperCase()}
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="ml-2">
              <path
                d="M1 1L6 6.83L11 1"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border rounded-xl font-poppins">
          <DropdownMenuItem
            onClick={() => setExportFormat('csv')}
            className="px-4 py-3 font-medium hover:bg-gray-100"
          >
            CSV
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setExportFormat('json')}
            className="px-4 py-3 font-medium hover:bg-gray-100"
          >
            JSON
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setExportFormat('xlsx')}
            className="px-4 py-3 font-medium hover:bg-gray-100"
          >
            XLSX (Coming Soon)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
    </div>
  );
}

export default function Reports() {
  const { rangeLabel } = usePredictionRange();
  const [dateFilter, setDateFilter] = useState('2025-01-26');
  const [warehouseDateFilter, setWarehouseDateFilter] = useState('2025-01-26');

  // Filter data based on date filters
  const filteredFinalData = finalPemodelanData.filter(item => 
    !dateFilter || item.date === dateFilter
  );

  const filteredWarehouseData = warehouseSupplyData.filter(item => 
    !warehouseDateFilter || item.date === warehouseDateFilter
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <Navigation />

      {/* Main Content */}
      <div className="px-8">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-12 ml-16">
          <h1 className="text-[50px] font-bold text-black font-poppins">
            Export Data Reports
          </h1>
          <div className="bg-sup-gray px-4 py-2 rounded-xl">
            <span className="font-poppins text-lg font-semibold text-black">
              {rangeLabel} Reports
            </span>
          </div>
        </div>

        {/* Data Cards Container */}
        <div className="max-w-[1164px] mx-auto space-y-8">
          {/* Data Final_pemodelan Card */}
          <Card className="bg-white rounded-[24px] chart-shadow border-none p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="text-[28px] font-medium text-black mb-4 font-poppins">
                  Data Final_pemodelan
                </h2>
                <p className="text-[18px] font-light text-[#5C5757] mb-4 font-poppins">
                  Data prediksi supply per-STO hasil dari model perhitungan.
                </p>
                
                {/* Date Filter */}
                <div className="flex items-center gap-4 mb-4">
                  <Label htmlFor="date-filter" className="font-poppins text-black font-medium">
                    Filter by Date:
                  </Label>
                  <Input
                    id="date-filter"
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-48 border-black rounded-lg font-poppins"
                  />
                </div>
              </div>
              <ExportButton 
                data={filteredFinalData} 
                filename="final_pemodelan" 
                type="final_pemodelan"
              />
            </div>

            <DataTable data={filteredFinalData} />

            <p className="text-[18px] font-light text-[#5C5757] mt-8 pl-8 font-poppins">
              Showing preview {filteredFinalData.length} of 2300 records for {rangeLabel.toLowerCase()} view.
            </p>
          </Card>

          {/* Data Warehouse_supply Card */}
          <Card className="bg-white rounded-[24px] chart-shadow border-none p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="text-[28px] font-medium text-black mb-4 font-poppins">
                  Data Warehouse_supply
                </h2>
                <p className="text-[18px] font-light text-[#5C5757] mb-4 font-poppins">
                  Data total prediksi supply Warehouse hasil dari prediksi tiap
                  STO.
                </p>

                {/* Date Filter */}
                <div className="flex items-center gap-4 mb-4">
                  <Label htmlFor="warehouse-date-filter" className="font-poppins text-black font-medium">
                    Filter by Date:
                  </Label>
                  <Input
                    id="warehouse-date-filter"
                    type="date"
                    value={warehouseDateFilter}
                    onChange={(e) => setWarehouseDateFilter(e.target.value)}
                    className="w-48 border-black rounded-lg font-poppins"
                  />
                </div>
              </div>
              <ExportButton 
                data={filteredWarehouseData} 
                filename="warehouse_supply" 
                type="warehouse_supply"
              />
            </div>

            <WarehouseTable data={filteredWarehouseData} />

            <p className="text-[18px] font-light text-[#5C5757] mt-8 pl-8 font-poppins">
              Showing preview {filteredWarehouseData.length} of 480 records for {rangeLabel.toLowerCase()} view.
            </p>
          </Card>

          {/* Range Configuration Export Card */}
          <Card className="bg-white rounded-[24px] chart-shadow border-none p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="text-[28px] font-medium text-black mb-4 font-poppins">
                  Range Configuration Export
                </h2>
                <p className="text-[18px] font-light text-[#5C5757] mb-4 font-poppins">
                  Export current prediction range configuration and settings.
                </p>
              </div>
              <Button
                onClick={() => {
                  const configData = {
                    currentRange: rangeLabel,
                    exportDate: new Date().toISOString(),
                    settings: {
                      predictionAccuracy: "92.5%",
                      totalSTOs: 2172,
                      totalWarehouses: 473,
                      alertWarehouses: 12
                    }
                  };
                  
                  const blob = new Blob([JSON.stringify(configData, null, 2)], { 
                    type: 'application/json' 
                  });
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `range_config_${new Date().toISOString().slice(0, 10)}.json`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[22px] h-[60px] px-8 rounded-[12px] flex items-center gap-4"
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
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                  <path
                    d="M14 3.5V17.5V16.3333"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                  <path
                    d="M8.1665 11.6667L13.9998 17.5001L19.8332 11.6667"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                </svg>
                Export Config
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-poppins text-xl font-semibold text-black mb-4">
                Current Configuration
              </h3>
              <div className="grid grid-cols-2 gap-4 text-lg font-poppins">
                <div>Range: {rangeLabel}</div>
                <div>Export Date: {new Date().toLocaleDateString()}</div>
                <div>Prediction Accuracy: 92.5%</div>
                <div>Total STOs: 2,172</div>
                <div>Total Warehouses: 473</div>
                <div>Alert Warehouses: 12</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
