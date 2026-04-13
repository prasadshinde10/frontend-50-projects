import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="app-shell">
      <header className="header">
        <Link to="/" className="brand">
          Simple MERN E-Commerce
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          {user ? (
            <>
              <NavLink to="/checkout">Checkout</NavLink>
              <NavLink to="/orders">My Orders</NavLink>
              {user.isAdmin && <NavLink to="/admin">Admin</NavLink>}
              <button type="button" className="link-button" onClick={() => dispatch(logout())}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth">Login/Register</NavLink>
          )}
        </nav>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
