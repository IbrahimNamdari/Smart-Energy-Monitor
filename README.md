# ⚡ Smart Energy Monitor (Full-Stack)

A modern, real-time industrial energy monitoring dashboard built with a decoupled architecture. This project visualizes power consumption across multiple devices using a high-performance tech stack.

## 🚀 The Tech Stack

- **Backend:** FastAPI (Python) - High performance, asynchronous API.
- **Database:** SQLite with SQLAlchemy ORM - Persistent and scalable storage.
- **Frontend:** React + Vite - Ultra-fast modern frontend tooling.
- **Styling:** Tailwind CSS v4 - Professional-grade utility-first styling.
- **Charts:** Recharts - Responsive and interactive data visualization.

## 🛠️ Core Features

- **Real-time Data Streaming:** Frontend updates every 5 seconds without page refresh.
- **Multi-Device Support:** Automatically detects and categorizes new devices (e.g., Washing Machine, Fridge).
- **Interactive Analytics:** Precision tooltips with second-level accuracy on data points.
- **Historical Logging:** Detailed activity logs for each device with highlighted "Latest" values.
- **CRUD Operations:** Fully documented API via Swagger UI.

## 💡 Problems This Solves

1. **Data Persistence:** Unlike simple scripts, this saves history in a database, allowing for long-term trend analysis.
2. **Scalability:** The decoupled architecture allows the backend to serve multiple clients (Web, Mobile, IoT) simultaneously.
3. **User Experience:** Transforms raw JSON data into actionable visual insights for energy management.

## 📈 Future Scalability (Roadmap)

This project is designed to be a foundation for larger systems:

- **Authentication:** Adding JWT-based security for multi-user access.
- **IoT Integration:** Connecting real sensors via MQTT or WebSockets for sub-second updates.
- **Predictive AI:** Using the stored data to predict future energy costs using Machine Learning.
- **Cloud Migration:** Easily switch the SQLite database to PostgreSQL for production environments.

---

_Developed with a focus on clean code and industrial standards._
