import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface STOUpdateData {
  // Metadata STO
  stoId: string;
  potensiKonsumen: string;
  jarakKm: string;
  
  // Sales Harian STO
  tanggal: string;
  totalBarangTerjual: string;
  
  // ODP STO
  arsitekturId: string;
  totalPort: string;
  usedPort: string;
}

export default function STOUpdateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<STOUpdateData>({
    stoId: "JGL001",
    potensiKonsumen: "0.3",
    jarakKm: "50.5",
    tanggal: "18-07-2025",
    totalBarangTerjual: "5",
    arsitekturId: "ODP-JGL-FAX",
    totalPort: "100",
    usedPort: "30"
  });

  const handleInputChange = (field: keyof STOUpdateData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("STO update data submitted:", formData);
    // Handle form submission
  };

  const handleBack = () => {
    navigate("/sto-manage");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-6 md:px-20 lg:px-24 pb-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-black">
            STO Update Data Form
          </h1>
        </div>

        {/* Form Card */}
        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-8">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-poppins text-2xl md:text-3xl font-medium text-black">
                Update Metadata STO
              </h2>
              <Button
                onClick={handleBack}
                variant="outline"
                className="bg-red-200 hover:bg-red-300 border-red-300 text-black font-poppins font-medium rounded-xl px-6 py-2"
              >
                ← Back
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Section 1: Update Metadata STO */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-poppins text-lg font-semibold text-black">
                    STO ID
                  </Label>
                  <div className="font-poppins text-2xl font-bold text-black">
                    {formData.stoId}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="potensiKonsumen" className="font-poppins text-lg font-medium text-black">
                    Potensi Konsumen (0-1)
                  </Label>
                  <Input
                    id="potensiKonsumen"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={formData.potensiKonsumen}
                    onChange={(e) => handleInputChange("potensiKonsumen", e.target.value)}
                    className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jarakKm" className="font-poppins text-lg font-medium text-black">
                    Jarak (Km)
                  </Label>
                  <Input
                    id="jarakKm"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.jarakKm}
                    onChange={(e) => handleInputChange("jarakKm", e.target.value)}
                    className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                    required
                  />
                </div>
              </div>

              {/* Section 2: Update Data Sales Harian STO */}
              <div className="space-y-6 border-t pt-8">
                <h3 className="font-poppins text-xl md:text-2xl font-semibold text-black">
                  Update Data Sales Harian STO
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="tanggal" className="font-poppins text-lg font-medium text-black">
                    Tanggal (DD-MM-YYYY)
                  </Label>
                  <Input
                    id="tanggal"
                    type="text"
                    value={formData.tanggal}
                    onChange={(e) => handleInputChange("tanggal", e.target.value)}
                    className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalBarangTerjual" className="font-poppins text-lg font-medium text-black">
                    Total Barang Terjual
                  </Label>
                  <Input
                    id="totalBarangTerjual"
                    type="number"
                    min="0"
                    value={formData.totalBarangTerjual}
                    onChange={(e) => handleInputChange("totalBarangTerjual", e.target.value)}
                    className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                    required
                  />
                </div>
              </div>

              {/* Section 3: Update Data ODP STO */}
              <div className="space-y-6 border-t pt-8">
                <h3 className="font-poppins text-xl md:text-2xl font-semibold text-black">
                  Update Data ODP STO
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="arsitekturId" className="font-poppins text-lg font-medium text-black">
                    Arsitektur ID
                  </Label>
                  <Input
                    id="arsitekturId"
                    type="text"
                    value={formData.arsitekturId}
                    onChange={(e) => handleInputChange("arsitekturId", e.target.value)}
                    className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalPort" className="font-poppins text-lg font-medium text-black">
                    Total Port
                  </Label>
                  <Input
                    id="totalPort"
                    type="number"
                    min="0"
                    value={formData.totalPort}
                    onChange={(e) => handleInputChange("totalPort", e.target.value)}
                    className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usedPort" className="font-poppins text-lg font-medium text-black">
                    Used Port
                  </Label>
                  <Input
                    id="usedPort"
                    type="number"
                    min="0"
                    value={formData.usedPort}
                    onChange={(e) => handleInputChange("usedPort", e.target.value)}
                    className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  className="w-full h-12 bg-sup-red hover:bg-red-600 text-black font-poppins font-semibold text-lg rounded-xl"
                >
                  Submit STO Data
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
