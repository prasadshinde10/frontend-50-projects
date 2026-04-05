const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");

const products = [
  { id: 1, name: "Wireless Mouse", price: 25 },
  { id: 2, name: "Keyboard", price: 40 },
  { id: 3, name: "Headphones", price: 60 },
  { id: 4, name: "Webcam", price: 55 }
];

let cart = [];

function renderProducts() {
  productsEl.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${p.name}</h3><p>$${p.price}</p>`;
    const btn = document.createElement("button");
    btn.textContent = "Add to cart";
    btn.onclick = () => addToCart(p);
    div.appendChild(btn);
    productsEl.appendChild(div);
  });
}
function addToCart(p) {
  const item = cart.find(c => c.id === p.id);
  if (item) item.qty++;
  else cart.push({ ...p, qty: 1 });
  renderCart();
}
function renderCart() {
  cartEl.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `<span>${item.name} ($${item.price})</span>`;
    const qty = document.createElement("div");
    qty.className = "qty";
    const minus = document.createElement("button");
    minus.textContent = "-";
    minus.onclick = () => {
      item.qty--;
      if (item.qty <= 0) cart = cart.filter(i => i.id !== item.id);
      renderCart();
    };
    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.onclick = () => { item.qty++; renderCart(); };
    qty.append(minus, document.createTextNode(item.qty), plus);
    div.appendChild(qty);
    cartEl.appendChild(div);
  });
  totalEl.textContent = total.toFixed(2);
}
renderProducts();