import { useState, useEffect } from 'react';
import axios from 'axios';
import CityList from './CityList';
import CityDetails from './CityDetails';
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);

  // Список городов для отображения
  const defaultCities = ['Moscow', 'London', 'Tokyo', 'New York', 'Sydney'];

  // Запрос списка погоды для городов
  useEffect(() => {
    const fetchCitiesWeather = async () => {
      try {
        const promises = defaultCities.map(city =>
          axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`)
        );
        const responses = await Promise.all(promises);
        setCities(responses.map(res => res.data));
      } catch (error) {
        console.error('Ошибка при загрузке погоды:', error);
      }
    };
    fetchCitiesWeather();
  }, []);

  // Запрос детальной информации о погоде
  useEffect(() => {
    if (selectedCity) {
      const fetchCityDetails = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}?q=${selectedCity}&units=metric&appid=${API_KEY}`
          );
          setCityDetails(response.data);
        } catch (error) {
          console.error('Ошибка при загрузке деталей:', error);
        }
      };
      fetchCityDetails();
    }
  }, [selectedCity]);

  return (
    <div className="app">
      <h1>Погодный виджет</h1>
      <CityList cities={cities} onSelectCity={setSelectedCity} />
      {cityDetails && <CityDetails details={cityDetails} />}
    </div>
  );
}

export default App;
