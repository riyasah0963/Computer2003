import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { items } = useCart();
  const { user } = useAuth();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">FreshMart</Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/products" className="hover:text-green-200">Products</Link>
          <Link to="/contact" className="hover:text-green-200">Contact</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to={user ? "/profile" : "/login"}>
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}