import json
from datetime import datetime
from ..core.database import get_database
from ..core.security import security
from ..models.user import User
from ..schemas.user import UserCreate, UserLogin, UserResponse, TokenResponse
from .deps import HTTPException, parse_json_body, create_response, create_error_response

def register(request, response):
    """Register a new user"""
    try:
        body = parse_json_body(request)
        user_data = UserCreate(
            email=body.get('email', ''),
            password=body.get('password', ''),
            full_name=body.get('full_name', '')
        )
        
        # Validate input
        is_valid, error_msg = user_data.validate()
        if not is_valid:
            response.status_code = 400
            return create_error_response(error_msg, 400)
        
        db = get_database()
        
        # Check if user already exists
        existing_user = db.execute_one(
            "SELECT id FROM users WHERE email = %s",
            (user_data.email,)
        )
        
        if existing_user:
            response.status_code = 400
            return create_error_response("Email already registered", 400)
        
        # Hash password and create user
        password_hash = security.hash_password(user_data.password)
        
        user_id = db.execute_insert(
            """INSERT INTO users (email, password_hash, full_name, is_active, created_at, updated_at) 
               VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
            (user_data.email, password_hash, user_data.full_name, True, datetime.utcnow(), datetime.utcnow())
        )
        
        if not user_id:
            response.status_code = 500
            return create_error_response("Failed to create user", 500)
        
        # Create token
        token = security.create_user_token(user_id, user_data.email)
        
        user_response = UserResponse(
            id=user_id,
            email=user_data.email,
            full_name=user_data.full_name,
            is_active=True,
            created_at=datetime.utcnow().isoformat()
        )
        
        token_response = TokenResponse(
            access_token=token,
            user=user_response
        )
        
        response.status_code = 201
        return create_response(token_response.__dict__, "User registered successfully", 201)
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def login(request, response):
    """Authenticate user and return token"""
    try:
        body = parse_json_body(request)
        login_data = UserLogin(
            email=body.get('email', ''),
            password=body.get('password', '')
        )
        
        # Validate input
        is_valid, error_msg = login_data.validate()
        if not is_valid:
            response.status_code = 400
            return create_error_response(error_msg, 400)
        
        db = get_database()
        
        # Get user from database
        user_data = db.execute_one(
            "SELECT id, email, password_hash, full_name, is_active, created_at, updated_at FROM users WHERE email = %s",
            (login_data.email,)
        )
        
        if not user_data:
            response.status_code = 401
            return create_error_response("Invalid email or password", 401)
        
        user = User.from_db_row(user_data)
        
        # Check if user is active
        if not user.is_active:
            response.status_code = 401
            return create_error_response("Account is disabled", 401)
        
        # Verify password
        if not security.verify_password(login_data.password, user.password_hash):
            response.status_code = 401
            return create_error_response("Invalid email or password", 401)
        
        # Update last login
        db.execute_query(
            "UPDATE users SET last_login = %s WHERE id = %s",
            (datetime.utcnow(), user.id)
        )
        
        # Create token
        token = security.create_user_token(user.id, user.email)
        
        user_response = UserResponse(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            is_active=user.is_active,
            created_at=user.created_at.isoformat() if user.created_at else None,
            last_login=datetime.utcnow().isoformat()
        )
        
        token_response = TokenResponse(
            access_token=token,
            user=user_response
        )
        
        return create_response(token_response.__dict__, "Login successful")
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def get_current_user_info(request, response):
    """Get current user information"""
    try:
        from .deps import require_auth
        user = require_auth(request)
        
        user_response = UserResponse(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            is_active=user.is_active,
            created_at=user.created_at.isoformat() if user.created_at else None,
            last_login=user.last_login.isoformat() if user.last_login else None
        )
        
        return create_response(user_response.__dict__, "User information retrieved successfully")
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)