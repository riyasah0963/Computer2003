import React from 'react';
import { Star, ShoppingCart, Info, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setShowDetails(true)}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Info className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        
        <div className="flex items-center mt-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1">{product.rating}</span>
          <span className="ml-2 text-gray-500">({product.comments.length} reviews)</span>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            £{product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{product.name}</h3>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1">{product.rating} rating</span>
              <span className="ml-2 text-gray-500">({product.comments.length} reviews)</span>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Customer Reviews
              </h4>
              <div className="space-y-4">
                {product.comments.map(comment => (
                  <div key={comment.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{comment.userName}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1">{comment.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{comment.text}</p>
                    <p className="text-sm text-gray-500 mt-1">{new Date(comment.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-lg font-bold text-green-600 mb-4">
              £{product.price.toFixed(2)}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToCart(product);
                  setShowDetails(false);
                }}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}