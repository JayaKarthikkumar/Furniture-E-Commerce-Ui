import { useState } from "react";
import { usePowerSync } from "@powersync/react";
import { Upload, X, Plus, Database, Cloud } from "lucide-react";

export default function About() {
  const powerSync = usePowerSync();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    discount: "",
    isNew: false,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      const fileArray = Array.from(files);

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === fileArray.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const generateObjectId = () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const random = Math.random().toString(16).substring(2, 18);
    return timestamp + random;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSyncStatus('Saving to local database...');

    try {
      // Generate MongoDB-compatible ObjectId
      const productId = generateObjectId();
      const now = new Date().toISOString();
      
      // Insert into local PowerSync database
      await powerSync.execute(
        `INSERT INTO products 
         (id, name, description, price, original_price, discount, 
          category, stock, is_new, images, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          productId,
          formData.name,
          formData.description,
          parseInt(formData.price) || 0,
          formData.originalPrice ? parseInt(formData.originalPrice) : null,
          formData.discount ? parseInt(formData.discount) : 0,
          formData.category,
          parseInt(formData.stock) || 0,
          formData.isNew ? 1 : 0,
          JSON.stringify(imagePreviews),
          now,
          now,
        ]
      );

      setSyncStatus('✅ Saved! Syncing to MongoDB...');

      // Show success toast
      const toast = document.createElement("div");
      toast.textContent = "Product added successfully! Syncing to cloud...";
      toast.className =
        "fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50 animate-fadeIn";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
        setSyncStatus('');
      }, 3000);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        stock: "",
        discount: "",
        isNew: false,
      });
      setImagePreviews([]);
      
    } catch (error) {
      console.error('Error adding product:', error);
      setSyncStatus('❌ Error saving product');
      
      const toast = document.createElement("div");
      toast.textContent = "Error adding product. Please try again.";
      toast.className =
        "fixed top-5 right-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      stock: "",
      discount: "",
      isNew: false,
    });
    setImagePreviews([]);
  };

  const categories = [
    "Chairs",
    "Tables",
    "Sofas",
    "Beds",
    "Storage",
    "Lighting",
    "Decor",
    "Outdoor",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header with PowerSync Status */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-green-600">
                <Database size={16} />
                <span>Local DB</span>
              </div>
              <div className="text-gray-300">→</div>
              <div className="flex items-center gap-1 text-blue-600">
                <Cloud size={16} />
                <span>MongoDB</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            Fill in the details below to add a new product. Data syncs automatically to MongoDB.
          </p>
        </div>

        {/* Sync Status Banner */}
        {syncStatus && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">{syncStatus}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Product Images */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product Images
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              {imagePreviews.length < 4 && (
                <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#B88E2F] hover:bg-gray-50 transition">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500">Upload up to 4 images (JPG, PNG)</p>
          </div>

          {/* Product Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Syltherine Luxury Sofa"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter product description..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent resize-none"
            />
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                Selling Price (Rp) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="2500000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="originalPrice" className="block text-sm font-semibold text-gray-700 mb-2">
                Original Price (Rp)
              </label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="3500000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              />
            </div>
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="50"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              />
            </div>
          </div>

          {/* Discount */}
          <div className="mb-6">
            <label htmlFor="discount" className="block text-sm font-semibold text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="25"
              min="0"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            />
          </div>

          {/* Is New Product */}
          <div className="mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#B88E2F] border-gray-300 rounded focus:ring-[#B88E2F]"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Mark as new product
              </span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading || !formData.name || !formData.price}
              className="flex-1 bg-[#B88E2F] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#9a7625] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Add Product
                </>
              )}
            </button>

            <button
              onClick={resetForm}
              disabled={loading}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Database size={20} />
            How PowerSync + MongoDB Works
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <strong>1. Local First:</strong> Product data is saved instantly to your local SQLite database
            </p>
            <p>
              <strong>2. Auto Sync:</strong> PowerSync automatically syncs changes to MongoDB in the background
            </p>
            <p>
              <strong>3. Offline Support:</strong> Works offline - syncs when connection is restored
            </p>
            <p>
              <strong>4. Real-time:</strong> Other users see changes immediately through MongoDB Change Streams
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
