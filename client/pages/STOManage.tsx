import { useState } from "react";
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

interface STORecord {
  id: string;
  status: "Normal" | "Low Demand" | "High Demand";
  predictedSupply: number;
}

const mockData: STORecord[] = [
  { id: "JGL", status: "Normal", predictedSupply: 12 },
  { id: "DPK", status: "Low Demand", predictedSupply: 6 },
  { id: "TGR", status: "High Demand", predictedSupply: 18 },
  { id: "JKT", status: "Normal", predictedSupply: 13 },
  { id: "BGR", status: "High Demand", predictedSupply: 17 },
  { id: "BDG", status: "Low Demand", predictedSupply: 8 },
  { id: "BTR", status: "Normal", predictedSupply: 10 },
  { id: "BTN", status: "Normal", predictedSupply: 12 },
  { id: "BKS", status: "Normal", predictedSupply: 14 },
  { id: "JWK", status: "Low Demand", predictedSupply: 6 },
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

export default function STOManage() {
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
            STO Management
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
              placeholder="Search STO ID..."
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
                  onClick={() => setStatusFilter("High Demand")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  High Demand
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("Normal")}
                  className="px-4 py-3 font-medium hover:bg-gray-100 bg-gray-200"
                >
                  Normal
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("Low Demand")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  Low Demand
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
                  onClick={() => setSortBy("Sort by STO_id")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  Sort by STO_id
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Sort by Moving_avg_sales")}
                  className="px-4 py-3 font-medium hover:bg-gray-100"
                >
                  Sort by Moving_avg_sales
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Sort by supply_prediction")}
                  className="px-4 py-3 font-medium hover:bg-gray-100 bg-gray-200"
                >
                  Sort by supply_prediction
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Data Table */}
        <Card className="border-black rounded-xl">
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 p-6 border-b">
              <div className="font-poppins text-xl font-semibold text-black">
                STO ID
              </div>
              <div className="font-poppins text-xl font-semibold text-black">
                Status
              </div>
              <div className="font-poppins text-xl font-semibold text-black">
                Predicted supply
              </div>
              <div className="col-span-3 flex justify-end">
                <Button className="bg-green-400 hover:bg-green-500 text-black font-poppins font-bold rounded-2xl px-8 h-12">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-2"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M12 8V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M16 12H8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                  ADD STO
                </Button>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y">
              {filteredData.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-6 gap-4 p-4 items-center bg-white rounded-2xl"
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
                    {item.predictedSupply}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-black rounded-2xl px-4 py-2 font-poppins font-bold text-xl hover:bg-gray-50"
                    >
                      <svg
                        width="24"
                        height="20"
                        viewBox="0 0 32 28"
                        fill="none"
                        className="mr-2"
                      >
                        <path
                          d="M16 17.5C18.2091 17.5 20 15.933 20 14C20 12.067 18.2091 10.5 16 10.5C13.7909 10.5 12 12.067 12 14C12 15.933 13.7909 17.5 16 17.5Z"
                          fill="black"
                          stroke="black"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M1.5 14C1.5 14 6.652 4.66667 16 4.66667C25.348 4.66667 30.5 14 30.5 14C30.5 14 25.3467 23.3333 16 23.3333C6.65333 23.3333 1.5 14 1.5 14Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                      </svg>
                      Details
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-black rounded-2xl px-4 py-2 font-poppins font-bold text-lg hover:bg-gray-50"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="mr-2"
                      >
                        <path
                          d="M18.3334 5H3.33341C2.89139 5 2.46746 5.17559 2.1549 5.48816C1.84234 5.80072 1.66675 6.22464 1.66675 6.66667V10"
                          stroke="black"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M1.66675 15H16.6667C17.1088 15 17.5327 14.8244 17.8453 14.5118C18.1578 14.1993 18.3334 13.7754 18.3334 13.3333V10"
                          stroke="black"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M15 8.33334L18.3333 5.00001L15 1.66667"
                          stroke="black"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M5.00008 11.6667L1.66675 15L5.00008 18.3333"
                          stroke="black"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                      </svg>
                      Update
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-black rounded-2xl px-4 py-2 font-poppins font-bold text-lg hover:bg-gray-50"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="mr-2"
                      >
                        <path
                          d="M15.6083 8.33334H15.625L15.275 16.7358C15.2375 17.6283 14.5033 18.3333 13.61 18.3333H6.39C5.49667 18.3333 4.76167 17.6292 4.725 16.7358L4.375 8.33334H4.39167"
                          stroke="black"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M2.5 5H17.5"
                          stroke="black"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M7.5 5.00001V1.66667H12.5V5.00001"
                          stroke="black"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </svg>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 bg-white py-4">
          <div className="font-poppins text-base text-black">
            Showing 1-10 out of 500 STOs
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
