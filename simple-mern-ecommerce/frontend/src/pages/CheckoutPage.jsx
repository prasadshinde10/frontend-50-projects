import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { clearLatestOrder, createOrder } from '../redux/orderSlice';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { latestOrder, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    return () => {
      dispatch(clearLatestOrder());
    };
  }, [dispatch]);

  if (!user) {
    return <p>Please login before checkout.</p>;
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = async () => {
    const payload = {
      orderItems: items,
      totalPrice,
      paymentMethod: 'Mock Payment Success',
    };

    const resultAction = await dispatch(createOrder(payload));
    if (createOrder.fulfilled.match(resultAction)) {
      dispatch(clearCart());
    }
  };

  return (
    <section>
      <h1>Checkout</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <p>Total amount: ₹{totalPrice}</p>
          <p>Payment mode: Mock payment (always succeeds for demo).</p>
          <button type="button" className="button" onClick={placeOrder} disabled={loading}>
            {loading ? 'Processing...' : 'Pay & Place Order'}
          </button>
        </>
      )}
      {latestOrder && <p className="success">Order placed successfully. Order ID: {latestOrder._id}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default CheckoutPage;
