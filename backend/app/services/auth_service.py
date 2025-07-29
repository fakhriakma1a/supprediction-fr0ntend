# Authentication service - handles user management and JWT operations
from datetime import datetime
from typing import Optional
from ..core.database import get_database
from ..core.security import security
from ..models.user import User

class AuthService:
    def __init__(self):
        self.db = get_database()
    
    def create_user(self, email: str, password: str, full_name: str) -> Optional[User]:
        """Create a new user"""
        try:
            # Check if user exists
            existing = self.db.execute_one("SELECT id FROM users WHERE email = %s", (email,))
            if existing:
                return None
            
            # Hash password and create user
            password_hash = security.hash_password(password)
            now = datetime.utcnow()
            
            user_id = self.db.execute_insert(
                """INSERT INTO users (email, password_hash, full_name, is_active, created_at, updated_at)
                   VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
                (email, password_hash, full_name, True, now, now)
            )
            
            if user_id:
                return User(
                    id=user_id,
                    email=email,
                    password_hash=password_hash,
                    full_name=full_name,
                    is_active=True,
                    created_at=now,
                    updated_at=now
                )
            
            return None
        except Exception:
            return None
    
    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """Authenticate user and return user object"""
        try:
            user_data = self.db.execute_one(
                "SELECT id, email, password_hash, full_name, is_active, created_at, updated_at FROM users WHERE email = %s",
                (email,)
            )
            
            if not user_data:
                return None
            
            user = User.from_db_row(user_data)
            
            if not user.is_active:
                return None
            
            if not security.verify_password(password, user.password_hash):
                return None
            
            # Update last login
            self.db.execute_query(
                "UPDATE users SET last_login = %s WHERE id = %s",
                (datetime.utcnow(), user.id)
            )
            
            return user
        except Exception:
            return None
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        try:
            user_data = self.db.execute_one(
                "SELECT id, email, password_hash, full_name, is_active, created_at, updated_at, last_login FROM users WHERE id = %s",
                (user_id,)
            )
            
            if user_data:
                return User.from_db_row(user_data)
            
            return None
        except Exception:
            return None
    
    def create_token_for_user(self, user: User) -> str:
        """Create JWT token for user"""
        return security.create_user_token(user.id, user.email)

# Global instance
auth_service = AuthService()