const form = document.getElementById("form");
const list = document.getElementById("list");
const balance = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  list.innerHTML = "";
  let total = 0;

  transactions.forEach(t => {
    total += t.amount;
    const li = document.createElement("li");
    li.className = t.amount >= 0 ? "plus" : "minus";
    li.innerHTML = `${t.text} <span>${t.amount}</span>`;
    list.appendChild(li);
  });

  balance.textContent = `$${total.toFixed(2)}`;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;
  transactions.push({ text, amount });
  form.reset();
  updateUI();
});

updateUI();