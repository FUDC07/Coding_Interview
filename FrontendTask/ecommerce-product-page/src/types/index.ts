// src/types/index.ts
export interface Variant {
    skuId: string;
    color: string;
    size: string;
    price: number;
    stock: number;
}
export interface Product {
    productId: string;
    name: string;
    description: string;
    images: string[];
    variants: Variant[];
}
export interface AddToCartPayload {
    productId: string;
    skuId: string;
    quantity: number;
}
export interface AddToCartResponse {
    success: boolean;
    cartCount?: number;
    message?: string;
}
export interface CartItem {
    productId: string;
    skuId: string;
    name: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
}