import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../redux/productSlice';
import { fetchAdminUsers, fetchAllOrders } from '../redux/orderSlice';

const emptyProduct = { name: '', price: '', description: '', image: '', countInStock: '' };

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { list: products } = useSelector((state) => state.products);
  const { allOrders, adminUsers } = useSelector((state) => state.orders);
  const [form, setForm] = useState(emptyProduct);

  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(fetchProducts());
      dispatch(fetchAllOrders());
      dispatch(fetchAdminUsers());
    }
  }, [dispatch, user]);

  if (!user?.isAdmin) {
    return <p>Admin access only.</p>;
  }

  const addProduct = async (event) => {
    event.preventDefault();
    await dispatch(
      createProduct({
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
      })
    );
    setForm(emptyProduct);
  };

  const editProduct = async (product) => {
    const name = window.prompt('Update product name', product.name);
    if (!name) return;

    const price = window.prompt('Update product price', product.price);
    const countInStock = window.prompt('Update stock count', product.countInStock);
    const description = window.prompt('Update description', product.description);
    const image = window.prompt('Update image URL', product.image || '');

    await dispatch(
      updateProduct({
        id: product._id,
        product: {
          name,
          price: Number(price),
          countInStock: Number(countInStock),
          description: description || product.description,
          image: image || '',
        },
      })
    );
  };

  return (
    <section>
      <h1>Admin Dashboard</h1>
      <h2>Add Product</h2>
      <form className="form" onSubmit={addProduct}>
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        />
        <input
          required
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
        />
        <input
          required
          placeholder="Description"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
        />
        <input
          required
          type="number"
          placeholder="Stock"
          value={form.countInStock}
          onChange={(event) => setForm((prev) => ({ ...prev, countInStock: event.target.value }))}
        />
        <button className="button" type="submit">
          Add Product
        </button>
      </form>

      <h2>Manage Products</h2>
      <div className="stack">
        {products.map((product) => (
          <article key={product._id} className="card card-row">
            <div>
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
            <div className="button-group">
              <button type="button" onClick={() => editProduct(product)}>
                Edit
              </button>
              <button type="button" onClick={() => dispatch(deleteProduct(product._id))}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <h2>All Orders</h2>
      <div className="stack">
        {allOrders.map((order) => (
          <article key={order._id} className="card">
            <h3>Order #{order._id.slice(-6)}</h3>
            <p>Customer: {order.user?.name || 'Unknown user'}</p>
            <p>Total: ₹{order.totalPrice}</p>
            <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
          </article>
        ))}
      </div>

      <h2>Users</h2>
      <div className="stack">
        {adminUsers.map((adminUser) => (
          <article key={adminUser._id} className="card">
            <h3>{adminUser.name}</h3>
            <p>{adminUser.email}</p>
            <p>Role: {adminUser.isAdmin ? 'Admin' : 'Customer'}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
