import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { Search, Filter } from 'lucide-react';
import Fuse from 'fuse.js';

export const PRODUCTS: Product[] = [
  // Fruits
  {
    id: '1',
    name: 'Organic Fuji Apples',
    price: 2.49,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    rating: 4.5,
    description: 'Fresh, crisp organic Fuji apples perfect for snacking',
    sales: 150,
    comments: [
      {
        id: '1',
        userId: 'user1',
        userName: 'John D.',
        rating: 5,
        text: 'Best apples I\'ve ever had! Very fresh and sweet.',
        date: '2025-02-15'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Sarah M.',
        rating: 4,
        text: 'Great quality, will buy again.',
        date: '2025-02-14'
      }
    ]
  },
  // More fruits...
  {
    id: '2',
    name: 'Fresh Bananas',
    price: 1.75,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    rating: 4.3,
    description: 'Ripe and sweet bananas, perfect for smoothies',
    sales: 200,
    comments: [
      {
        id: '3',
        userId: 'user3',
        userName: 'Mike R.',
        rating: 4,
        text: 'Always fresh and well-priced.',
        date: '2025-02-13'
      }
    ]
  },
  
  // Dairy Products
  {
    id: '3',
    name: 'Organic Whole Milk',
    price: 3.99,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b',
    rating: 4.8,
    description: 'Fresh organic whole milk from local farms',
    sales: 180,
    comments: [
      {
        id: '4',
        userId: 'user4',
        userName: 'Emma L.',
        rating: 5,
        text: 'Tastes just like the milk from my childhood!',
        date: '2025-02-12'
      }
    ]
  },
  
  // Bakery Items
  {
    id: '4',
    name: 'Artisan Sourdough Bread',
    price: 4.50,
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    rating: 4.7,
    description: 'Freshly baked artisan sourdough bread',
    sales: 120,
    comments: [
      {
        id: '5',
        userId: 'user5',
        userName: 'David K.',
        rating: 5,
        text: 'Best sourdough in Plymouth!',
        date: '2025-02-11'
      }
    ]
  },
  
  // Beverages
  {
    id: '5',
    name: 'Fresh Orange Juice',
    price: 3.25,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820',
    rating: 4.6,
    description: 'Freshly squeezed orange juice',
    sales: 90,
    comments: [
      {
        id: '6',
        userId: 'user6',
        userName: 'Lisa M.',
        rating: 4,
        text: 'So refreshing and natural!',
        date: '2025-02-10'
      }
    ]
  },
  
  // Snacks
  {
    id: '6',
    name: 'Mixed Nuts',
    price: 5.75,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32',
    rating: 4.5,
    description: 'Premium mixed nuts, perfect for snacking',
    sales: 75,
    comments: [
      {
        id: '7',
        userId: 'user7',
        userName: 'Tom H.',
        rating: 5,
        text: 'Great mix of nuts, very fresh!',
        date: '2025-02-09'
      }
    ]
  },
  
  // Organic Products
  {
    id: '7',
    name: 'Organic Quinoa',
    price: 6.50,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2',
    rating: 4.4,
    description: 'Premium organic quinoa',
    sales: 60,
    comments: [
      {
        id: '8',
        userId: 'user8',
        userName: 'Anna P.',
        rating: 4,
        text: 'Great quality organic quinoa!',
        date: '2025-02-08'
      }
    ]
  },
  
  // Vegetables
  {
    id: '8',
    name: 'Fresh Broccoli',
    price: 1.99,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc',
    rating: 4.3,
    description: 'Fresh and crisp broccoli',
    sales: 110,
    comments: [
      {
        id: '9',
        userId: 'user9',
        userName: 'Chris B.',
        rating: 4,
        text: 'Always fresh and crisp!',
        date: '2025-02-07'
      }
    ]
  }
];

// Initialize Fuse.js for fuzzy search
const fuse = new Fuse(PRODUCTS, {
  keys: ['name', 'description', 'category'],
  threshold: 0.3,
  distance: 100
});

export function Products() {
  const [category, setCategory] = useState<'all' | 'fruits' | 'vegetables' | 'packaged' | 'dairy' | 'bakery' | 'beverages' | 'snacks' | 'organic'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'sales'>('rating');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  // AI-powered search and filtering
  useEffect(() => {
    let results = [...PRODUCTS];

    // Apply category filter
    if (category !== 'all') {
      results = results.filter(product => product.category === category);
    }

    // Apply fuzzy search if search term exists
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      results = searchResults.map(result => result.item);
    }

    // Apply sorting
    results.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'sales') {
        return b.sales - a.sales;
      }
      return b.rating - a.rating;
    });

    setFilteredProducts(results);

    // AI-powered recommendations based on search and filters
    if (results.length > 0) {
      const recommendedProducts = PRODUCTS
        .filter(p => !results.includes(p)) // Exclude already shown products
        .sort((a, b) => {
          // Prioritize products in the same category
          if (category !== 'all' && a.category === category) return -1;
          if (category !== 'all' && b.category === category) return 1;
          
          // Then by rating and sales
          return (b.rating * b.sales) - (a.rating * a.sales);
        })
        .slice(0, 4);
      
      setRecommendations(recommendedProducts);
    }
  }, [searchTerm, category, sortBy]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        
        {/* Enhanced Search and Sort Controls */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'sales')}
                className="p-2 border rounded-md focus:outline-none focus:border-green-500"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="sales">Sort by Popularity</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                  setSortBy('rating');
                }}
                className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategory('all')}
            className={`px-4 py-2 rounded-md ${
              category === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>
          {['fruits', 'vegetables', 'dairy', 'bakery', 'beverages', 'snacks', 'organic', 'packaged'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as typeof category)}
              className={`px-4 py-2 rounded-md ${
                category === cat ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
          {recommendations.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">You might be interested in:</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {recommendations.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* AI-Powered Recommendations */}
          {recommendations.length > 0 && searchTerm && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">You might also like:</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {recommendations.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}