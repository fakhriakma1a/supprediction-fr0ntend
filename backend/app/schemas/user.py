from typing import Optional
from dataclasses import dataclass
import re

@dataclass
class UserCreate:
    email: str
    password: str
    full_name: str
    
    def validate(self) -> tuple[bool, str]:
        """Validate user creation data"""
        if not self.email or not self.email.strip():
            return False, "Email is required"
        
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', self.email):
            return False, "Invalid email format"
        
        if not self.password or len(self.password) < 6:
            return False, "Password must be at least 6 characters long"
        
        if not self.full_name or not self.full_name.strip():
            return False, "Full name is required"
        
        return True, ""

@dataclass
class UserLogin:
    email: str
    password: str
    
    def validate(self) -> tuple[bool, str]:
        """Validate login data"""
        if not self.email or not self.email.strip():
            return False, "Email is required"
        
        if not self.password:
            return False, "Password is required"
        
        return True, ""

@dataclass
class UserResponse:
    id: int
    email: str
    full_name: str
    is_active: bool
    created_at: Optional[str] = None
    last_login: Optional[str] = None

@dataclass
class UserUpdate:
    full_name: Optional[str] = None
    email: Optional[str] = None
    
    def validate(self) -> tuple[bool, str]:
        """Validate user update data"""
        if self.email and not re.match(r'^[^@]+@[^@]+\.[^@]+$', self.email):
            return False, "Invalid email format"
        
        return True, ""

@dataclass
class TokenResponse:
    access_token: str
    token_type: str = "bearer"
    user: Optional[UserResponse] = None