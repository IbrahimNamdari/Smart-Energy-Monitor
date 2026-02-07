from sqlalchemy import create_url, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. آدرس دیتابیس (یک فایل محلی به نام energy.db ساخته خواهد شد)
SQLALCHEMY_DATABASE_URL = "sqlite:///./energy.db"

# 2. ایجاد موتور دیتابیس
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 3. ایجاد یک جلسه (Session) برای تعامل با دیتابیس
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. کلاسی که مدل‌های ما از آن ارث‌بری می‌کنند
Base = declarative_base()