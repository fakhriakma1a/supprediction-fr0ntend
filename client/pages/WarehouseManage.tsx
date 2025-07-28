import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WarehouseRecord {
  id: string;
  status: "Normal" | "Low Stock" | "Critical";
  totalSupply: number;
}

const mockData: WarehouseRecord[] = [
  { id: "CILEUNGSI WH", status: "Normal", totalSupply: 50 },
  { id: "DEPOK WH", status: "Low Stock", totalSupply: 23 },
  { id: "MATARAM WH", status: "Critical", totalSupply: 12 },
  { id: "GAMBIR WH", status: "Normal", totalSupply: 46 },
  { id: "MAUMERE WH", status: "Critical", totalSupply: 10 },
  { id: "CILEUNGSI WH", status: "Low Stock", totalSupply: 24 },
  { id: "JATINEGARA WH", status: "Normal", totalSupply: 52 },
  { id: "GANDARIA WH", status: "Normal", totalSupply: 48 },
  { id: "CILEGON WH", status: "Normal", totalSupply: 43 },
  { id: "PADANG WH", status: "Low Stock", totalSupply: 26 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Normal":
      return "bg-green-500";
    case "Low Stock":
      return "bg-orange-500";
    case "Critical":
      return "bg-red-700";
    default:
      return "bg-gray-500";
  }
};

export default function WarehouseManage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Filter by Status");
  const [sortBy, setSortBy] = useState("Sort by");
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Filter by Status" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-8 pb-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-poppins text-5xl font-bold text-black mb-2">
            Warehouse Management
          </h1>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                className="text-gray-400"
              >
                <path
                  d="M18.5 18.5L13 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="square"
                />
                <path
                  d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="square"
                />
              </svg>
            </div>
            <Input
              placeholder="Search Warehouse ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 border-black rounded-3xl font-poppins"
            />
          </div>

          {/* Filter by Status */}
          <div className="relative">
            <DropdownMenu
              open={isStatusDropdownOpen}
              onOpenChange={setIsStatusDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-56 h-12 border-black rounded-2xl font-poppins text-gray-600 justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      width="17"
                      height="18"
                      viewBox="0 0 19 21"
                      fill="none"
                      className="text-gray-500"
                    >
                      <path
                        d="M17.6667 3.53571L11 10.2976V17.0595L7.66667 18.75V10.2976L1 3.53571V1H17.6667V3.53571Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                    {statusFilter}
                  </div>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 12 8"
                    fill="none"
                    className={`transition-transform ${isStatusDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M1 1L6 6.83L11 1"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border rounded-xl font-poppins">
                <DropdownMenuItem
                  onClick={() => setStatusFilter("Filter by Status")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  Filter by Status
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("Normal")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  Normal
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("Low Stock")}
                  className="px-4 py-3 font-medium hover:bg-gray-100 bg-gray-200"
                >
                  Low Stock
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("Critical")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  Critical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Sort by */}
          <div className="relative">
            <DropdownMenu
              open={isSortDropdownOpen}
              onOpenChange={setIsSortDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-80 h-12 border-black rounded-2xl font-poppins text-gray-600 justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-500"
                    >
                      <path
                        d="M9.39038 12.112L12.1684 14.89L14.9464 12.112"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.1682 14.89V4.88922"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.0564 8.77838H8.2792"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.0564 4.88922H8.2792"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.0564 1H12.1684"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {sortBy}
                  </div>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 14 10"
                    fill="none"
                    className={`transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M2 2L7 7.83333L12 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-white border rounded-xl font-poppins">
                <DropdownMenuItem
                  onClick={() => setSortBy("Sort by")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  Sort by
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Sort by WH_id")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  Sort by WH_id
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Sort by Connected_STOs")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  Sort by Connected_STOs
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Sort by Total_supply")}
                  className="px-4 py-3 font-medium hover:bg-gray-100 bg-gray-200"
                >
                  Sort by Total_supply
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Data Table */}
        <Card className="border-black rounded-xl">
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-6 border-b">
              <div className="font-poppins text-xl font-semibold text-black">
                WH_id
              </div>
              <div className="font-poppins text-xl font-semibold text-black">
                Status
              </div>
              <div className="font-poppins text-xl font-semibold text-black">
                Total_supply
              </div>
              <div className="font-poppins text-xl font-semibold text-black text-center">
                Actions
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y">
              {filteredData.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="grid grid-cols-3 gap-4 p-4 items-center bg-white rounded-2xl"
                >
                  <div className="font-poppins text-xl text-black font-medium">
                    {item.id}
                  </div>
                  <div>
                    <span
                      className={`px-4 py-2 rounded-2xl text-black font-poppins font-normal text-base ${getStatusColor(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="font-poppins text-xl text-black font-medium">
                    {item.totalSupply}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 bg-white py-4">
          <div className="font-poppins text-base text-black">
            Showing 1-10 out of 500 Warehouses
          </div>

          <div className="flex items-center gap-4">
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
                12
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
        </div>
      </main>
    </div>
  );
}
