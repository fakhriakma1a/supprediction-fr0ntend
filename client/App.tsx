import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PredictionRangeProvider } from "@/hooks/usePredictionRange";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import STOManage from "./pages/STOManage";
import STODetails from "./pages/STODetails";
import STOUpdateForm from "./pages/STOUpdateForm";
import WarehouseManage from "./pages/WarehouseManage";
import WarehouseDetails from "./pages/WarehouseDetails";
import Input from "./pages/Input";
import InputSales from "./pages/InputSales";
import InputArchitecture from "./pages/InputArchitecture";
import InputMetadata from "./pages/InputMetadata";
import InputWarehouse from "./pages/InputWarehouse";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PredictionRangeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sto-manage" element={<STOManage />} />
              <Route path="/sto-details/:id" element={<STODetails />} />
              <Route path="/sto-update/:id" element={<STOUpdateForm />} />
              <Route path="/warehouse-manage" element={<WarehouseManage />} />
              <Route
                path="/warehouse-details/:id"
                element={<WarehouseDetails />}
              />
              <Route path="/input" element={<Input />} />
              <Route path="/input/sales" element={<InputSales />} />
              <Route path="/input/architecture" element={<InputArchitecture />} />
              <Route path="/input/metadata" element={<InputMetadata />} />
              <Route path="/input/warehouse" element={<InputWarehouse />} />
              <Route path="/reports" element={<Reports />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PredictionRangeProvider>
    </QueryClientProvider>
  );
}

// Proper React 18 mounting with HMR support
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Store the root instance globally to prevent multiple creation
declare global {
  interface Window {
    __reactRoot?: ReturnType<typeof createRoot>;
  }
}

if (!window.__reactRoot) {
  window.__reactRoot = createRoot(container);
}

window.__reactRoot.render(<App />);
