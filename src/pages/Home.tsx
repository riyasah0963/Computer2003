import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck, Clock, HeadphonesIcon, MapPin, Search, Star, TrendingUp, Store, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

// Import the products from Products page
import { PRODUCTS } from './Products';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [sellerFormData, setSellerFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    productCategory: '',
    description: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowSellerForm(false);
      setFormSubmitted(false);
      setSellerFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        productCategory: '',
        description: ''
      });
    }, 3000);
  };

  // Get top selling products (top 8 by sales for carousel)
  const topSellingProducts = [...PRODUCTS]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 8);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoScrolling) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => 
          prev === topSellingProducts.length - 4 ? 0 : prev + 1
        );
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isAutoScrolling, topSellingProducts.length]);

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth / 4;
      carouselRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? topSellingProducts.length - 4 : prev - 1));
    setIsAutoScrolling(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === topSellingProducts.length - 4 ? 0 : prev + 1));
    setIsAutoScrolling(false);
  };

  return (
    <div>
      {/* Hero Section with Search */}
      <div className="relative h-[500px] bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e)'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto h-full flex items-center">
          <div className="text-white max-w-2xl">
            <div className="flex items-center gap-2 mb-4 text-green-300">
              <MapPin className="w-5 h-5" />
              <span>Plymouth, United Kingdom</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Fresh Groceries Delivered to Your Door</h1>
            <p className="text-xl mb-8">Shop from our wide selection of fresh fruits, vegetables, and packaged goods.</p>
            
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Search
              </button>
            </form>

            <Link
              to="/products"
              className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <ShoppingBag className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fresh Products</h3>
              <p className="text-gray-600">Hand-picked fresh items daily</p>
            </div>
            <div className="text-center">
              <Truck className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Within 24 hours</p>
            </div>
            <div className="text-center">
              <HeadphonesIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Become a Seller Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Store className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Become a Seller on FreshMart</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our marketplace and reach thousands of customers. Start selling your products today!
            </p>
            <button
              onClick={() => setShowSellerForm(true)}
              className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Start Selling
            </button>
          </div>
        </div>
      </div>

      {/* Seller Form Modal */}
      {showSellerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            {formSubmitted ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
                <p className="text-gray-600">We'll review your application and contact you soon.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-4">Seller Application</h3>
                <form onSubmit={handleSellerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={sellerFormData.name}
                      onChange={(e) => setSellerFormData({...sellerFormData, name: e.target.value})}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={sellerFormData.email}
                      onChange={(e) => setSellerFormData({...sellerFormData, email: e.target.value})}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={sellerFormData.phone}
                      onChange={(e) => setSellerFormData({...sellerFormData, phone: e.target.value})}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      required
                      value={sellerFormData.businessName}
                      onChange={(e) => setSellerFormData({...sellerFormData, businessName: e.target.value})}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                    <select
                      required
                      value={sellerFormData.productCategory}
                      onChange={(e) => setSellerFormData({...sellerFormData, productCategory: e.target.value})}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select a category</option>
                      <option value="fruits">Fruits</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="dairy">Dairy</option>
                      <option value="bakery">Bakery</option>
                      <option value="beverages">Beverages</option>
                      <option value="snacks">Snacks</option>
                      <option value="organic">Organic</option>
                      <option value="packaged">Packaged Foods</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
                    <textarea
                      required
                      value={sellerFormData.description}
                      onChange={(e) => setSellerFormData({...sellerFormData, description: e.target.value})}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowSellerForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Top Selling Products Carousel */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              Top Selling Products
            </h2>
            <Link to="/products" className="text-green-600 hover:text-green-700 font-semibold">
              View All Products →
            </Link>
          </div>
          
          <div className="relative">
            <button
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
              onMouseEnter={() => setIsAutoScrolling(false)}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div
              ref={carouselRef}
              className="overflow-hidden"
              onMouseEnter={() => setIsAutoScrolling(false)}
              onMouseLeave={() => setIsAutoScrolling(true)}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 25}%)`
                }}
              >
                {topSellingProducts.map(product => (
                  <div key={product.id} className="min-w-[25%] px-3">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
              onMouseEnter={() => setIsAutoScrolling(false)}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: topSellingProducts.length - 3 }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-green-600' : 'bg-gray-300'
                }`}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoScrolling(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/products?category=fruits" className="group">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf"
                  alt="Fruits"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Fruits</h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=vegetables" className="group">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c"
                  alt="Vegetables"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Vegetables</h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=dairy" className="group">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1628088062854-d1870b4553da"
                  alt="Dairy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Dairy</h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=bakery" className="group">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff"
                  alt="Bakery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Bakery</h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=beverages" className="group">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1543253687-c931c8e01820"
                  alt="Beverages"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Beverages</h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=snacks" className="group">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32"
                  alt="Snacks"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Snacks</h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=organic" className="group">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2"
                  alt="Organic"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Organic</h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=packaged" className="group">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                  alt="Packaged"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Packaged</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}