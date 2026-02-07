// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// function App() {
//   const [data, setData] = useState([])
//   const [devices, setDevices] = useState([])
//   const [latestValues, setLatestValues] = useState({})

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/energy-history')
//       const rawData = response.data

//       const uniqueDevices = [...new Set(rawData.map(item => item.device_name))]
//       setDevices(uniqueDevices)

//       // استخراج آخرین مقدار ثبت شده برای هر دستگاه
//       const latest = {}
//       uniqueDevices.forEach(device => {
//         const deviceData = rawData.filter(d => d.device_name === device)
//         latest[device] = deviceData[deviceData.length - 1]
//       })
//       setLatestValues(latest)

//       const formattedData = rawData.reduce((acc, curr) => {
//         const time = new Date(curr.timestamp).toLocaleTimeString()
//         let existingEntry = acc.find(entry => entry.time === time)

//         if (existingEntry) {
//           existingEntry[curr.device_name] = curr.value
//         } else {
//           acc.push({ time, [curr.device_name]: curr.value })
//         }
//         return acc
//       }, [])

//       setData(formattedData)
//     } catch (error) {
//       console.error("Error fetching data:", error)
//     }
//   }

//   useEffect(() => {
//     fetchData()
//     const interval = setInterval(fetchData, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const getColor = (index) => {
//     const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE']
//     return colors[index % colors.length]
//   }

//   return (
//     <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Segoe UI' }}>
//       <h1 style={{ textAlign: 'center', color: '#1e293b' }}>Industrial Energy Monitor</h1>

//       <div style={{ width: '100%', height: 450, backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="time" />
//             <YAxis unit=" kW" />
//             <Tooltip
//               contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
//             />
//             <Legend />
//             {devices.map((device, index) => (
//               <Line
//                 key={device}
//                 type="monotone"
//                 dataKey={device}
//                 stroke={getColor(index)}
//                 strokeWidth={3}
//                 dot={{ r: 6 }}
//                 activeDot={{ r: 10 }}
//                 connectNulls
//               />
//             ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

// <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
//         {devices.map((device, index) => {
//           // پیدا کردن تمام مقادیر مربوط به این دستگاه خاص از داده‌های اصلی
//           const deviceHistory = data
//             .filter(entry => entry[device] !== undefined)
//             .map(entry => ({ time: entry.time, val: entry[device] }));

//           return (
//             <div key={device} style={{ padding: '15px', backgroundColor: 'white', borderRadius: '10px', borderLeft: `5px solid ${getColor(index)}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
//               <h3 style={{ margin: '0 0 10px 0', color: '#334155' }}>{device}</h3>
//               <div style={{ fontSize: '14px', color: '#64748b', maxHeight: '150px', overflowY: 'auto' }}>
//                 <p style={{ marginBottom: '5px', fontWeight: '600' }}>History:</p>
//                 {deviceHistory.map((h, i) => (
//                   <div key={i} style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     padding: '2px 0',
//                     // استایل دهی به آخرین داده (Last Entry)
//                     fontWeight: i === deviceHistory.length - 1 ? '800' : '400',
//                     color: i === deviceHistory.length - 1 ? '#0f172a' : '#64748b',
//                     fontSize: i === deviceHistory.length - 1 ? '16px' : '14px',
//                     borderBottom: '1px solid #f1f5f9'
//                   }}>
//                     <span>{h.time}</span>
//                     <span>{h.val} kW {i === deviceHistory.length - 1 ? '(Latest)' : ''}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [devices, setDevices] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/energy-history");
      const rawData = response.data;
      const uniqueDevices = [...new Set(rawData.map((item) => item.device_name))];
      setDevices(uniqueDevices);

      const formattedData = rawData.reduce((acc, curr) => {
        const time = new Date(curr.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: '2-digit' });
        let existingEntry = acc.find((entry) => entry.time === time);
        if (existingEntry) {
          existingEntry[curr.device_name] = curr.value;
        } else {
          acc.push({ time, [curr.device_name]: curr.value });
        }
        return acc;
      }, []);
      setData(formattedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  //   const interval = setInterval(fetchData, 5000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    // ایجاد یک پرچم (Flag) برای جلوگیری از آپدیت روی کامپوننت آن‌مانت شده
    let isMounted = true;

    const getUpdates = async () => {
      if (isMounted) {
        await fetchData();
      }
    };

    // اجرای اولیه
    getUpdates();

    // تنظیم اینتروال
    const interval = setInterval(getUpdates, 5000);

    // تابع پاکسازی (Cleanup)
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []); // آرایه وابستگی خالی برای اینکه فقط یکبار در شروع اجرا شود

  const getColor = (i) => ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][i % 5];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Smart <span className="text-blue-600">Energy</span> Monitor
        </h1>
        <p className="mt-2 text-slate-600">Real-time industrial data visualization dashboard.</p>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Chart Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Consumption Overview</h2>
            <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              Live System
            </span>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit=" kW" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend iconType="circle" />
                {devices.map((device, index) => (
                  <Line
                    key={device}
                    type="monotone"
                    dataKey={device}
                    stroke={getColor(index)}
                    strokeWidth={4}
                    dot={{ r: 4, fill: getColor(index), strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Device Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device, index) => {
            const deviceHistory = data
              .filter((entry) => entry[device] !== undefined)
              .map((entry) => ({ time: entry.time, val: entry[device] }));
            const latestVal = deviceHistory[deviceHistory.length - 1]?.val;

            return (
              <div
                key={device}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 text-lg">{device}</h3>
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${getColor(index)}20`, color: getColor(index) }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900">{latestVal || 0}</span>
                  <span className="text-slate-500 ml-1">kW</span>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-hide">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recent Activity</p>
                  {deviceHistory
                    .slice()
                    .reverse()
                    .map((h, i) => (
                      <div
                        key={i}
                        className={`flex justify-between text-sm p-2 rounded-lg ${
                          i === 0 ? "bg-slate-50 font-bold text-slate-900" : "text-slate-500"
                        }`}
                      >
                        <span>{h.time}</span>
                        <span>{h.val} kW</span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
