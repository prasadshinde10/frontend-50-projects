const cityInput = document.getElementById("city");
const btn = document.getElementById("btn");
const current = document.getElementById("current");
const forecast = document.getElementById("forecast");

async function geocode(city) {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const data = await res.json();
  if (!data.results || !data.results.length) throw new Error("City not found");
  return data.results[0];
}

async function getWeather(lat, lon) {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
  return res.json();
}

btn.onclick = async () => {
  if (!cityInput.value.trim()) return;
  current.textContent = "Loading...";
  forecast.innerHTML = "";
  try {
    const place = await geocode(cityInput.value.trim());
    const data = await getWeather(place.latitude, place.longitude);

    current.innerHTML = `
      <h2>${place.name}, ${place.country}</h2>
      <p>Temperature: ${data.current.temperature_2m}°C</p>
      <p>Wind: ${data.current.wind_speed_10m} km/h</p>
    `;

    data.daily.time.slice(0,5).forEach((day, i) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <strong>${day}</strong>
        <div>Max: ${data.daily.temperature_2m_max[i]}°C</div>
        <div>Min: ${data.daily.temperature_2m_min[i]}°C</div>
      `;
      forecast.appendChild(card);
    });
  } catch (e) {
    current.textContent = e.message;
  }
};