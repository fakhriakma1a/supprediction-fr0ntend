import sys
import os
import json
import logging
from datetime import datetime

# Add the backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.core.config import settings
from app.core.database import get_database
from app.api import auth, dashboard, sto, warehouse, data_input, predictions, reports

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def handle_json_response(data, status_code=200):
    """Helper to create JSON response for Express"""
    return {
        'statusCode': status_code,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(data)
    }

class MockRequest:
    """Mock request object for our API handlers"""
    def __init__(self, method, headers, body, query_params, path_params):
        self.method = method
        self.headers = headers
        self.body = MockBody(body)
        self.query_params = query_params
        self.path_params = path_params

class MockBody:
    def __init__(self, content):
        self.content = content.encode() if isinstance(content, str) else content
    
    def read(self, length):
        return self.content[:length]

class MockResponse:
    def __init__(self):
        self.status_code = 200
        self.headers = {}

def create_api_handler(handler_func):
    """Wrapper to convert our API handlers to Express middleware"""
    def express_handler(req, res):
        try:
            # Parse Express request
            body = ''
            if hasattr(req, 'body') and req.body:
                body = json.dumps(req.body)
            
            mock_req = MockRequest(
                method=req.method,
                headers=dict(req.headers) if hasattr(req, 'headers') else {},
                body=body,
                query_params=dict(req.query) if hasattr(req, 'query') else {},
                path_params=dict(req.params) if hasattr(req, 'params') else {}
            )
            
            mock_res = MockResponse()
            
            # Call our handler
            result = handler_func(mock_req, mock_res)
            
            # Set response
            res.status(mock_res.status_code)
            for key, value in mock_res.headers.items():
                res.set(key, value)
            
            res.json(result)
            
        except Exception as e:
            logger.error(f"API handler error: {e}")
            res.status(500).json({
                'success': False,
                'message': 'Internal server error',
                'error': str(e)
            })
    
    return express_handler

# Authentication endpoints
register_handler = create_api_handler(auth.register)
login_handler = create_api_handler(auth.login)
current_user_handler = create_api_handler(auth.get_current_user_info)

# STO endpoints will be created similarly
# Dashboard endpoints will be created similarly  
# etc.

def setup_backend_routes(app):
    """Set up all backend API routes"""
    
    # Authentication routes
    app.post("/api/auth/register", register_handler)
    app.post("/api/auth/login", login_handler)
    app.get("/api/auth/me", current_user_handler)
    
    # Health check
    app.get("/api/health", lambda req, res: res.json({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }))
    
    # Database status
    def db_status(req, res):
        try:
            db = get_database()
            result = db.execute_one("SELECT 1 as status")
            res.json({
                "database": "connected" if result else "error",
                "timestamp": datetime.utcnow().isoformat()
            })
        except Exception as e:
            res.status(500).json({
                "database": "error",
                "error": str(e),
                "timestamp": datetime.utcnow().isoformat()
            })
    
    app.get("/api/db-status", db_status)
    
    logger.info("Backend API routes initialized successfully")

def initialize_database():
    """Initialize database with required tables"""
    try:
        db = get_database()
        
        # Check if users table exists
        result = db.execute_one("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            )
        """)
        
        if not result[0]:
            logger.info("Database tables not found. Please run the init.sql script manually.")
            logger.info("Run: psql -h localhost -U postgres -d postgres -f backend/init.sql")
        else:
            logger.info("Database tables verified successfully")
            
    except Exception as e:
        logger.error(f"Database initialization check failed: {e}")
        logger.info("Please ensure PostgreSQL is running and run: psql -h localhost -U postgres -d postgres -f backend/init.sql")

# Initialize on import
try:
    initialize_database()
except Exception as e:
    logger.warning(f"Could not verify database: {e}")
    logger.info("Backend will still start, but database operations may fail")