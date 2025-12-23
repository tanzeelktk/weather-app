import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './App.css'

function App() {
  const URL = 'https://api.openweathermap.org/data/2.5/weather';
  let key = "f00c38e0279b7bc85480c3fe775d518c"
  const [data, setData] = useState(
    {
      city: "",
      icon: "",
      temp: "",
      humidity: "",
      speed: ""
    }
  )
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function getApiData(city) {
    try {
      setLoading(true)
      const temp = `${URL}?q=${city}&appid=${key}&units=metric`;
      const res = await fetch(temp)
      if (!res.ok) {
        setLoading(false)
        throw new Error("city not found")
      }
      const weatherData = await res.json()
      setCity("")
      setLoading(false)

      setData({
        city: weatherData.name, icon: weatherData.weather[0].icon,
        temp: weatherData.main.temp, humidity: weatherData.main.humidity,
        speed: weatherData.wind.speed
      })
    } catch (error) {
      setMessage(error.message)
    }
  }

  useEffect(() => {
    setMessage("Please enter city")
  }, [])

  function handleCityBox(e) {
    setCity(e.target.value)
  }

  function handleSearch() {
    if (city === "") {
      setMessage("Please enter city name.")
      return
    }
    setMessage("")
    getApiData(city)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-[2px] rounded-2xl bg-gradient-to-br from-teal-800 to-purple-800 shadow-[0_0_25px_rgba(168,85,247,0.6)]">
        <div className="w-[350px] h-[520px] bg-gradient-to-br from-teal-500/70 to-purple-400/70 rounded-2xl p-6">

          <div className="flex flex-col items-center gap-6">

            {/* Title */}
            <p className="text-2xl font-bold text-white">Weather App</p>

            {/* Search */}
            <div className="flex gap-3">
              <input
                placeholder="Enter city name"
                className="h-9 px-4 rounded-2xl outline-none"
                value={city}
                onChange={handleCityBox}
              />
              <button className="h-9 w-9 bg-white rounded-2xl flex items-center justify-center hover:bg-gray-200 transition"
                onClick={handleSearch}>
                <FaSearch size={15} className="text-gray-700" />
              </button>
            </div>
            {loading ? (<p className='text-white'>Loading....</p>) :
              message !== "" ? <p className='text-white'>{message}</p> :
                (<>{/* Weather Icon */}
                  <div className="text-white text-6xl"><img
                    src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                    alt="weather"
                    className="w-24 h-24"
                  /></div>

                  {/* Temperature */}
                  <p className="text-5xl font-bold text-white">{Math.ceil(data.temp)}°C</p>

                  {/* City */}
                  <p className="text-xl text-white">{data.city}</p>

                  {/* Extra Info */}
                  <div className="flex w-full justify-between text-white px-4 mt-4">
                    <div className="text-center">
                      <p className="font-semibold">{data.humidity}%</p>
                      <p className="text-sm">Humidity</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{data.speed} km/h</p>
                      <p className="text-sm">Wind Speed</p>
                    </div>
                  </div></>)}


          </div>
        </div>
      </div>
    </div>
  )
}

export default App
