from datetime import datetime
from typing import Optional
from dataclasses import dataclass

@dataclass
class Warehouse:
    id: Optional[int] = None
    warehouse_id: str = ""
    name: str = ""
    location: str = ""
    region: str = ""
    capacity: int = 0
    current_stock: int = 0
    reserved_stock: int = 0
    available_stock: int = 0
    manager_name: str = ""
    contact_phone: str = ""
    status: str = "Active"  # Active, Inactive, Maintenance
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'Warehouse':
        """Create Warehouse instance from database row"""
        if not row:
            return None
        return cls(
            id=row[0],
            warehouse_id=row[1],
            name=row[2],
            location=row[3],
            region=row[4],
            capacity=row[5],
            current_stock=row[6],
            reserved_stock=row[7],
            available_stock=row[8],
            manager_name=row[9],
            contact_phone=row[10],
            status=row[11],
            created_at=row[12],
            updated_at=row[13]
        )
    
    def to_dict(self) -> dict:
        """Convert to dictionary for JSON response"""
        return {
            "id": self.id,
            "warehouse_id": self.warehouse_id,
            "name": self.name,
            "location": self.location,
            "region": self.region,
            "capacity": self.capacity,
            "current_stock": self.current_stock,
            "reserved_stock": self.reserved_stock,
            "available_stock": self.available_stock,
            "manager_name": self.manager_name,
            "contact_phone": self.contact_phone,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
    
    @property
    def utilization_percentage(self) -> float:
        """Calculate warehouse utilization percentage"""
        if self.capacity == 0:
            return 0.0
        return (self.current_stock / self.capacity) * 100

@dataclass
class SupplyWarehouse:
    id: Optional[int] = None
    warehouse_id: str = ""
    sto_id: str = ""
    supply_date: datetime = None
    quantity_supplied: int = 0
    supply_type: str = ""  # 'Regular', 'Emergency', 'Maintenance'
    status: str = "Pending"  # Pending, In Transit, Delivered, Cancelled
    estimated_delivery: Optional[datetime] = None
    actual_delivery: Optional[datetime] = None
    notes: str = ""
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'SupplyWarehouse':
        if not row:
            return None
        return cls(
            id=row[0],
            warehouse_id=row[1],
            sto_id=row[2],
            supply_date=row[3],
            quantity_supplied=row[4],
            supply_type=row[5],
            status=row[6],
            estimated_delivery=row[7],
            actual_delivery=row[8],
            notes=row[9],
            created_at=row[10],
            updated_at=row[11]
        )
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "warehouse_id": self.warehouse_id,
            "sto_id": self.sto_id,
            "supply_date": self.supply_date.isoformat() if self.supply_date else None,
            "quantity_supplied": self.quantity_supplied,
            "supply_type": self.supply_type,
            "status": self.status,
            "estimated_delivery": self.estimated_delivery.isoformat() if self.estimated_delivery else None,
            "actual_delivery": self.actual_delivery.isoformat() if self.actual_delivery else None,
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }