import React, { useState, useEffect, useMemo } from 'react';
import { getProductDetail, addToCart } from '../api/productApi';
import type { Product, Variant, CartItem } from '../types';
import VariantSelector from './VariantSelector';
interface ProductDetailProps {
  onAddToCart: (item: CartItem) => void;
}
const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [cartMessage, setCartMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const data = await getProductDetail("P001");
        setProduct(data);
        if (data.variants.length > 0) {
          setSelectedColor(data.variants[0].color);
          setSelectedSize(data.variants[0].size);
        }
      } catch (err: any) {
        setApiError(err.message || "An error occurred while fetching the product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);
  const colors = useMemo(() => [...new Set(product?.variants.map(v => v.color) || [])], [product]);
  const sizes = useMemo(() => [...new Set(product?.variants.map(v => v.size) || [])], [product]);
  const currentVariant: Variant | undefined = useMemo(() => {
    if (!product) return undefined;
    return product.variants.find(v => v.color === selectedColor && v.size === selectedSize);
  }, [product, selectedColor, selectedSize]);
  useEffect(() => {
    if (currentVariant && quantity > currentVariant.stock) {
      setQuantity(1);
    }
  }, [currentVariant]);
  const handleQuantityChange = (delta: number) => {
    if (!currentVariant) return;
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= currentVariant.stock) {
      setQuantity(newQty);
    }
  };
  const handleAddToCart = async () => {
    if (!product || !currentVariant) return;
    setIsAddingToCart(true);
    setCartMessage(null);
    try {
      const response = await addToCart({
        productId: product.productId,
        skuId: currentVariant.skuId,
        quantity,
      });
      if (response.success) {
        setCartMessage({ type: 'success', text: `Successfully added ${quantity} item(s) to cart!` });
        // 将商品信息传递给父组件
        onAddToCart({
          productId: product.productId,
          skuId: currentVariant.skuId,
          name: product.name,
          color: currentVariant.color,
          size: currentVariant.size,
          price: currentVariant.price,
          quantity: quantity,
        });
      } else {
        setCartMessage({ type: 'error', text: response.message || "Failed to add to cart." });
      }
    } catch (err: any) {
      setCartMessage({ type: 'error', text: "Network error occurred while adding to cart." });
    } finally {
      setIsAddingToCart(false);
    }
  };
  if (loading) {
    return <div className="text-center py-20 text-lg font-medium text-gray-500">Loading product data...</div>;
  }
  if (apiError) {
    return <div className="text-center py-20 text-lg font-medium text-red-500 bg-red-50 p-4 rounded-md">{apiError}</div>;
  }
  if (!product) return null;
  const isOutOfStock = !currentVariant || currentVariant.stock === 0;
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        {/* Details Section */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="mb-4">
            {currentVariant && (
              <span className="text-2xl font-semibold text-gray-800">
                ${currentVariant.price.toFixed(2)}
              </span>
            )}
            <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${isOutOfStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {isOutOfStock ? 'Out of Stock' : `In Stock (${currentVariant?.stock} available)`}
            </span>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          <div className="border-t border-b py-4 mb-6">
            <VariantSelector 
              label="Color"
              options={colors}
              selectedValue={selectedColor}
              onSelect={setSelectedColor}
            />
            <VariantSelector 
              label="Size"
              options={sizes}
              selectedValue={selectedSize}
              onSelect={setSelectedSize}
            />
          </div>
          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || isOutOfStock}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                -
              </button>
              <input 
                type="text" 
                value={quantity} 
                readOnly 
                className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
              />
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={isOutOfStock || (currentVariant !== undefined && quantity >= currentVariant.stock)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAddingToCart}
              className={`flex-1 py-3 px-6 rounded-md text-white font-semibold transition-colors
                ${isOutOfStock || isAddingToCart 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800'}`}
            >
              {isAddingToCart ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
          {/* Feedback Messages */}
          {cartMessage && (
            <div className={`p-3 rounded-md text-sm ${cartMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {cartMessage.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;