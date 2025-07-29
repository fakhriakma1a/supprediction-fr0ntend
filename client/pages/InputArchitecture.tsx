import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Check, X } from "lucide-react";

interface ArchitectureData {
  stoId: string;
  arsitekturId: string;
  totalPort: string;
  usedPort: string;
}

interface FileUploadResult {
  filename: string;
  records: number;
  status: 'success' | 'error';
  message: string;
}

export default function InputArchitecture() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<ArchitectureData>({
    stoId: "",
    arsitekturId: "",
    totalPort: "",
    usedPort: "",
  });

  const [uploadResult, setUploadResult] = useState<FileUploadResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: keyof ArchitectureData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Architecture data submitted:", formData);
    
    // Simulate API call
    setTimeout(() => {
      setUploadResult({
        filename: 'Manual Entry',
        records: 1,
        status: 'success',
        message: 'Network architecture data successfully added to the system.'
      });
      
      // Reset form
      setFormData({
        stoId: "",
        arsitekturId: "",
        totalPort: "",
        usedPort: "",
      });
    }, 1000);
  };

  const validateCSVFile = (file: File): Promise<FileUploadResult> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          const lines = csv.split('\n').filter(line => line.trim());
          
          if (lines.length < 2) {
            resolve({
              filename: file.name,
              records: 0,
              status: 'error',
              message: 'File must contain at least one data row plus header.'
            });
            return;
          }

          // Validate header format (should be: STO_id, Arsitektur_id, Total_port, Used_port)
          const header = lines[0].toLowerCase().split(',').map(h => h.trim());
          const expectedHeaders = ['sto_id', 'arsitektur_id', 'total_port', 'used_port'];
          
          const hasValidHeaders = expectedHeaders.every(expectedHeader => 
            header.some(h => h.includes(expectedHeader.replace('_', '')))
          );

          if (!hasValidHeaders) {
            resolve({
              filename: file.name,
              records: 0,
              status: 'error',
              message: 'Invalid CSV format. Expected columns: STO_id, Arsitektur_id, Total_port, Used_port'
            });
            return;
          }

          const dataRows = lines.slice(1);
          const validRows = dataRows.filter(row => {
            const fields = row.split(',').map(f => f.trim());
            return fields.length >= 4 && fields.every(f => f.length > 0);
          });

          resolve({
            filename: file.name,
            records: validRows.length,
            status: 'success',
            message: `Successfully validated ${validRows.length} network architecture records.`
          });

        } catch (error) {
          resolve({
            filename: file.name,
            records: 0,
            status: 'error',
            message: 'Error reading file. Please ensure it\'s a valid CSV format.'
          });
        }
      };

      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadResult({
        filename: file.name,
        records: 0,
        status: 'error',
        message: 'Please upload a CSV file only.'
      });
      return;
    }

    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = await validateCSVFile(file);
    setUploadResult(result);
    setIsUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
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
            Input Data Arsitektur Jaringan
          </h1>
        </div>

        {/* Form Card */}
        <Card className="max-w-6xl rounded-3xl shadow-lg">
          <CardContent className="p-8">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-poppins text-2xl md:text-3xl font-medium text-black">
                Input Arsitektur Jaringan
              </h2>
              <Button
                onClick={handleBack}
                variant="outline"
                className="bg-red-200 hover:bg-red-300 border-red-300 text-black font-poppins font-medium rounded-xl px-6 py-2"
              >
                ← Back
              </Button>
            </div>

            {/* Tabs for Manual Input vs File Upload */}
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="manual" className="font-poppins text-lg">
                  Manual Input
                </TabsTrigger>
                <TabsTrigger value="upload" className="font-poppins text-lg">
                  File Upload
                </TabsTrigger>
              </TabsList>

              {/* Manual Input Tab */}
              <TabsContent value="manual" className="space-y-6">
                <form onSubmit={handleManualSubmit} className="space-y-6">
                  {/* STO ID Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="stoId"
                      className="font-poppins text-lg font-medium text-black"
                    >
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

                  {/* Arsitektur ID Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="arsitekturId"
                      className="font-poppins text-lg font-medium text-black"
                    >
                      Arsitektur ID
                    </Label>
                    <Input
                      id="arsitekturId"
                      type="text"
                      placeholder="e.g., ODP-JGL-FAX"
                      value={formData.arsitekturId}
                      onChange={(e) => handleInputChange("arsitekturId", e.target.value)}
                      className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                      required
                    />
                  </div>

                  {/* Total Port Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="totalPort"
                      className="font-poppins text-lg font-medium text-black"
                    >
                      Total Port
                    </Label>
                    <Input
                      id="totalPort"
                      type="number"
                      placeholder="8"
                      value={formData.totalPort}
                      onChange={(e) => handleInputChange("totalPort", e.target.value)}
                      className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                      required
                      min="1"
                    />
                  </div>

                  {/* Used Port Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="usedPort"
                      className="font-poppins text-lg font-medium text-black"
                    >
                      Used Port
                    </Label>
                    <Input
                      id="usedPort"
                      type="number"
                      placeholder="5"
                      value={formData.usedPort}
                      onChange={(e) => handleInputChange("usedPort", e.target.value)}
                      className="h-12 border-gray-300 rounded-xl font-poppins text-base"
                      required
                      min="0"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-sup-red hover:bg-red-600 text-black font-poppins font-semibold text-lg rounded-xl"
                    >
                      Submit Architecture Data
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* File Upload Tab */}
              <TabsContent value="upload" className="space-y-6">
                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                    isDragging
                      ? 'border-sup-red bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="flex flex-col items-center gap-4">
                    <Upload className="w-16 h-16 text-gray-400" />
                    <div>
                      <p className="font-poppins text-xl text-black mb-2">
                        Drop your CSV file here, or{' '}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-sup-red hover:underline font-semibold"
                        >
                          browse
                        </button>
                      </p>
                      <p className="font-poppins text-sm text-gray-500">
                        CSV format: STO_id, Arsitektur_id, Total_port, Used_port
                      </p>
                    </div>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="font-poppins">Processing file...</span>
                    </div>
                  </div>
                )}

                {/* Upload Result */}
                {uploadResult && !isUploading && (
                  <div className={`rounded-xl p-6 ${
                    uploadResult.status === 'success' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {uploadResult.status === 'success' ? (
                        <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      ) : (
                        <X className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4" />
                          <span className="font-poppins font-semibold text-black">
                            {uploadResult.filename}
                          </span>
                        </div>
                        <p className={`font-poppins text-sm ${
                          uploadResult.status === 'success' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {uploadResult.message}
                        </p>
                        {uploadResult.status === 'success' && uploadResult.records > 0 && (
                          <p className="font-poppins text-sm text-green-600 mt-1">
                            Records processed: {uploadResult.records}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Format Guidelines */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-poppins text-lg font-semibold text-black mb-4">
                    CSV Format Guidelines
                  </h3>
                  <div className="space-y-2 text-sm font-poppins text-gray-700">
                    <p>• Header row: <code className="bg-white px-1 rounded">STO_id, Arsitektur_id, Total_port, Used_port</code></p>
                    <p>• STO_id: Text identifier (e.g., JGL001, DPK002)</p>
                    <p>• Arsitektur_id: Architecture identifier (e.g., ODP-JGL-FAX)</p>
                    <p>• Total_port: Numeric value (total available ports)</p>
                    <p>• Used_port: Numeric value (currently used ports)</p>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border text-xs font-mono">
                    STO_id,Arsitektur_id,Total_port,Used_port<br/>
                    JGL001,ODP-JGL-FAX,8,5<br/>
                    JGL001,ODP-JGL-FBX,8,2<br/>
                    DPK002,ODP-DPK-FAX,12,7
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
