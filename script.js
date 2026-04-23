const featuredContainer = document.getElementById('featuredProducts');
const featuredStatus = document.getElementById('featuredStatus');
const PRODUCTS_URL = './data/products.json';

function createCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.name;
  image.loading = 'lazy';

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

async function loadFeaturedProducts() {
  if (!featuredContainer || !featuredStatus) {
    return;
  }

  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) {
      throw new Error(`Unable to load products (HTTP ${response.status}).`);
    }

    const products = await response.json();
    const featured = products.slice(0, 6);

    featuredContainer.innerHTML = '';
    featured.forEach((product) => {
      featuredContainer.appendChild(createCard(product));
    });

    featuredStatus.textContent = `Showing ${featured.length} featured products`;
  } catch (error) {
    console.error(error);
    featuredStatus.textContent = 'Unable to load featured products. Please try again later.';
  }
}

loadFeaturedProducts();
