// Base configuration
export interface PrintifyConfig {
  apiKey: string;
  endpoint: string;
  userAgent?: string;
}

// Order-related types
export interface Address {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  country: string;
  region?: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
}

export interface OrderLineItem {
  product_id: string;
  variant_id: number;
  quantity: number;
  print_provider_id?: number;
  blueprint_id?: number;
  sku?: string;
}

export enum OrderStatus {
  PENDING = "pending",
  ON_HOLD = "onhold",
  CANCELED = "canceled",
  FAILED = "failed",
  COMPLETED = "completed",
}

export interface Order {
  id: string;
  address_to: Address;
  line_items: OrderLineItem[];
  metadata: {
    order_type: string;
    shop_order_id?: string;
    shop_order_label?: string;
  };
  shipping_method: number;
  send_shipping_notification: boolean;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

// Product-related types
export interface ProductVariant {
  id: number;
  price: number;
  title: string;
  sku: string;
  options: number[];
  placeholder?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variants: ProductVariant[];
  images: Array<{ src: string }>;
  created_at: string;
  updated_at: string;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Shipping
export interface ShippingOption {
  id: number;
  title: string;
}
