from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from database import Base

class EnergyData(Base):
    __tablename__ = "energy_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow) # زمان ثبت داده
    value = Column(Float) # مقدار مصرف (مثلا 4.5)
    unit = Column(String, default="kW") # واحد
    device_name = Column(String) # نام دستگاه سنسور