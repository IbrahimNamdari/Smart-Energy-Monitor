import { useState, useEffect } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function App() {
  const [data, setData] = useState([])
  const [devices, setDevices] = useState([])
  const [latestValues, setLatestValues] = useState({})

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/energy-history')
      const rawData = response.data

      const uniqueDevices = [...new Set(rawData.map(item => item.device_name))]
      setDevices(uniqueDevices)

      // استخراج آخرین مقدار ثبت شده برای هر دستگاه
      const latest = {}
      uniqueDevices.forEach(device => {
        const deviceData = rawData.filter(d => d.device_name === device)
        latest[device] = deviceData[deviceData.length - 1]
      })
      setLatestValues(latest)

      const formattedData = rawData.reduce((acc, curr) => {
        const time = new Date(curr.timestamp).toLocaleTimeString()
        let existingEntry = acc.find(entry => entry.time === time)
        
        if (existingEntry) {
          existingEntry[curr.device_name] = curr.value
        } else {
          acc.push({ time, [curr.device_name]: curr.value })
        }
        return acc
      }, [])

      setData(formattedData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const getColor = (index) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE']
    return colors[index % colors.length]
  }

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Segoe UI' }}>
      <h1 style={{ textAlign: 'center', color: '#1e293b' }}>Industrial Energy Monitor</h1>
      
      <div style={{ width: '100%', height: 450, backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" />
            <YAxis unit=" kW" />
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend />
            {devices.map((device, index) => (
              <Line 
                key={device}
                type="monotone" 
                dataKey={device} 
                stroke={getColor(index)} 
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 10 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

<div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {devices.map((device, index) => {
          // پیدا کردن تمام مقادیر مربوط به این دستگاه خاص از داده‌های اصلی
          const deviceHistory = data
            .filter(entry => entry[device] !== undefined)
            .map(entry => ({ time: entry.time, val: entry[device] }));

          return (
            <div key={device} style={{ padding: '15px', backgroundColor: 'white', borderRadius: '10px', borderLeft: `5px solid ${getColor(index)}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#334155' }}>{device}</h3>
              <div style={{ fontSize: '14px', color: '#64748b', maxHeight: '150px', overflowY: 'auto' }}>
                <p style={{ marginBottom: '5px', fontWeight: '600' }}>History:</p>
                {deviceHistory.map((h, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '2px 0',
                    // استایل دهی به آخرین داده (Last Entry)
                    fontWeight: i === deviceHistory.length - 1 ? '800' : '400',
                    color: i === deviceHistory.length - 1 ? '#0f172a' : '#64748b',
                    fontSize: i === deviceHistory.length - 1 ? '16px' : '14px',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <span>{h.time}</span>
                    <span>{h.val} kW {i === deviceHistory.length - 1 ? '(Latest)' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App