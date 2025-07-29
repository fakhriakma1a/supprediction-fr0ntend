from typing import Optional, List
from dataclasses import dataclass
from datetime import date

@dataclass
class STOCreate:
    sto_id: str
    name: str
    location: str
    region: str
    province: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    
    def validate(self) -> tuple[bool, str]:
        """Validate STO creation data"""
        if not self.sto_id or not self.sto_id.strip():
            return False, "STO ID is required"
        
        if not self.name or not self.name.strip():
            return False, "STO name is required"
        
        if not self.location or not self.location.strip():
            return False, "Location is required"
        
        if not self.region or not self.region.strip():
            return False, "Region is required"
        
        if not self.province or not self.province.strip():
            return False, "Province is required"
        
        if self.latitude is not None and (self.latitude < -90 or self.latitude > 90):
            return False, "Latitude must be between -90 and 90"
        
        if self.longitude is not None and (self.longitude < -180 or self.longitude > 180):
            return False, "Longitude must be between -180 and 180"
        
        return True, ""

@dataclass
class STOUpdate:
    name: Optional[str] = None
    location: Optional[str] = None
    region: Optional[str] = None
    province: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: Optional[str] = None
    
    def validate(self) -> tuple[bool, str]:
        """Validate STO update data"""
        if self.latitude is not None and (self.latitude < -90 or self.latitude > 90):
            return False, "Latitude must be between -90 and 90"
        
        if self.longitude is not None and (self.longitude < -180 or self.longitude > 180):
            return False, "Longitude must be between -180 and 180"
        
        if self.status and self.status not in ["Active", "Inactive"]:
            return False, "Status must be 'Active' or 'Inactive'"
        
        return True, ""

@dataclass
class STOResponse:
    id: int
    sto_id: str
    name: str
    location: str
    region: str
    province: str
    latitude: Optional[float]
    longitude: Optional[float]
    status: str
    created_at: Optional[str]
    updated_at: Optional[str]

@dataclass
class SalesHarianCreate:
    sto_id: str
    tanggal: str  # ISO date format
    total_barang_terjual: int
    
    def validate(self) -> tuple[bool, str]:
        """Validate sales data creation"""
        if not self.sto_id or not self.sto_id.strip():
            return False, "STO ID is required"
        
        if not self.tanggal:
            return False, "Date is required"
        
        try:
            date.fromisoformat(self.tanggal)
        except ValueError:
            return False, "Invalid date format. Use YYYY-MM-DD"
        
        if self.total_barang_terjual < 0:
            return False, "Total barang terjual cannot be negative"
        
        return True, ""

@dataclass
class SalesHarianResponse:
    id: int
    sto_id: str
    tanggal: str
    total_barang_terjual: int
    created_at: Optional[str]

@dataclass
class ArsitekturJaringanCreate:
    sto_id: str
    jenis_arsitektur: str
    kapasitas: int
    jumlah_port: int
    utilisasi: float
    
    def validate(self) -> tuple[bool, str]:
        """Validate architecture data creation"""
        if not self.sto_id or not self.sto_id.strip():
            return False, "STO ID is required"
        
        if not self.jenis_arsitektur or not self.jenis_arsitektur.strip():
            return False, "Architecture type is required"
        
        if self.kapasitas < 0:
            return False, "Capacity cannot be negative"
        
        if self.jumlah_port < 0:
            return False, "Port count cannot be negative"
        
        if self.utilisasi < 0 or self.utilisasi > 100:
            return False, "Utilization must be between 0 and 100"
        
        return True, ""

@dataclass
class ArsitekturJaringanResponse:
    id: int
    sto_id: str
    jenis_arsitektur: str
    kapasitas: int
    jumlah_port: int
    utilisasi: float
    created_at: Optional[str]
    updated_at: Optional[str]

@dataclass
class MetadataSTOCreate:
    sto_id: str
    population_coverage: int
    business_density: str  # 'Low', 'Medium', 'High'
    competition_level: str  # 'Low', 'Medium', 'High'
    economic_index: float
    infrastructure_quality: str  # 'Poor', 'Fair', 'Good', 'Excellent'
    
    def validate(self) -> tuple[bool, str]:
        """Validate metadata creation"""
        if not self.sto_id or not self.sto_id.strip():
            return False, "STO ID is required"
        
        if self.population_coverage < 0:
            return False, "Population coverage cannot be negative"
        
        valid_densities = ['Low', 'Medium', 'High']
        if self.business_density not in valid_densities:
            return False, f"Business density must be one of: {', '.join(valid_densities)}"
        
        if self.competition_level not in valid_densities:
            return False, f"Competition level must be one of: {', '.join(valid_densities)}"
        
        if self.economic_index < 0:
            return False, "Economic index cannot be negative"
        
        valid_qualities = ['Poor', 'Fair', 'Good', 'Excellent']
        if self.infrastructure_quality not in valid_qualities:
            return False, f"Infrastructure quality must be one of: {', '.join(valid_qualities)}"
        
        return True, ""

@dataclass
class MetadataSTOResponse:
    id: int
    sto_id: str
    population_coverage: int
    business_density: str
    competition_level: str
    economic_index: float
    infrastructure_quality: str
    created_at: Optional[str]
    updated_at: Optional[str]

@dataclass
class STOListQuery:
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