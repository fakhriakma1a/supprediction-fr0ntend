from datetime import datetime, date
from typing import Optional, Dict, Any
from dataclasses import dataclass

@dataclass
class Prediction:
    id: Optional[int] = None
    sto_id: str = ""
    prediction_date: date = None
    prediction_type: str = ""  # 'daily', 'weekly', 'monthly'
    predicted_sales: float = 0.0
    predicted_supply: float = 0.0
    confidence_score: float = 0.0
    model_version: str = ""
    features_used: Dict[str, Any] = None
    created_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'Prediction':
        if not row:
            return None
        return cls(
            id=row[0],
            sto_id=row[1],
            prediction_date=row[2],
            prediction_type=row[3],
            predicted_sales=row[4],
            predicted_supply=row[5],
            confidence_score=row[6],
            model_version=row[7],
            features_used=row[8],
            created_at=row[9]
        )
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "sto_id": self.sto_id,
            "prediction_date": self.prediction_date.isoformat() if self.prediction_date else None,
            "prediction_type": self.prediction_type,
            "predicted_sales": self.predicted_sales,
            "predicted_supply": self.predicted_supply,
            "confidence_score": self.confidence_score,
            "model_version": self.model_version,
            "features_used": self.features_used,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

@dataclass
class PredictionCache:
    id: Optional[int] = None
    cache_key: str = ""
    prediction_data: Dict[str, Any] = None
    expires_at: datetime = None
    created_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'PredictionCache':
        if not row:
            return None
        return cls(
            id=row[0],
            cache_key=row[1],
            prediction_data=row[2],
            expires_at=row[3],
            created_at=row[4]
        )
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "cache_key": self.cache_key,
            "prediction_data": self.prediction_data,
            "expires_at": self.expires_at.isoformat() if self.expires_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

@dataclass
class AvgSales:
    id: Optional[int] = None
    sto_id: str = ""
    period_start: date = None
    period_end: date = None
    avg_daily_sales: float = 0.0
    avg_weekly_sales: float = 0.0
    avg_monthly_sales: float = 0.0
    trend: str = ""  # 'increasing', 'decreasing', 'stable'
    seasonality_factor: float = 1.0
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'AvgSales':
        if not row:
            return None
        return cls(
            id=row[0],
            sto_id=row[1],
            period_start=row[2],
            period_end=row[3],
            avg_daily_sales=row[4],
            avg_weekly_sales=row[5],
            avg_monthly_sales=row[6],
            trend=row[7],
            seasonality_factor=row[8],
            created_at=row[9],
            updated_at=row[10]
        )
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "sto_id": self.sto_id,
            "period_start": self.period_start.isoformat() if self.period_start else None,
            "period_end": self.period_end.isoformat() if self.period_end else None,
            "avg_daily_sales": self.avg_daily_sales,
            "avg_weekly_sales": self.avg_weekly_sales,
            "avg_monthly_sales": self.avg_monthly_sales,
            "trend": self.trend,
            "seasonality_factor": self.seasonality_factor,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

@dataclass
class KetersediaanArsitektur:
    id: Optional[int] = None
    sto_id: str = ""
    arsitektur_type: str = ""
    total_capacity: int = 0
    used_capacity: int = 0
    available_capacity: int = 0
    utilization_rate: float = 0.0
    bottleneck_risk: str = ""  # 'Low', 'Medium', 'High'
    expansion_needed: bool = False
    calculated_at: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'KetersediaanArsitektur':
        if not row:
            return None
        return cls(
            id=row[0],
            sto_id=row[1],
            arsitektur_type=row[2],
            total_capacity=row[3],
            used_capacity=row[4],
            available_capacity=row[5],
            utilization_rate=row[6],
            bottleneck_risk=row[7],
            expansion_needed=row[8],
            calculated_at=row[9]
        )
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "sto_id": self.sto_id,
            "arsitektur_type": self.arsitektur_type,
            "total_capacity": self.total_capacity,
            "used_capacity": self.used_capacity,
            "available_capacity": self.available_capacity,
            "utilization_rate": self.utilization_rate,
            "bottleneck_risk": self.bottleneck_risk,
            "expansion_needed": self.expansion_needed,
            "calculated_at": self.calculated_at.isoformat() if self.calculated_at else None
        }

@dataclass
class FinalPemodelan:
    id: Optional[int] = None
    sto_id: str = ""
    prediction_period: str = ""  # 'daily', 'weekly', 'monthly'
    final_prediction: float = 0.0
    supply_recommendation: float = 0.0
    risk_level: str = ""  # 'Low', 'Medium', 'High'
    action_required: str = ""
    model_accuracy: float = 0.0
    last_updated: Optional[datetime] = None
    
    @classmethod
    def from_db_row(cls, row: tuple) -> 'FinalPemodelan':
        if not row:
            return None
        return cls(
            id=row[0],
            sto_id=row[1],
            prediction_period=row[2],
            final_prediction=row[3],
            supply_recommendation=row[4],
            risk_level=row[5],
            action_required=row[6],
            model_accuracy=row[7],
            last_updated=row[8]
        )
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "sto_id": self.sto_id,
            "prediction_period": self.prediction_period,
            "final_prediction": self.final_prediction,
            "supply_recommendation": self.supply_recommendation,
            "risk_level": self.risk_level,
            "action_required": self.action_required,
            "model_accuracy": self.model_accuracy,
            "last_updated": self.last_updated.isoformat() if self.last_updated else None
        }