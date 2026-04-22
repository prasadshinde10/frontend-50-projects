const productGrid = document.getElementById('productGrid');
const statusEl = document.getElementById('status');

function createCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.name;

  const content = document.createElement('div');
  content.className = 'product-card-content';

  const name = document.createElement('h2');
  name.textContent = product.name;

  const description = document.createElement('p');
  description.textContent = product.description;

  content.append(name, description);
  card.append(image, content);

  return card;
}

async function loadProducts() {
  try {
    const response = await fetch('./data/products.json');
    if (!response.ok) {
      throw new Error('Unable to load products.');
    }

    const products = await response.json();
    productGrid.innerHTML = '';

    products.forEach((product) => {
      productGrid.appendChild(createCard(product));
    });

    statusEl.textContent = `Showing ${products.length} products`;
  } catch (error) {
    statusEl.textContent = error.message;
  }
}

loadProducts();
