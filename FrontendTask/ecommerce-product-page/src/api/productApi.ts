// src/api/productApi.ts
import type { Product, AddToCartPayload, AddToCartResponse } from '../types';
const mockProduct: Product = {
    productId: "P001",
    name: "Sample Smartphone",
    description: "This is a high-performance smartphone with an amazing display and battery life.",
    images: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=60"
    ],
    variants: [
    { skuId: "SKU-001", color: "Black", size: "128GB", price: 1299, stock: 10 },
    { skuId: "SKU-002", color: "Black", size: "256GB", price: 1499, stock: 0 },
    { skuId: "SKU-003", color: "White", size: "128GB", price: 1299, stock: 5 },
    { skuId: "SKU-004", color: "White", size: "256GB", price: 1499, stock: 2 },
    ]
};
export const getProductDetail = (productId: string): Promise<Product> => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (productId === "P001") {
        resolve(mockProduct);
        } else {
        reject(new Error("Failed to fetch product data. Product not found."));
        }
    }, 1000);
    });
};
export const addToCart = (payload: AddToCartPayload): Promise<AddToCartResponse> => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        const selectedVariant = mockProduct.variants.find(v => v.skuId === payload.skuId);
        if (!selectedVariant) {
        reject(new Error("Invalid SKU"));
        return;
        }
        if (payload.quantity > selectedVariant.stock) {
        resolve({
            success: false,
            message: "Insufficient stock"
        });
        return;
        }
        resolve({
        success: true,
        cartCount: 3 + payload.quantity 
        });
    }, 800);
    });
};