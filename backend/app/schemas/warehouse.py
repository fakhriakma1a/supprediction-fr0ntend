from typing import Optional
from dataclasses import dataclass

@dataclass
class WarehouseCreate:
    warehouse_id: str
    name: str
    location: str
    region: str
    capacity: int
    manager_name: Optional[str] = None
    contact_phone: Optional[str] = None
    
    def validate(self) -> tuple[bool, str]:
        """Validate warehouse creation data"""
        if not self.warehouse_id or not self.warehouse_id.strip():
            return False, "Warehouse ID is required"
        
        if not self.name or not self.name.strip():
            return False, "Warehouse name is required"
        
        if not self.location or not self.location.strip():
            return False, "Location is required"
        
        if not self.region or not self.region.strip():
            return False, "Region is required"
        
        if self.capacity < 0:
            return False, "Capacity cannot be negative"
        
        return True, ""

@dataclass
class WarehouseUpdate:
    name: Optional[str] = None
    location: Optional[str] = None
    region: Optional[str] = None
    capacity: Optional[int] = None
    current_stock: Optional[int] = None
    reserved_stock: Optional[int] = None
    manager_name: Optional[str] = None
    contact_phone: Optional[str] = None
    status: Optional[str] = None
    
    def validate(self) -> tuple[bool, str]:
        """Validate warehouse update data"""
        if self.capacity is not None and self.capacity < 0:
            return False, "Capacity cannot be negative"
        
        if self.current_stock is not None and self.current_stock < 0:
            return False, "Current stock cannot be negative"
        
        if self.reserved_stock is not None and self.reserved_stock < 0:
            return False, "Reserved stock cannot be negative"
        
        if self.status and self.status not in ["Active", "Inactive", "Maintenance"]:
            return False, "Status must be 'Active', 'Inactive', or 'Maintenance'"
        
        return True, ""

@dataclass
class WarehouseResponse:
    id: int
    warehouse_id: str
    name: str
    location: str
    region: str
    capacity: int
    current_stock: int
    reserved_stock: int
    available_stock: int
    manager_name: Optional[str]
    contact_phone: Optional[str]
    status: str
    utilization_percentage: float
    created_at: Optional[str]
    updated_at: Optional[str]

@dataclass
class SupplyWarehouseCreate:
    warehouse_id: str
    sto_id: str
    quantity_supplied: int
    supply_type: str = "Regular"
    estimated_delivery: Optional[str] = None
    notes: Optional[str] = None
    
    def validate(self) -> tuple[bool, str]:
        """Validate supply creation data"""
        if not self.warehouse_id or not self.warehouse_id.strip():
            return False, "Warehouse ID is required"
        
        if not self.sto_id or not self.sto_id.strip():
            return False, "STO ID is required"
        
        if self.quantity_supplied <= 0:
            return False, "Quantity supplied must be greater than 0"
        
        valid_types = ['Regular', 'Emergency', 'Maintenance']
        if self.supply_type not in valid_types:
            return False, f"Supply type must be one of: {', '.join(valid_types)}"
        
        return True, ""

@dataclass
class WarehouseListQuery:
    page: int = 1
    limit: int = 20
    search: Optional[str] = None
    region: Optional[str] = None
    status: Optional[str] = None
    
    def validate(self) -> tuple[bool, str]:
        """Validate query parameters"""
        if self.page < 1:
            return False, "Page must be greater than 0"
        
        if self.limit < 1 or self.limit > 100:
            return False, "Limit must be between 1 and 100"
        
        return True, ""