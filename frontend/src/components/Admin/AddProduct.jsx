import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../redux/slices/adminProductSlice';
import axios from 'axios';
import { toast } from 'sonner';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image Upload Error:", error);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic required field validation
    const requiredFields = [
      "name", "description", "price", "countInStock", "sku", "category",
      "sizes", "colors", "collections", "gender"
    ];
    for (let field of requiredFields) {
      const value = productData[field];
      if (Array.isArray(value) ? value.length === 0 : !value) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    if (productData.images.length === 0) {
      toast.error("At least one product image is required.");
      return;
    }

    setSubmitLoading(true);
    try {
      await dispatch(createProduct(productData)).unwrap();
      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Create Product Error:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      {uploading && <p className="text-yellow-500">Uploading image...</p>}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <FormInput label="Product Name" name="name" value={productData.name} handleChange={handleChange} required />

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description<span className="text-red-500">*</span></label>
          <textarea
            name="description"
            rows={4}
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Price */}
        <FormInput label="Price" name="price" type="number" value={productData.price} handleChange={handleChange} required />

        {/* Count In Stock */}
        <FormInput label="Count In Stock" name="countInStock" type="number" value={productData.countInStock} handleChange={handleChange} required />

        {/* SKU */}
        <FormInput label="SKU" name="sku" value={productData.sku} handleChange={handleChange} required />

        {/* Category */}
        <FormInput label="Category" name="category" value={productData.category} handleChange={handleChange} required />

        {/* Brand */}
        <FormInput label="Brand" name="brand" value={productData.brand} handleChange={handleChange} />

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes (comma-separated)<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(',')}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(',').map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors (comma-separated)<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(',')}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(',').map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Collections */}
        <FormInput label="Collections" name="collections" value={productData.collections} handleChange={handleChange} required />

        {/* Material */}
        <FormInput label="Material" name="material" value={productData.material} handleChange={handleChange} />

        {/* Gender */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Gender<span className="text-red-500">*</span></label>
          <select
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Upload Image */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image<span className="text-red-500">*</span></label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Preview Images */}
        <div className="mb-6 flex gap-4 flex-wrap">
          {productData.images.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={`Product ${idx}`}
              className="w-24 h-24 object-cover border rounded"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-green-500 text-white rounded-md hover:bg-green-600 px-2 py-1 disabled:bg-green-300"
        >
          {submitLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

// ✅ Small reusable input field component
const FormInput = ({ label, name, value, handleChange, type = "text", required = false }) => (
  <div className="mb-6">
    <label className="block font-semibold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg p-2"
      required={required}
    />
  </div>
);

export default AddProduct;
