import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <article className="card">
      {product.image && <img src={product.image} alt={product.name} className="card-image" />}
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p className="muted">{product.description.slice(0, 80)}...</p>
      <Link className="button" to={`/product/${product._id}`}>
        View Product
      </Link>
    </article>
  );
};

export default ProductCard;
