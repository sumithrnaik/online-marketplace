import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product || {
    title: 'Sample Product',
    price: '$999',
    location: 'New York',
    category: 'job', // Adding a sample category
    image_url: 'https://via.placeholder.com/600',
  };

  // Log to check if the category is correctly set
  console.log('Product Category:', product.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-3xl font-extrabold text-blue-600">MarketPlace</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search items..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              + Sell
            </button>
          </div>
        </nav>
      </header>

      {/* Product Details */}
      <main className="container ml-64 py-12 px-6 flex flex-col md:flex-row items-start gap-32">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center gap-0" style={{width:"300px", height:'300px'}} >
        <img
            src={`http://localhost:8000/${product.image_url}`}
            alt={product.title}
            className="rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300 mt-9 ml-28"
            style={{
            maxWidth: '100%',    
            height: 'auto',     
            objectFit: 'fit',  
        }}
        />
        </div>

        {/* Product Information */}
        <div className="w-full md:w-1/2 space-y-6 mt-3" style={{ width: '500px', height: '514px' }}>
          <h2 className="text-5xl font-bold text-gray-800 leading-tight">{product.title}</h2>
          <p className="text-4xl font-semibold text-blue-600">{product.price}</p>
          <p className="text-gray-500 text-lg">Location: {product.location}</p>

          <p className="text-gray-700 leading-relaxed text-lg">
            This is a detailed description of the product. It highlights the key features and
            benefits of the item, providing potential buyers with all the information they need.
          </p>

          {/* Conditionally render the button based on category */}
          <button
            className={`w-full py-4 rounded-lg font-semibold transition-colors duration-300 ${
              product.category === 'job'
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800'
            }`}
          >
            {product.category === 'Jobs' ? 'Apply Now' : 'Buy Now'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
