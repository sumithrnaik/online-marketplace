import React, { useState } from 'react';
import { Plus, ImagePlus, X } from 'lucide-react';

const SellPage = () => {
  const [image, setImage] = useState(null); 
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    location: ''
  });

  const categories = [
    'Electronics', 'Vehicles', 'Property', 'Furniture',
    'Fashion', 'Books', 'Sports', 'Jobs'
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the image file directly
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if an image is selected before proceeding
    if (!image) {
      alert('Please upload an image');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('location', formData.location);

    // Append image file to form data
    formDataToSend.append('image_url', image); // Ensure the field name matches the expected one on the backend

    try {
      const response = await fetch('http://localhost:8000/api/list/', {
        method: 'POST',
        body: formDataToSend, // Send the form data with the image as a file
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Successfully created listing:', result);
        // Reset form
        setFormData({
          title: '',
          price: '',
          location: '',
          category: ''
        });
        setImage(null); // Reset image
      } else {
        const errorResponse = await response.json(); // Get response content
        console.error('Error creating listing:', response.statusText);
        console.error('Response content:', errorResponse); // Log the response body
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center mb-6">
          <Plus className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Create New Listing</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            {image ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="h-32 w-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition">
                  <ImagePlus className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-2">Add Image</span>
                </div>
              </label>
            )}
          </div>

          {/* Other Inputs */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter item title"
            />
          </div>

          {/* Category Select */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price and Location */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="$ 0.00"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your location"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
