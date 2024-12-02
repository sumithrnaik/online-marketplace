import React, { useState, useEffect } from 'react';
import { Search, Menu, Heart, Bell, MessageSquare, Plus, Filter } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [categories] = useState([
    'Electronics', 'Vehicles', 'Property', 'Furniture', 'Fashion', 'Books', 'Sports', 'Jobs'
  ]);
  const [featuredListings, setFeaturedListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/listings/')
      .then(response => {
        setFeaturedListings(response.data);
        setFilteredListings(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = featuredListings.filter(item => {
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesSearch = searchQuery
        ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
    setFilteredListings(filtered);
  }, [selectedCategory, searchQuery, featuredListings]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 text-gray-500 lg:hidden" />
              <h1 className="text-2xl font-bold text-blue-600">MarketPlace</h1>
            </div>
            <div className="hidden md:flex flex-1 mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search items..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Heart className="h-6 w-6 text-gray-500" />
              <Bell className="h-6 w-6 text-gray-500" />
              <MessageSquare className="h-6 w-6 text-gray-500" />
              <button onClick={() => navigate('/sell')} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                <Plus className="h-5 w-5 mr-1" />
                <span>Sell</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white shadow-sm mt-1">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex overflow-x-auto space-x-6 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`text-gray-600 hover:text-blue-600 whitespace-nowrap ${selectedCategory === category ? 'font-bold' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Featured Listings</h2>
          <button onClick={toggleFilters} className="flex items-center text-gray-600">
            <Filter className="h-5 w-5 mr-1" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={`http://localhost:8000/${item.image_url}`}
                alt={item.title}
                className="h-48 object-cover mx-auto mt-3"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-blue-600 font-bold mb-1">{item.price}</p>
                <p className="text-gray-500 text-sm">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
