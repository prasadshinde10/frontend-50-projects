import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/orderSlice';

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myOrders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, user]);

  if (!user) return <p>Please login to see your orders.</p>;
  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <h1>My Orders</h1>
      {myOrders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="stack">
          {myOrders.map((order) => (
            <article className="card" key={order._id}>
              <h3>Order #{order._id.slice(-6)}</h3>
              <p>Total: ₹{order.totalPrice}</p>
              <p>Items: {order.orderItems.length}</p>
              <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrdersPage;
