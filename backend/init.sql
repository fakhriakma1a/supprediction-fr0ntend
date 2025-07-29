-- Database initialization script for Supply Prediction System
-- Based on the requirements: sales_harian, arsitektur_jaringan, metadata_sto, warehouse
-- Output tables: avg_sales, ketersediaan_arsitektur, final_pemodelan, supply_warehouse
-- System tables: users, predictions_cache, system_config

-- Drop tables if they exist (for development)
DROP TABLE IF EXISTS system_config CASCADE;
DROP TABLE IF EXISTS predictions_cache CASCADE;
DROP TABLE IF EXISTS supply_warehouse CASCADE;
DROP TABLE IF EXISTS final_pemodelan CASCADE;
DROP TABLE IF EXISTS ketersediaan_arsitektur CASCADE;
DROP TABLE IF EXISTS avg_sales CASCADE;
DROP TABLE IF EXISTS metadata_sto CASCADE;
DROP TABLE IF EXISTS arsitektur_jaringan CASCADE;
DROP TABLE IF EXISTS sales_harian CASCADE;
DROP TABLE IF EXISTS warehouse CASCADE;
DROP TABLE IF EXISTS sto CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- System Tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- STO (Central Office) table
CREATE TABLE sto (
    id SERIAL PRIMARY KEY,
    sto_id VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Warehouse table
CREATE TABLE warehouse (
    id SERIAL PRIMARY KEY,
    warehouse_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 0,
    current_stock INTEGER NOT NULL DEFAULT 0,
    reserved_stock INTEGER NOT NULL DEFAULT 0,
    available_stock INTEGER NOT NULL DEFAULT 0,
    manager_name VARCHAR(255),
    contact_phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Input Tables (from requirements)
-- Daily sales data
CREATE TABLE sales_harian (
    id SERIAL PRIMARY KEY,
    sto_id VARCHAR(10) NOT NULL REFERENCES sto(sto_id) ON DELETE CASCADE,
    tanggal DATE NOT NULL,
    total_barang_terjual INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sto_id, tanggal)
);

-- Network architecture data
CREATE TABLE arsitektur_jaringan (
    id SERIAL PRIMARY KEY,
    sto_id VARCHAR(10) NOT NULL REFERENCES sto(sto_id) ON DELETE CASCADE,
    jenis_arsitektur VARCHAR(50) NOT NULL, -- FTTH, FTTB, ADSL, etc.
    kapasitas INTEGER NOT NULL DEFAULT 0,
    jumlah_port INTEGER NOT NULL DEFAULT 0,
    utilisasi DECIMAL(5, 2) NOT NULL DEFAULT 0.0, -- percentage 0-100
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- STO metadata
CREATE TABLE metadata_sto (
    id SERIAL PRIMARY KEY,
    sto_id VARCHAR(10) NOT NULL REFERENCES sto(sto_id) ON DELETE CASCADE,
    population_coverage INTEGER NOT NULL DEFAULT 0,
    business_density VARCHAR(20) NOT NULL, -- Low, Medium, High
    competition_level VARCHAR(20) NOT NULL, -- Low, Medium, High
    economic_index DECIMAL(8, 4) NOT NULL DEFAULT 0.0,
    infrastructure_quality VARCHAR(20) NOT NULL, -- Poor, Fair, Good, Excellent
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Output Tables (from requirements)
-- Average sales calculations
CREATE TABLE avg_sales (
    id SERIAL PRIMARY KEY,
    sto_id VARCHAR(10) NOT NULL REFERENCES sto(sto_id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    avg_daily_sales DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    avg_weekly_sales DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    avg_monthly_sales DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    trend VARCHAR(20) DEFAULT 'stable', -- increasing, decreasing, stable
    seasonality_factor DECIMAL(5, 2) DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Architecture availability analysis
CREATE TABLE ketersediaan_arsitektur (
    id SERIAL PRIMARY KEY,
    sto_id VARCHAR(10) NOT NULL REFERENCES sto(sto_id) ON DELETE CASCADE,
    arsitektur_type VARCHAR(50) NOT NULL,
    total_capacity INTEGER NOT NULL DEFAULT 0,
    used_capacity INTEGER NOT NULL DEFAULT 0,
    available_capacity INTEGER NOT NULL DEFAULT 0,
    utilization_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.0,
    bottleneck_risk VARCHAR(20) DEFAULT 'Low', -- Low, Medium, High
    expansion_needed BOOLEAN DEFAULT false,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Final modeling results
CREATE TABLE final_pemodelan (
    id SERIAL PRIMARY KEY,
    sto_id VARCHAR(10) NOT NULL REFERENCES sto(sto_id) ON DELETE CASCADE,
    prediction_period VARCHAR(20) NOT NULL, -- daily, weekly, monthly
    final_prediction DECIMAL(12, 2) NOT NULL DEFAULT 0.0,
    supply_recommendation DECIMAL(12, 2) NOT NULL DEFAULT 0.0,
    risk_level VARCHAR(20) DEFAULT 'Low', -- Low, Medium, High
    action_required TEXT,
    model_accuracy DECIMAL(5, 2) DEFAULT 0.0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Supply warehouse operations
CREATE TABLE supply_warehouse (
    id SERIAL PRIMARY KEY,
    warehouse_id VARCHAR(20) NOT NULL REFERENCES warehouse(warehouse_id) ON DELETE CASCADE,
    sto_id VARCHAR(10) NOT NULL REFERENCES sto(sto_id) ON DELETE CASCADE,
    supply_date TIMESTAMP NOT NULL,
    quantity_supplied INTEGER NOT NULL DEFAULT 0,
    supply_type VARCHAR(20) DEFAULT 'Regular', -- Regular, Emergency, Maintenance
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, In Transit, Delivered, Cancelled
    estimated_delivery TIMESTAMP,
    actual_delivery TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prediction cache for performance
CREATE TABLE predictions_cache (
    id SERIAL PRIMARY KEY,
    cache_key VARCHAR(255) UNIQUE NOT NULL,
    prediction_data JSONB NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System configuration
CREATE TABLE system_config (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_sales_harian_sto_date ON sales_harian(sto_id, tanggal);
CREATE INDEX idx_arsitektur_jaringan_sto ON arsitektur_jaringan(sto_id);
CREATE INDEX idx_metadata_sto_sto ON metadata_sto(sto_id);
CREATE INDEX idx_avg_sales_sto ON avg_sales(sto_id);
CREATE INDEX idx_final_pemodelan_sto ON final_pemodelan(sto_id);
CREATE INDEX idx_supply_warehouse_warehouse ON supply_warehouse(warehouse_id);
CREATE INDEX idx_supply_warehouse_sto ON supply_warehouse(sto_id);
CREATE INDEX idx_predictions_cache_key ON predictions_cache(cache_key);
CREATE INDEX idx_predictions_cache_expires ON predictions_cache(expires_at);

-- Insert initial system configuration
INSERT INTO system_config (config_key, config_value, description) VALUES
('model_version', '1.0.0', 'Current ML model version'),
('prediction_update_interval', '3600', 'Prediction update interval in seconds'),
('cache_ttl', '1800', 'Cache time-to-live in seconds'),
('max_file_size', '52428800', 'Maximum file upload size in bytes (50MB)'),
('allowed_file_types', 'csv,xlsx,xls', 'Allowed file types for upload');

-- Insert sample STO data
INSERT INTO sto (sto_id, name, location, region, province, latitude, longitude) VALUES
('JGL', 'Jakarta Golkar', 'Jakarta Pusat', 'Jakarta', 'DKI Jakarta', -6.2088, 106.8456),
('DPK', 'Depok', 'Depok Tengah', 'Jabodetabek', 'Jawa Barat', -6.4025, 106.7942),
('TGR', 'Tangerang', 'Tangerang Kota', 'Jabodetabek', 'Banten', -6.1781, 106.6300),
('JKT', 'Jakarta Timur', 'Jakarta Timur', 'Jakarta', 'DKI Jakarta', -6.2615, 106.8960),
('BGR', 'Bogor', 'Bogor Tengah', 'Jabodetabek', 'Jawa Barat', -6.5950, 106.8160),
('BDG', 'Bandung', 'Bandung Tengah', 'Jawa Barat', 'Jawa Barat', -6.9175, 107.6191),
('BTR', 'Batam', 'Batam Center', 'Kepri', 'Kepulauan Riau', 1.1079, 104.0457),
('BTN', 'Banten', 'Serang', 'Banten', 'Banten', -6.1200, 106.1500),
('BKS', 'Bekasi', 'Bekasi Timur', 'Jabodetabek', 'Jawa Barat', -6.2383, 107.0000),
('JWK', 'Jawa Tengah', 'Semarang', 'Jawa Tengah', 'Jawa Tengah', -6.9667, 110.4167);

-- Insert sample warehouse data
INSERT INTO warehouse (warehouse_id, name, location, region, capacity, current_stock, available_stock, manager_name, contact_phone) VALUES
('WH001', 'Warehouse Jakarta Pusat', 'Jakarta Pusat', 'Jakarta', 10000, 7500, 2500, 'Ahmad Suharto', '021-12345678'),
('WH002', 'Warehouse Bandung', 'Bandung', 'Jawa Barat', 8000, 6000, 2000, 'Siti Nurhaliza', '022-87654321'),
('WH003', 'Warehouse Surabaya', 'Surabaya', 'Jawa Timur', 12000, 9000, 3000, 'Budi Santoso', '031-11223344');

-- Update warehouse available_stock calculation
UPDATE warehouse SET reserved_stock = current_stock - available_stock;