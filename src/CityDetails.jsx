function CityDetails({ details }) {
  return (
    <div className="city-details">
      <h2>Погода в {details.name}</h2>
      <p>Температура: {details.main.temp}°C</p>
      <p>Ощущается как: {details.main.feels_like}°C</p>
      <p>Влажность: {details.main.humidity}%</p>
      <p>Скорость ветра: {details.wind.speed} м/с</p>
      <p>Описание: {details.weather[0].description}</p>
    </div>
  );
}

export default CityDetails;
