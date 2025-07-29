from datetime import datetime, date
from typing import Optional, List
from dataclasses import dataclass

@dataclass
class STO:
    id: Optional[int] = None
    sto_id: str = ""  # STO identifier (e.g., 'JGL', 'DPK')
    name: str = ""
    location: str = ""
    region: str = ""
    province: str = ""
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: str = "Active"  # Active, Inactive
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'STO':
        """Create STO instance from database row"""
        if not row:
            return None
        return cls(
            id=row[0],
            sto_id=row[1],
            name=row[2],
            location=row[3],
            region=row[4],
            province=row[5],
            latitude=row[6],
            longitude=row[7],
            status=row[8],
            created_at=row[9],
            updated_at=row[10]
        )
    
    def to_dict(self) -> dict:
        """Convert to dictionary for JSON response"""
        return {
            "id": self.id,
            "sto_id": self.sto_id,
            "name": self.name,
            "location": self.location,
            "region": self.region,
            "province": self.province,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

@dataclass
class SalesHarian:
    id: Optional[int] = None
    sto_id: str = ""
    tanggal: date = None
    total_barang_terjual: int = 0
    created_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'SalesHarian':
        if not row:
            return None
        return cls(
            id=row[0],
            sto_id=row[1],
            tanggal=row[2],
            total_barang_terjual=row[3],
            created_at=row[4]
        )
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "sto_id": self.sto_id,
            "tanggal": self.tanggal.isoformat() if self.tanggal else None,
            "total_barang_terjual": self.total_barang_terjual,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

@dataclass
class ArsitekturJaringan:
    id: Optional[int] = None
    sto_id: str = ""
    jenis_arsitektur: str = ""  # e.g., 'FTTH', 'FTTB', 'ADSL'
    kapasitas: int = 0
    jumlah_port: int = 0
    utilisasi: float = 0.0  # percentage
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'ArsitekturJaringan':
        if not row:
            return None
        return cls(
            id=row[0],
            sto_id=row[1],
            jenis_arsitektur=row[2],
            kapasitas=row[3],
            jumlah_port=row[4],
            utilisasi=row[5],
            created_at=row[6],
            updated_at=row[7]
        )
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "sto_id": self.sto_id,
            "jenis_arsitektur": self.jenis_arsitektur,
            "kapasitas": self.kapasitas,
            "jumlah_port": self.jumlah_port,
            "utilisasi": self.utilisasi,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

@dataclass
class MetadataSTO:
    id: Optional[int] = None
    sto_id: str = ""
    population_coverage: int = 0
    business_density: str = ""  # 'Low', 'Medium', 'High'
    competition_level: str = ""  # 'Low', 'Medium', 'High'
    economic_index: float = 0.0
    infrastructure_quality: str = ""  # 'Poor', 'Fair', 'Good', 'Excellent'
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'MetadataSTO':
        if not row:
            return None
        return cls(
            id=row[0],
            sto_id=row[1],
            population_coverage=row[2],
            business_density=row[3],
            competition_level=row[4],
            economic_index=row[5],
            infrastructure_quality=row[6],
            created_at=row[7],
            updated_at=row[8]
        )
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "sto_id": self.sto_id,
            "population_coverage": self.population_coverage,
            "business_density": self.business_density,
            "competition_level": self.competition_level,
            "economic_index": self.economic_index,
            "infrastructure_quality": self.infrastructure_quality,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }