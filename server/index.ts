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

        // STO Management endpoints
        app.get("/api/sto", (req, res) => {
          // Mock STO data based on frontend expectations
          const mockSTOs = [
            { id: "JGL", status: "Normal", avgMovingSales: 4, predictedSupply: 12 },
            { id: "DPK", status: "Low Demand", avgMovingSales: 1, predictedSupply: 6 },
            { id: "TGR", status: "High Demand", avgMovingSales: 7, predictedSupply: 18 },
            { id: "JKT", status: "Normal", avgMovingSales: 3, predictedSupply: 13 },
            { id: "BGR", status: "High Demand", avgMovingSales: 8, predictedSupply: 17 },
            { id: "BDG", status: "Low Demand", avgMovingSales: 1, predictedSupply: 8 },
            { id: "BTR", status: "Normal", avgMovingSales: 4, predictedSupply: 10 },
            { id: "BTN", status: "Normal", avgMovingSales: 3, predictedSupply: 12 },
            { id: "BKS", status: "Normal", avgMovingSales: 5, predictedSupply: 14 },
            { id: "JWK", status: "Low Demand", avgMovingSales: 2, predictedSupply: 6 }
          ];
          
          res.json({
            success: true,
            message: "STOs retrieved successfully",
            data: mockSTOs
          });
        });

        // Dashboard endpoint
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
              chartData: mockData,
              totalSTOs: 10,
              activeSupplies: 25,
              averageAccuracy: 94.2,
              pendingOrders: 8
            }
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
