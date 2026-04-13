import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../redux/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <h1>All Products</h1>
      <div className="grid">{list.map((product) => <ProductCard key={product._id} product={product} />)}</div>
    </section>
  );
};

export default HomePage;
