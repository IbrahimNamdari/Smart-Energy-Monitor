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
from . import models, database

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

@app.get("/energy-status")
def get_energy_status(db: Session = Depends(get_db)):
    # حالا به جای داده ثابت، می‌توانیم آخرین داده را از دیتابیس بگیریم
    # فعلاً چون دیتابیس خالی است، همان منطق قبلی را برمی‌گردانیم تا خطا ندهد
    return {
        "current_usage": 4.5,
        "unit": "kW",
        "status": "Connected to DB"
    }