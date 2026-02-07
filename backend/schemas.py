from pydantic import BaseModel
from datetime import datetime

# این مدل مشخص می‌کند کاربر چه داده‌هایی را باید برای ما بفرستد
class EnergyCreate(BaseModel):
    value: float
    device_name: str
    unit: str = "kW"

# این مدل برای نشان دادن خروجی به کاربر است (شامل ID و زمان ثبت)
class EnergyResponse(EnergyCreate):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True