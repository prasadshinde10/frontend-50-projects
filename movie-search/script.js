const apiKey = "YOUR_API_KEY";

document.getElementById("search").addEventListener("click", async () => {
  const q = document.getElementById("query").value.trim();
  if (!q) return;

  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${q}`);
  const data = await res.json();
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (data.Response === "False") {
    results.textContent = "No results found.";
    return;
  }

  data.Search.slice(0, 5).forEach(movie => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${movie.Title}</strong> (${movie.Year})`;
    results.appendChild(card);
  });
});