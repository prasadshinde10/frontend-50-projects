const apiKey = "YOUR_API_KEY";

document.getElementById("search").addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();
  if (!city) return;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  const data = await res.json();

  if (data.cod !== 200) {
    document.getElementById("result").textContent = "City not found.";
    return;
  }

  document.getElementById("result").textContent =
    `${data.name}: ${Math.round(data.main.temp)}°C, ${data.weather[0].main}`;
});