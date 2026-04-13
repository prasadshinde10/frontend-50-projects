import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { fetchProductById } from '../redux/productSlice';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: product, loading, error } = useSelector((state) => state.products);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !product) return <p>Loading product...</p>;
  if (error) return <p className="error">{error}</p>;

  const onAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
      })
    );
  };

  return (
    <section className="product-details">
      {product.image && <img src={product.image} alt={product.name} className="detail-image" />}
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p>
          <strong>Stock:</strong> {product.countInStock}
        </p>
        <label>
          Quantity
          <input
            type="number"
            min="1"
            max={Math.max(product.countInStock, 1)}
            value={qty}
            onChange={(event) => setQty(Number(event.target.value))}
          />
        </label>
        <button type="button" className="button" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default ProductPage;
