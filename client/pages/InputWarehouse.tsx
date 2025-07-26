import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WarehouseData {
  whId: string;
  stoId: string;
  whLoc: string;
}

export default function InputWarehouse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WarehouseData>({
    whId: "CILEUNGSI_WH",
    stoId: "JGL001",
    whLoc: "Jl. Pasar Lama, Cileungsi, Bogor, Jawa Barat"
  });

  const handleInputChange = (field: keyof WarehouseData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Warehouse data submitted:", formData);
    // Show success message or redirect
  };

  const handleBack = () => {
    navigate("/input");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-6 md:px-20 lg:px-24 pb-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-black">
            Warehouse Update Data Form
          </h1>
        </div>

        {/* Form Card */}
        <Card className="max-w-4xl rounded-3xl shadow-lg">
          <CardContent className="p-8">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-poppins text-2xl md:text-3xl font-medium text-black">
                Update Warehouse Data
              </h2>
              <Button
                onClick={handleBack}
                variant="outline"
                className="bg-red-200 hover:bg-red-300 border-red-300 text-black font-poppins font-medium rounded-xl px-6 py-2"
              >
                ← Back
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Warehouse ID Field */}
              <div className="space-y-2">
                <Label htmlFor="whId" className="font-poppins text-lg font-medium text-black">
                  Warehouse ID
                </Label>
                <Input
                  id="whId"
                  type="text"
                  placeholder="CILEUNGSI_WH"
                  value={formData.whId}
                  onChange={(e) => handleInputChange("whId", e.target.value)}
                  className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                  required
                />
              </div>

              {/* STO ID Field */}
              <div className="space-y-2">
                <Label htmlFor="stoId" className="font-poppins text-lg font-medium text-black">
                  STO ID
                </Label>
                <Input
                  id="stoId"
                  type="text"
                  placeholder="JGL001"
                  value={formData.stoId}
                  onChange={(e) => handleInputChange("stoId", e.target.value)}
                  className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                  required
                />
              </div>

              {/* Warehouse Location Field */}
              <div className="space-y-2">
                <Label htmlFor="whLoc" className="font-poppins text-lg font-medium text-black">
                  Warehouse Location
                </Label>
                <Input
                  id="whLoc"
                  type="text"
                  placeholder="Jl. Pasar Lama, Cileungsi, Bogor, Jawa Barat"
                  value={formData.whLoc}
                  onChange={(e) => handleInputChange("whLoc", e.target.value)}
                  className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full h-12 bg-sup-red hover:bg-red-600 text-black font-poppins font-semibold text-lg rounded-xl"
                >
                  Submit Warehouse Data
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
