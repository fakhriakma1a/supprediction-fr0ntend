# Supply Prediction Backend System

A comprehensive backend system for the supply prediction application, featuring PostgreSQL integration, authentication, ML pipeline support, and comprehensive API endpoints.

## 🚀 Features

### Core Infrastructure
- **FastAPI-style Architecture**: Organized with models, schemas, services, and API layers
- **PostgreSQL Integration**: Complete database schema with input/output tables
- **JWT Authentication**: Secure user authentication and authorization
- **Express Integration**: Seamless integration with the existing Express server

### Database Schema
#### Input Tables
- `sales_harian` - Daily sales data per STO
- `arsitektur_jaringan` - Network architecture information
- `metadata_sto` - STO metadata and characteristics
- `warehouse` - Warehouse management data

#### Output Tables  
- `avg_sales` - Calculated average sales metrics
- `ketersediaan_arsitektur` - Architecture availability analysis
- `final_pemodelan` - Final modeling results and predictions
- `supply_warehouse` - Supply chain operations

#### System Tables
- `users` - User management and authentication
- `predictions_cache` - Prediction caching for performance
- `system_config` - System configuration management

### API Endpoints

#### Authentication (`/api/auth/`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user info

#### STO Management (`/api/sto/`)
- `GET /api/sto` - List STOs with pagination and filtering
- `GET /api/sto/:id` - Get specific STO details
- `POST /api/sto` - Create new STO
- `PUT /api/sto/:id` - Update STO
- `DELETE /api/sto/:id` - Delete STO
- `GET /api/sto/:id/sales` - Get STO sales data

#### Warehouse Management (`/api/warehouse/`)
- `GET /api/warehouse` - List warehouses with pagination
- `GET /api/warehouse/:id` - Get specific warehouse details
- `POST /api/warehouse` - Create new warehouse
- `PUT /api/warehouse/:id` - Update warehouse
- `DELETE /api/warehouse/:id` - Delete warehouse
- `GET /api/warehouse/:id/supplies` - Get warehouse supply operations
- `POST /api/warehouse/supply` - Create supply operation

#### Dashboard (`/api/dashboard/`)
- `GET /api/dashboard/stats` - Dashboard overview statistics
- `GET /api/dashboard/prediction-summary` - Prediction accuracy summary
- `GET /api/dashboard/sto-performance` - STO performance metrics
- `GET /api/dashboard/supply-analytics` - Supply chain analytics

#### Predictions (`/api/predictions/`)
- `GET /api/predictions` - Get current predictions
- `POST /api/predictions/generate` - Generate new predictions
- `GET /api/predictions/history` - Get prediction history

#### Data Input (`/api/data-input/`)
- `POST /api/data-input/sales` - Upload sales data files
- `POST /api/data-input/architecture` - Upload architecture data
- `POST /api/data-input/metadata` - Upload metadata files
- `POST /api/data-input/validate` - Validate uploaded data

#### Reports (`/api/reports/`)
- `GET /api/reports/templates` - Get available report templates
- `POST /api/reports/generate` - Generate custom reports
- `POST /api/reports/export` - Export data in various formats

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Python 3.9+ (for ML components)
- Redis (optional, for caching)

### Database Setup
1. Install and start PostgreSQL
2. Create database:
   ```bash
   createdb postgres
   ```
3. Initialize database schema:
   ```bash
   psql -h localhost -U postgres -d postgres -f backend/init.sql
   ```

### Application Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. Start the application:
   ```bash
   npm run dev
   ```

### Docker Setup (Alternative)
```bash
cd backend
docker-compose up -d
```

## 🏗️ Architecture

