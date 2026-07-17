import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  const linkClasses = ({ isActive }) =>
    `relative text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
      isActive ? "text-[#00F0FF] neon-text" : "text-[#E2E8F0] hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-[0.3em] text-white">
          IDEAS<span className="text-[#00F0FF]">X</span>LUXE
        </Link>

        <nav className="flex items-center space-x-10">
          <NavLink to="/" end className={linkClasses}>
            Shop
          </NavLink>
          <NavLink to="/cart" className={linkClasses}>
            Cart
          </NavLink>
          <NavLink to="/checkout" className={linkClasses}>
            Checkout
          </NavLink>

          <Link to="/cart" className="relative flex items-center ml-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#E2E8F0] hover:text-white transition-colors"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#00F0FF] text-[#050505] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-neon">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}