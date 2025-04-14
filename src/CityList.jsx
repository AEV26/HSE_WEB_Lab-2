function CityList({ cities, onSelectCity }) {
  return (
    <div className="city-list">
      <h2>Города</h2>
      <ul>
        {cities.map(city => (
          <li key={city.id} onClick={() => onSelectCity(city.name)}>
            {city.name}: {city.main.temp}°C, {city.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityList;
