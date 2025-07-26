import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InputSection {
  id: string;
  title: string;
  description: string;
  instruction: string;
  route: string;
}

const inputSections: InputSection[] = [
  {
    id: "sales",
    title: "Input data sales harian",
    description: "Update data penjualan harian STO.",
    instruction: "*Sesuaikan format tabel jika melakukan import file data (tanggal, STO_id, total_barang_terjual).",
    route: "/input/sales"
  },
  {
    id: "architecture",
    title: "Input data arsitektur jaringan",
    description: "Update data arsitektur dan utilisasi port ODP di area STO.",
    instruction: "*Sesuaikan format tabel jika melakukan import file data (STO_id, Arsitektur_id, Total_port, Used_port).",
    route: "/input/architecture"
  },
  {
    id: "metadata",
    title: "Input metadata STO",
    description: "Update metadata STO baru.",
    instruction: "*Sesuaikan format tabel jika melakukan import file data (STO_id, jarak_km, potensi_konsumen).",
    route: "/input/metadata"
  },
  {
    id: "warehouse",
    title: "Input data Warehouse",
    description: "Update data warehouse baru.",
    instruction: "*Sesuaikan format tabel jika melakukan import file data (WH_id, STO_id, WH_loc).",
    route: "/input/warehouse"
  }
];

export default function Input() {
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleManualInput = (route: string) => {
    navigate(route);
  };

  const handleFileImport = (sectionId: string) => {
    // Placeholder for file import functionality
    console.log(`Import file for ${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-6 md:px-20 lg:px-24 pb-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-black">
            Input Data
          </h1>
        </div>

        {/* Input Sections Grid */}
        <div className="grid grid-cols-1 gap-8">
          {inputSections.map((section) => (
            <Card 
              key={section.id}
              className="rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <CardContent className="p-8">
                {/* Section Header */}
                <div className="mb-6">
                  <h2 className="font-poppins text-2xl md:text-3xl font-medium text-black mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-2">
                    <p className="font-poppins text-xl md:text-2xl text-black">
                      {section.description}
                    </p>
                    <p className="font-poppins text-lg text-black">
                      {section.instruction}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Manual Input Button */}
                  <Button
                    onClick={() => handleManualInput(section.route)}
                    className="flex-1 h-12 bg-sup-red hover:bg-red-600 text-black font-poppins font-semibold text-lg rounded-xl flex items-center justify-center gap-3 transition-colors duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path 
                        d="M15.75 9H2.25" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeMiterlimit="10" 
                        strokeLinecap="square"
                      />
                      <path 
                        d="M9 2.25V15.75" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeMiterlimit="10" 
                        strokeLinecap="square"
                      />
                    </svg>
                    Input manually
                  </Button>

                  {/* Import File Button */}
                  <Button
                    onClick={() => handleFileImport(section.id)}
                    variant="outline"
                    className="md:w-60 h-12 border-black hover:bg-gray-50 text-black font-poppins font-semibold text-lg rounded-xl flex items-center justify-center gap-3 bg-red-200 hover:bg-red-300 transition-colors duration-200"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M19 22H5C3.346 22 2 20.654 2 19V15H4V19C4 19.551 4.448 20 5 20H19C19.552 20 20 19.551 20 19V15H22V19C22 20.654 20.654 22 19 22Z" 
                        fill="currentColor"
                      />
                      <path 
                        d="M18.4139 8L11.9999 1.586L5.58594 8L6.99994 9.414L10.9999 5.414V16H12.9999V5.414L16.9999 9.414L18.4139 8Z" 
                        fill="currentColor"
                      />
                    </svg>
                    Import file
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
