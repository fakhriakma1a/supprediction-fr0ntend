import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Example API routes (keeping for compatibility)
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Initialize backend API routes
  try {
    // Dynamic import to handle potential Python/backend setup issues
    const setupBackend = async () => {
      try {
        // For now, we'll create basic endpoints that will be enhanced
        // Authentication endpoints
        app.post("/api/auth/register", (req, res) => {
          // Placeholder for backend implementation
          res.json({
            success: false,
            message: "Backend system is being initialized. Please try again later.",
            data: null
          });
        });

        app.post("/api/auth/login", (req, res) => {
          // Mock login for development
          const { email, password } = req.body;
          if (email && password) {
            res.json({
              success: true,
              message: "Login successful",
              data: {
                access_token: "mock-token-" + Date.now(),
                token_type: "bearer",
                user: {
                  id: 1,
                  email: email,
                  full_name: "Test User",
                  is_active: true,
                  created_at: new Date().toISOString()
                }
              }
            });
          } else {
            res.status(400).json({
              success: false,
              message: "Email and password are required",
              error: "Invalid credentials"
            });
          }
        });

        app.get("/api/auth/me", (req, res) => {
          res.json({
            success: true,
            message: "User information retrieved",
            data: {
              id: 1,
              email: "test@example.com",
              full_name: "Test User",
              is_active: true,
              created_at: new Date().toISOString()
            }
          });
        });

        // Enhanced STO Management endpoints  
        app.get("/api/sto", (req, res) => {
          // Enhanced mock STO data with pagination and filtering support
          const mockSTOs = [
            { id: "JGL", sto_id: "JGL", name: "Jakarta Golkar", location: "Jakarta Pusat", region: "Jakarta", status: "Normal", avgMovingSales: 4, predictedSupply: 12 },
            { id: "DPK", sto_id: "DPK", name: "Depok", location: "Depok Tengah", region: "Jabodetabek", status: "Low Demand", avgMovingSales: 1, predictedSupply: 6 },
            { id: "TGR", sto_id: "TGR", name: "Tangerang", location: "Tangerang Kota", region: "Jabodetabek", status: "High Demand", avgMovingSales: 7, predictedSupply: 18 },
            { id: "JKT", sto_id: "JKT", name: "Jakarta Timur", location: "Jakarta Timur", region: "Jakarta", status: "Normal", avgMovingSales: 3, predictedSupply: 13 },
            { id: "BGR", sto_id: "BGR", name: "Bogor", location: "Bogor Tengah", region: "Jabodetabek", status: "High Demand", avgMovingSales: 8, predictedSupply: 17 },
            { id: "BDG", sto_id: "BDG", name: "Bandung", location: "Bandung Tengah", region: "Jawa Barat", status: "Low Demand", avgMovingSales: 1, predictedSupply: 8 },
            { id: "BTR", sto_id: "BTR", name: "Batam", location: "Batam Center", region: "Kepri", status: "Normal", avgMovingSales: 4, predictedSupply: 10 },
            { id: "BTN", sto_id: "BTN", name: "Banten", location: "Serang", region: "Banten", status: "Normal", avgMovingSales: 3, predictedSupply: 12 },
            { id: "BKS", sto_id: "BKS", name: "Bekasi", location: "Bekasi Timur", region: "Jabodetabek", status: "Normal", avgMovingSales: 5, predictedSupply: 14 },
            { id: "JWK", sto_id: "JWK", name: "Jawa Tengah", location: "Semarang", region: "Jawa Tengah", status: "Low Demand", avgMovingSales: 2, predictedSupply: 6 }
          ];
          
          // Apply filtering
          let filteredSTOs = mockSTOs;
          const search = req.query.search as string;
          const region = req.query.region as string;
          const status = req.query.status as string;
          
          if (search) {
            const searchLower = search.toLowerCase();
            filteredSTOs = filteredSTOs.filter(sto => 
              sto.sto_id.toLowerCase().includes(searchLower) ||
              sto.name.toLowerCase().includes(searchLower) ||
              sto.location.toLowerCase().includes(searchLower)
            );
          }
          
          if (region) {
            filteredSTOs = filteredSTOs.filter(sto => sto.region === region);
          }
          
          if (status) {
            filteredSTOs = filteredSTOs.filter(sto => sto.status === status);
          }
          
          // Apply pagination
          const page = parseInt(req.query.page as string) || 1;
          const limit = parseInt(req.query.limit as string) || 20;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedSTOs = filteredSTOs.slice(startIndex, endIndex);
          
          res.json({
            success: true,
            message: "STOs retrieved successfully", 
            data: paginatedSTOs,
            pagination: {
              page: page,
              limit: limit,
              total: filteredSTOs.length,
              total_pages: Math.ceil(filteredSTOs.length / limit),
              has_next: endIndex < filteredSTOs.length,
              has_prev: page > 1
            }
          });
        });

        // Individual STO operations
        app.get("/api/sto/:id", (req, res) => {
          const stoId = req.params.id;
          const mockSTO = {
            id: 1,
            sto_id: stoId,
            name: `STO ${stoId}`,
            location: `Location ${stoId}`,
            region: "Jakarta",
            province: "DKI Jakarta",
            latitude: -6.2088,
            longitude: 106.8456,
            status: "Active",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          res.json({
            success: true,
            message: "STO retrieved successfully",
            data: mockSTO
          });
        });

        app.post("/api/sto", (req, res) => {
          // Mock STO creation
          res.status(201).json({
            success: true,
            message: "STO created successfully",
            data: { ...req.body, id: Date.now(), created_at: new Date().toISOString() }
          });
        });

        app.put("/api/sto/:id", (req, res) => {
          // Mock STO update
          res.json({
            success: true,
            message: "STO updated successfully",
            data: { ...req.body, id: req.params.id, updated_at: new Date().toISOString() }
          });
        });

        app.delete("/api/sto/:id", (req, res) => {
          // Mock STO deletion
          res.json({
            success: true,
            message: "STO deleted successfully",
            data: null
          });
        });

        // Warehouse Management endpoints
        app.get("/api/warehouse", (req, res) => {
          const mockWarehouses = [
            {
              id: 1,
              warehouse_id: "WH001",
              name: "Warehouse Jakarta Pusat",
              location: "Jakarta Pusat",
              region: "Jakarta",
              capacity: 10000,
              current_stock: 7500,
              available_stock: 2500,
              utilization_percentage: 75.0,
              status: "Active"
            },
            {
              id: 2,
              warehouse_id: "WH002", 
              name: "Warehouse Bandung",
              location: "Bandung",
              region: "Jawa Barat",
              capacity: 8000,
              current_stock: 6000,
              available_stock: 2000,
              utilization_percentage: 75.0,
              status: "Active"
            }
          ];
          
          res.json({
            success: true,
            message: "Warehouses retrieved successfully",
            data: mockWarehouses
          });
        });

        // Dashboard endpoints  
        app.get("/api/dashboard/stats", (req, res) => {
          const mockData = [
            { date: '2025-01-01', actual: 45, predicted: 42 },
            { date: '2025-01-02', actual: 52, predicted: 48 },
            { date: '2025-01-03', actual: 50, predicted: 41 },
            { date: '2025-01-04', actual: 61, predicted: 58 },
            { date: '2025-01-05', actual: 55, predicted: 52 },
            { date: '2025-01-06', actual: 67, predicted: 63 },
            { date: '2025-01-07', actual: 59, predicted: 61 }
          ];
          
          res.json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: {
              overview: {
                totalSTOs: 10,
                totalWarehouses: 3,
                pendingSupplies: 8,
                averageAccuracy: 94.2
              },
              chartData: mockData,
              stoStatusDistribution: {
                "Normal": 6,
                "Low Demand": 2,
                "High Demand": 2
              },
              lastUpdated: new Date().toISOString()
            }
          });
        });

        app.get("/api/dashboard/prediction-summary", (req, res) => {
          res.json({
            success: true,
            message: "Prediction summary retrieved successfully", 
            data: {
              accuracyTrends: [],
              riskDistribution: { "Low": 6, "Medium": 3, "High": 1 },
              actionsNeeded: [],
              lastUpdated: new Date().toISOString()
            }
          });
        });

        app.get("/api/dashboard/sto-performance", (req, res) => {
          res.json({
            success: true,
            message: "STO performance data retrieved successfully",
            data: []
          });
        });

        // Predictions endpoints
        app.get("/api/predictions", (req, res) => {
          const mockPredictions = [
            {
              sto_id: "JGL",
              daily_prediction: 4.2,
              weekly_prediction: 29.4,
              monthly_prediction: 126.0,
              confidence: 0.94
            }
          ];
          
          res.json({
            success: true,
            message: "Predictions retrieved successfully",
            data: mockPredictions
          });
        });

        // Data input endpoints
        app.post("/api/data-input/sales", (req, res) => {
          res.json({
            success: true,
            message: "Sales data upload feature coming soon",
            data: null
          });
        });

        app.post("/api/data-input/architecture", (req, res) => {
          res.json({
            success: true,
            message: "Architecture data upload feature coming soon", 
            data: null
          });
        });

        // Reports endpoints
        app.get("/api/reports/templates", (req, res) => {
          const templates = [
            {"id": "sales_summary", "name": "Sales Summary Report"},
            {"id": "prediction_accuracy", "name": "Prediction Accuracy Report"},
            {"id": "supply_efficiency", "name": "Supply Chain Efficiency Report"},
            {"id": "sto_performance", "name": "STO Performance Report"}
          ];
          
          res.json({
            success: true,
            message: "Report templates retrieved successfully",
            data: templates
          });
        });

        // Health check endpoints
        app.get("/api/health", (req, res) => {
          res.json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            version: "1.0.0",
            backend: "express-integrated"
          });
        });

        console.log("Basic API endpoints initialized");
      } catch (error) {
        console.warn("Backend initialization warning:", error.message);
      }
    };

    setupBackend();
  } catch (error) {
    console.error("Failed to initialize backend:", error);
  }

  return app;
}
