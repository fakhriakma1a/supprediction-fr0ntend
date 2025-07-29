from datetime import datetime
from typing import Optional
from dataclasses import dataclass

@dataclass
class User:
    id: Optional[int] = None
    email: str = ""
    password_hash: str = ""
    full_name: str = ""
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'User':
        """Create User instance from database row"""
        if not row:
            return None
        return cls(
            id=row[0],
            email=row[1],
            password_hash=row[2],
            full_name=row[3],
            is_active=row[4],
            created_at=row[5],
            updated_at=row[6],
            last_login=row[7] if len(row) > 7 else None
        )
    
    def to_dict(self) -> dict:
        """Convert to dictionary for JSON response"""
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "last_login": self.last_login.isoformat() if self.last_login else None
        }