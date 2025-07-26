import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MetadataData {
  stoId: string;
  potensiKonsumen: string;
  jarakKm: string;
}

export default function InputMetadata() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MetadataData>({
    stoId: "",
    potensiKonsumen: "",
    jarakKm: ""
  });

  const handleInputChange = (field: keyof MetadataData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("STO metadata submitted:", formData);
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
            Input Data
          </h1>
        </div>

        {/* Form Card */}
        <Card className="max-w-4xl rounded-3xl shadow-lg">
          <CardContent className="p-8">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-poppins text-2xl md:text-3xl font-medium text-black">
                Input Data STO
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
              {/* STO ID Field */}
              <div className="space-y-2">
                <Label htmlFor="stoId" className="font-poppins text-lg font-medium text-black">
                  STO ID
                </Label>
                <Input
                  id="stoId"
                  type="text"
                  placeholder="e.g., JGL001"
                  value={formData.stoId}
                  onChange={(e) => handleInputChange("stoId", e.target.value)}
                  className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                  required
                />
              </div>

              {/* Potensi Konsumen Field */}
              <div className="space-y-2">
                <Label htmlFor="potensiKonsumen" className="font-poppins text-lg font-medium text-black">
                  Potensi Konsumen (0-1)
                </Label>
                <Input
                  id="potensiKonsumen"
                  type="number"
                  placeholder="0.3"
                  value={formData.potensiKonsumen}
                  onChange={(e) => handleInputChange("potensiKonsumen", e.target.value)}
                  className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                  required
                  step="0.1"
                  min="0"
                  max="1"
                />
              </div>

              {/* Jarak Field */}
              <div className="space-y-2">
                <Label htmlFor="jarakKm" className="font-poppins text-lg font-medium text-black">
                  Jarak (Km)
                </Label>
                <Input
                  id="jarakKm"
                  type="number"
                  placeholder="50.5"
                  value={formData.jarakKm}
                  onChange={(e) => handleInputChange("jarakKm", e.target.value)}
                  className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                  required
                  step="0.1"
                  min="0"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
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
