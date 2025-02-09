import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  PrintifyConfig,
  Address,
  Order,
  OrderLineItem,
  OrderStatus,
  Product,
  ProductVariant,
  PaginationParams,
  ShippingOption
} from './types';
import { PrintifyError, ApiErrorResponse } from './errors';

export class PrintifyClient {
  private readonly client: AxiosInstance;

  constructor(config: PrintifyConfig) {
    this.client = axios.create({
      baseURL: config.endpoint,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'User-Agent': config.userAgent || 'PrintifyApiClient/1.0',
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
  }

  // ======================
  // PRODUCT METHODS
  // ======================

  /**
   * Get paginated list of products
   * @param shopId - Printify shop ID
   * @param params - Pagination parameters
   * @returns Promise with array of Products
   */
  async getProducts(shopId: string, params?: PaginationParams): Promise<Product[]> {
    return this.handleRequest<Product[]>(
      this.client.get(`/shops/${shopId}/products.json`, { params })
    );
  }

  /**
   * Get single product details
   * @param shopId - Printify shop ID
   * @param productId - Product ID to retrieve
   * @returns Promise with Product details
   */
  async getProduct(shopId: string, productId: string): Promise<Product> {
    return this.handleRequest<Product>(
      this.client.get(`/shops/${shopId}/products/${productId}.json`)
    );
  }

  // ======================
  // ORDER METHODS
  // ======================

  /**
   * Create a new order
   * @param shopId - Printify shop ID
   * @param orderData - Order payload
   * @returns Promise with created Order
   */
  async createOrder(shopId: string, orderData: Order): Promise<Order> {
    return this.handleRequest<Order>(
      this.client.post(`/shops/${shopId}/orders.json`, orderData)
    );
  }

  /**
   * Get order details
   * @param shopId - Printify shop ID
   * @param orderId - Order ID to retrieve
   * @returns Promise with Order details
   */
  async getOrderDetails(shopId: string, orderId: string): Promise<Order> {
    return this.handleRequest<Order>(
      this.client.get(`/shops/${shopId}/orders/${orderId}.json`)
    );
  }

  /**
   * Update an existing order
   * @param shopId - Printify shop ID
   * @param orderId - Order ID to update
   * @param updateData - Partial order data to update
   * @returns Promise with updated Order
   */
  async updateOrder(shopId: string, orderId: string, updateData: Partial<Order>): Promise<Order> {
    return this.handleRequest<Order>(
      this.client.put(`/shops/${shopId}/orders/${orderId}.json`, updateData)
    );
  }

  /**
   * Delete an order
   * @param shopId - Printify shop ID
   * @param orderId - Order ID to delete
   * @returns Promise indicating success
   */
  async deleteOrder(shopId: string, orderId: string): Promise<void> {
    return this.handleRequest<void>(
      this.client.delete(`/shops/${shopId}/orders/${orderId}.json`)
    );
  }

  // ======================
  // SHIPPING METHODS
  // ======================

  /**
   * Get shipping options for a product
   * @param shopId - Printify shop ID
   * @param productId - Product ID to check
   * @returns Promise with array of ShippingOptions
   */
  async getShippingOptions(shopId: string, productId: string): Promise<ShippingOption[]> {
    return this.handleRequest<ShippingOption[]>(
      this.client.get(`/shops/${shopId}/products/${productId}/shipping.json`)
    );
  }

  // ======================
  // ERROR HANDLING
  // ======================

  /**
   * Central request handler with error management
   * @param promise - Axios request promise
   * @returns Promise with typed response
   */
  private async handleRequest<T>(promise: Promise<AxiosResponse>): Promise<T> {
    try {
      const response = await promise;
      return response.data as T;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiErrorResponse;
        throw new PrintifyError(
          apiError?.message || error.message,
          error.response?.status || 500,
          apiError?.errors
        );
      }
      throw new PrintifyError('Unknown error occurred', 500);
    }
  }
}