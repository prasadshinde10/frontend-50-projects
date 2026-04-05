const query = document.getElementById("query");
const searchBtn = document.getElementById("search");
const result = document.getElementById("result");

async function fetchUser(username) {
  const userRes = await fetch(`https://api.github.com/users/${username}`);
  if (!userRes.ok) throw new Error("User not found");
  const user = await userRes.json();

  const repoRes = await fetch(user.repos_url + "?per_page=5&sort=updated");
  const repos = await repoRes.json();

  result.innerHTML = `
    <div class="card">
      <img src="${user.avatar_url}" alt="avatar"/>
      <div>
        <h2>${user.name || user.login}</h2>
        <p>${user.bio || "No bio provided"}</p>
        <p>Followers: ${user.followers} • Repos: ${user.public_repos}</p>
        <h3>Recent Repos</h3>
        ${repos.map(r => `<div class="repo">${r.name}</div>`).join("")}
      </div>
    </div>
  `;
}

searchBtn.onclick = async () => {
  if (!query.value.trim()) return;
  result.textContent = "Loading...";
  try {
    await fetchUser(query.value.trim());
  } catch (e) {
    result.textContent = e.message;
  }
};