from typing import Optional
import json
from ..core.database import get_database
from ..core.security import security
from ..models.user import User

class HTTPException(Exception):
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail

def get_current_user(request) -> Optional[User]:
    """Extract and validate user from JWT token"""
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
    
    try:
        scheme, token = auth_header.split()
        if scheme.lower() != 'bearer':
            return None
    except ValueError:
        return None
    
    payload = security.decode_access_token(token)
    if not payload:
        return None
    
    user_id = payload.get('sub')
    if not user_id:
        return None
    
    # Get user from database
    db = get_database()
    user_data = db.execute_one(
        "SELECT id, email, password_hash, full_name, is_active, created_at, updated_at, last_login FROM users WHERE id = %s AND is_active = true",
        (int(user_id),)
    )
    
    if not user_data:
        return None
    
    return User.from_db_row(user_data)

def require_auth(request) -> User:
    """Require authentication and return current user"""
    user = get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    return user

def parse_json_body(request) -> dict:
    """Parse JSON body from request"""
    try:
        content_length = int(request.headers.get('content-length', 0))
        if content_length > 0:
            body = request.body.read(content_length)
            return json.loads(body.decode('utf-8'))
        return {}
    except (ValueError, json.JSONDecodeError):
        raise HTTPException(status_code=400, detail="Invalid JSON in request body")

def create_response(data=None, message="Success", status_code=200):
    """Create standardized API response"""
    response = {
        "success": status_code < 400,
        "message": message,
        "data": data
    }
    return response

def create_error_response(message="Error", status_code=400, details=None):
    """Create standardized error response"""
    response = {
        "success": False,
        "message": message,
        "error": details or message
    }
    return response

def create_paginated_response(data, page, limit, total, message="Success"):
    """Create paginated response"""
    total_pages = (total + limit - 1) // limit
    return {
        "success": True,
        "message": message,
        "data": data,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1
        }
    }