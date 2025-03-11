import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FreshMart</h3>
            <p className="text-green-200">
              Your one-stop shop for fresh groceries and quality products.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-green-200 hover:text-white">Products</a></li>
              <li><a href="/contact" className="text-green-200 hover:text-white">Contact</a></li>
              <li><a href="/about" className="text-green-200 hover:text-white">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-green-200">
              <li>1-800-FRESH-MART</li>
              <li>support@freshmart.com</li>
              <li>123 Grocery St, Plymouth, UK</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com/freshmart" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/freshmart" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/freshmart" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-green-700 text-center text-green-200">
          <p>&copy; 2025 FreshMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}