### Directory Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Main application setup
│   ├── core/
│   │   ├── config.py        # Configuration management
│   │   ├── database.py      # Database connection and utilities
│   │   └── security.py      # JWT and password hashing
│   ├── models/              # Database models
│   │   ├── user.py
│   │   ├── sto.py
│   │   ├── warehouse.py
│   │   └── predictions.py
│   ├── schemas/             # Request/response schemas
│   │   ├── user.py
│   │   ├── sto.py
│   │   └── warehouse.py
│   ├── api/                 # API endpoint handlers
│   │   ├── deps.py          # Dependencies and utilities
│   │   ├── auth.py
│   │   ├── dashboard.py
│   │   ├── sto.py
│   │   ├── warehouse.py
│   │   ├── data_input.py
│   │   ├── predictions.py
│   │   └── reports.py
│   ├── services/            # Business logic services
│   │   ├── auth_service.py
│   │   ├── data_processing.py
│   │   ├── ml_engine.py
│   │   └── prediction_service.py
│   └── ml/                  # Machine learning components
│       ├── models.py
│       ├── features.py
│       └── predictions.py
├── init.sql                 # Database initialization
├── requirements.txt         # Python dependencies
├── docker-compose.yml       # Docker setup
└── Dockerfile
```

### Key Components

#### Database Layer
- **Connection Pool**: Efficient PostgreSQL connection management
- **Transaction Management**: Automatic commit/rollback handling
- **Model Classes**: Clean data representation with validation

#### Authentication & Security
- **JWT Tokens**: Secure stateless authentication
- **Password Hashing**: bcrypt for secure password storage
- **Request Validation**: Comprehensive input validation

#### API Layer
- **Standardized Responses**: Consistent JSON response format
- **Error Handling**: Comprehensive error catching and reporting
- **Pagination**: Built-in pagination support for list endpoints

## 🔧 Configuration

### Environment Variables
```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=MFakhriAKM1

# Security
SECRET_KEY=your-secret-key-here
JWT_EXPIRATION_MINUTES=30

# Redis (optional)
REDIS_HOST=localhost
REDIS_PORT=6379

# File Upload
MAX_FILE_SIZE_MB=50
UPLOAD_FOLDER=uploads
```

### Database Configuration
The system uses PostgreSQL with the following key settings:
- Connection pooling for performance
- Automatic schema initialization
- Sample data for development
- Proper indexing for query optimization

## 🧪 Testing

### Run Tests
```bash
npm test
```

### API Testing
```bash
# Health check
curl http://localhost:8080/api/health

# Authentication
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get STOs with filtering
curl "http://localhost:8080/api/sto?search=jakarta&page=1&limit=5"
```

## 📊 Machine Learning Integration

### Prediction Models
- **XGBoost**: Primary prediction model for supply forecasting
- **Time Series Analysis**: ARIMA/Prophet for seasonal patterns
- **Feature Engineering**: Automated feature creation from input data

### Prediction Types
- **Daily**: Short-term predictions for immediate planning
- **Weekly**: Medium-term forecasting for operational planning  
- **Monthly**: Long-term strategic planning predictions

### Model Performance
- **Accuracy Tracking**: Real-time accuracy monitoring
- **Model Versioning**: Support for multiple model versions
- **A/B Testing**: Framework for testing new models

## 🔍 Monitoring & Performance

### Caching Strategy
- **Prediction Cache**: Redis-based caching for expensive ML predictions
- **Database Query Cache**: Optimized query caching
- **Response Caching**: API response caching for frequently accessed data

### Performance Features
- **Connection Pooling**: Efficient database connection management
- **Lazy Loading**: On-demand data loading
- **Pagination**: Built-in pagination for large datasets
- **Indexing**: Optimized database indexes

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker-compose -f backend/docker-compose.yml up -d
```

### Environment-Specific Configuration
- Development: Full logging, sample data
- Staging: Production-like setup with test data
- Production: Optimized performance, security hardening

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the API documentation at `/api/docs` (when implemented)
- Review the database schema in `backend/init.sql`
- Check logs for detailed error information
- Use the health check endpoint for system status

## 🎯 Roadmap

### Immediate (v1.1)
- [ ] Complete ML prediction engine integration
- [ ] File upload and processing for CSV/Excel
- [ ] Advanced data validation and cleaning
- [ ] Comprehensive error handling and logging

### Medium-term (v1.2)
- [ ] Real-time predictions with WebSocket support
- [ ] Advanced analytics and reporting
- [ ] Model performance monitoring dashboard
- [ ] Automated model retraining

### Long-term (v2.0)
- [ ] Multi-tenant support
- [ ] Advanced ML models (deep learning)
- [ ] Real-time data streaming
- [ ] Mobile API support