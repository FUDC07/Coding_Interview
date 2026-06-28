import { useState } from 'react';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import type { CartItem } from './types';
function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.skuId === item.skuId);
      if (existingItem) {
        return prevItems.map(i =>
          i.skuId === item.skuId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <header className="max-w-6xl mx-auto px-6 mb-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">E-Commerce Store</h1>
        <button 
          onClick={() => setIsCartOpen(true)} 
          className="text-sm bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition flex items-center gap-2 cursor-pointer"
        >
          🛒 Cart
          {cartItems.length > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </header>
      <main>
        <ProductDetail onAddToCart={handleAddToCart} />
      </main>
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
      />
    </div>
  );
}
export default App;