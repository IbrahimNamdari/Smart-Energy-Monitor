from fastapi import FastAPI

# 1. ایجاد یک نمونه از برنامه FastAPI
app = FastAPI(title="Smart Energy API")

# 2. تعریف اولین مسیر (Route)
@app.get("/")
def read_root():
    return {"message": "Welcome to Smart Energy Monitor API"}

# 3. مسیری برای گرفتن داده‌های فرضی انرژی
@app.get("/energy-status")
def get_energy_status():
    # اینجا فرض می‌کنیم داده‌ها را از سنسور می‌گیریم
    return {
        "current_usage": 4.5,
        "unit": "kW",
        "status": "Normal",
        "device_count": 12
    }