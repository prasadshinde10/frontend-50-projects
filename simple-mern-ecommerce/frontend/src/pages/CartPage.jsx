import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section>
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="stack">
          {items.map((item) => (
            <article key={item.product} className="card card-row">
              <div>
                <h3>{item.name}</h3>
                <p>
                  {item.qty} x ₹{item.price}
                </p>
              </div>
              <button type="button" onClick={() => dispatch(removeFromCart(item.product))}>
                Remove
              </button>
            </article>
          ))}
          <h3>Total: ₹{total}</h3>
          <Link className="button" to="/checkout">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </section>
  );
};

export default CartPage;
