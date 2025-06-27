import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails, updateProduct } from '../../redux/slices/productSlice';
import axios from 'axios';
import { toast } from 'sonner';

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector((state) => state.products);

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

  // Fetch product
  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [id, dispatch]);

  // Sync selected product
  useEffect(() => {
    if (selectedProduct && selectedProduct._id === id) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
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
    setSubmitLoading(true);
    try {
      await dispatch(updateProduct({ id, productData })).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Failed to update product!");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      {loading && <p className="text-blue-500">Loading product...</p>}
      {uploading && <p className="text-yellow-500">Uploading image...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Product fields */}
        {[
          { label: "Product Name", name: "name" },
          { label: "Price", name: "price", type: "number" },
          { label: "Count In Stock", name: "countInStock", type: "number" },
          { label: "SKU", name: "sku" },
          { label: "Category", name: "category" },
          { label: "Brand", name: "brand" },
          { label: "Collections", name: "collections" },
          { label: "Material", name: "material" },
          { label: "Gender", name: "gender" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="mb-6">
            <label className="block font-semibold mb-2">{label}</label>
            <input
              type={type}
              name={name}
              value={productData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
        ))}

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            rows={4}
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(',')}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(',').map((s) => s.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(',')}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(',').map((c) => c.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Upload Image */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
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
          {submitLoading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
