# from fastapi import FastAPI

# # 1. ایجاد یک نمونه از برنامه FastAPI
# app = FastAPI(title="Smart Energy API")

# # 2. تعریف اولین مسیر (Route)
# @app.get("/")
# def read_root():
#     return {"message": "Welcome to Smart Energy Monitor API"}

# # 3. مسیری برای گرفتن داده‌های فرضی انرژی
# @app.get("/energy-status")
# def get_energy_status():
#     # اینجا فرض می‌کنیم داده‌ها را از سنسور می‌گیریم
#     return {
#         "current_usage": 4.5,
#         "unit": "kW",
#         "status": "Normal",
#         "device_count": 12
#     }
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, database
import schemas

# ایجاد جدول‌ها در دیتابیس
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Smart Energy API")

# ایجاد یک تابع برای گرفتن دیتابیس در هر درخواست
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart Energy Monitor API with Database"}

# @app.get("/energy-status")
# def get_energy_status(db: Session = Depends(get_db)):
#     # حالا به جای داده ثابت، می‌توانیم آخرین داده را از دیتابیس بگیریم
#     # فعلاً چون دیتابیس خالی است، همان منطق قبلی را برمی‌گردانیم تا خطا ندهد
#     return {
#         "current_usage": 4.5,
#         "unit": "kW",
#         "status": "Connected to DB"
#     }

@app.get("/energy-status")
def get_energy_status(db: Session = Depends(get_db)):
    # 1. جستجو در دیتابیس برای پیدا کردن آخرین رکورد ثبت شده (بر اساس ID)
    last_record = db.query(models.EnergyData).order_by(models.EnergyData.id.desc()).first()
    
    # 2. اگر دیتابیس خالی بود، یک پیام مناسب بده
    if not last_record:
        return {"message": "No data found in database yet."}
    
    # 3. برگرداندن آخرین داده واقعی
    return last_record

@app.get("/energy-history", response_model=list[schemas.EnergyResponse])
def get_all_history(db: Session = Depends(get_db)):
    # تمام رکوردها را از دیتابیس می‌گیرد
    all_records = db.query(models.EnergyData).all()
    return all_records

@app.post("/energy-data", response_model=schemas.EnergyResponse)
def create_energy_data(data: schemas.EnergyCreate, db: Session = Depends(get_db)):
    # 1. تبدیل داده ورودی به مدل دیتابیس
    new_entry = models.EnergyData(
        value=data.value,
        device_name=data.device_name,
        unit=data.unit
    )
    # 2. اضافه کردن به دیتابیس
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry
