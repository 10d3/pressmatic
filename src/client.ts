import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  PressmaticConfig,
  Address,
  Order,
  OrderLineItem,
  OrderStatus,
  Product,
  ProductVariant,
  PaginationParams,
  ShippingOption,
  Shop,
} from "./types";
import { PrintifyError, ApiErrorResponse } from "./errors";

export class PressmaticClient {
  private readonly client: AxiosInstance;

  constructor(config: PressmaticConfig) {
    this.client = axios.create({
      baseURL: config.endpoint,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "User-Agent": config.userAgent || "PrintifyApiClient/1.0",
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });
  }

  // ======================
  // SHOP METHODS
  // ======================

  /**
   * Get shop list
   * @returns Promise with Shop list
   */
  async getShops(): Promise<Shop[]> {
    return this.handleRequest<Shop[]>(this.client.get("/shops.json"));
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
  async getProducts(
    shopId: string,
    params?: PaginationParams
  ): Promise<Product[]> {
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

  /**
   * Delete a product
   * @param shopId - Printify shop ID
   * @param productId - Product ID to delete
   * @returns Promise indicating success
   */
  async deleteProduct(shopId: string, productId: string): Promise<void> {
    return this.handleRequest<void>(
      this.client.delete(`/shops/${shopId}/products/${productId}.json`)
    );
  }

  /**
   * Publish a product
   * @param shopId - Printify shop ID
   * @param productId - Product ID to publish
   * @returns Promise indicating success
   */
  async publishProduct(shopId: string, productId: string): Promise<void> {
    const publishData = {
      title: true,
      description: true,
      images: true,
      variants: true,
      tags: true,
      keyFeatures: true,
      shipping_template: true,
    };

    return this.handleRequest<void>(
      this.client.post(
        `/shops/${shopId}/products/${productId}/publish.json`,
        publishData
      )
    );
  }

  /**
   * Set publishing succeeded status
   * @param shopId - Printify shop ID
   * @param productId - Product ID
   * @param handle - Product handle
   * @param externalId - External ID
   * @returns Promise indicating success
   */
  async setPublishingSucceeded(
    shopId: string,
    productId: string,
    handle: string,
    externalId: string
  ): Promise<void> {
    const data = {
      external: {
        id: externalId,
        handle: handle,
      },
    };

    return this.handleRequest<void>(
      this.client.post(
        `/shops/${shopId}/products/${productId}/publishing_succeeded.json`,
        data
      )
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
   * Create order with product ID
   * @param shopId - Printify shop ID
   * @param externalId - External order ID
   * @param label - Order label
   * @param lineItems - Order line items with product IDs
   * @param shippingMethod - Shipping method ID
   * @param address - Shipping address
   * @param isPrintifyExpress - Use Printify Express shipping
   * @param isEconomyShipping - Use economy shipping
   * @param sendShippingNotification - Send shipping notification
   * @returns Promise with created Order
   */
  async createOrderWithProductId(
    shopId: string,
    externalId: string,
    label: string,
    lineItems: Array<{
      product_id: string;
      variant_id: number;
      quantity: number;
    }>,
    shippingMethod: number,
    address: Address,
    isPrintifyExpress: boolean = false,
    isEconomyShipping: boolean = false,
    sendShippingNotification: boolean = false
  ): Promise<Order> {
    const orderData = {
      external_id: externalId,
      label: label,
      line_items: lineItems,
      shipping_method: shippingMethod,
      is_printify_express: isPrintifyExpress,
      is_economy_shipping: isEconomyShipping,
      send_shipping_notification: sendShippingNotification,
      address_to: address,
    };

    return this.handleRequest<Order>(
      this.client.post(`/shops/${shopId}/orders.json`, orderData)
    );
  }

  /**
   * Create order with SKU
   * @param shopId - Printify shop ID
   * @param externalId - External order ID
   * @param label - Order label
   * @param lineItems - Order line items with SKUs
   * @param shippingMethod - Shipping method ID
   * @param address - Shipping address
   * @param isPrintifyExpress - Use Printify Express shipping
   * @param isEconomyShipping - Use economy shipping
   * @param sendShippingNotification - Send shipping notification
   * @returns Promise with created Order
   */
  async createOrderWithSKU(
    shopId: string,
    externalId: string,
    label: string,
    lineItems: Array<{ sku: string; quantity: number }>,
    shippingMethod: number,
    address: Address,
    isPrintifyExpress: boolean = false,
    isEconomyShipping: boolean = false,
    sendShippingNotification: boolean = false
  ): Promise<Order> {
    const orderData = {
      external_id: externalId,
      label: label,
      line_items: lineItems,
      shipping_method: shippingMethod,
      is_printify_express: isPrintifyExpress,
      is_economy_shipping: isEconomyShipping,
      send_shipping_notification: sendShippingNotification,
      address_to: address,
    };

    return this.handleRequest<Order>(
      this.client.post(`/shops/${shopId}/orders.json`, orderData)
    );
  }

  /**
   * Create a flexible order with either product IDs or SKUs
   * @param shopId - Printify shop ID
   * @param externalId - External order ID
   * @param label - Order label
   * @param lineItems - Order line items with either product IDs or SKUs
   * @param shippingMethod - Shipping method ID
   * @param address - Shipping address
   * @param isPrintifyExpress - Use Printify Express shipping
   * @param isEconomyShipping - Use economy shipping
   * @param sendShippingNotification - Send shipping notification
   * @returns Promise with created Order
   */
  async createFlexibleOrder(
    shopId: string,
    externalId: string,
    label: string,
    lineItems: Array<{
      product_id?: string;
      variant_id?: number;
      sku?: string;
      quantity: number;
    }>,
    shippingMethod: number,
    address: Address,
    isPrintifyExpress: boolean = false,
    isEconomyShipping: boolean = false,
    sendShippingNotification: boolean = false
  ): Promise<Order> {
    const orderData = {
      external_id: externalId,
      label: label,
      line_items: lineItems,
      shipping_method: shippingMethod,
      is_printify_express: isPrintifyExpress,
      is_economy_shipping: isEconomyShipping,
      send_shipping_notification: sendShippingNotification,
      address_to: address,
    };

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
  async updateOrder(
    shopId: string,
    orderId: string,
    updateData: Partial<Order>
  ): Promise<Order> {
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

  /**
   * Send order to production
   * @param shopId - Printify shop ID
   * @param orderId - Order ID to send to production
   * @returns Promise indicating success
   */
  async sendOrderToProduction(shopId: string, orderId: string): Promise<void> {
    return this.handleRequest<void>(
      this.client.post(
        `/shops/${shopId}/orders/${orderId}/send_to_production.json`,
        {}
      )
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
  async getShippingOptions(
    shopId: string,
    productId: string
  ): Promise<ShippingOption[]> {
    return this.handleRequest<ShippingOption[]>(
      this.client.get(`/shops/${shopId}/products/${productId}/shipping.json`)
    );
  }

  /**
   * Calculate shipping cost
   * @param shopId - Printify shop ID
   * @param lineItems - Order line items
   * @param address - Shipping address
   * @returns Promise with shipping cost details
   */
  async getShippingCost(
    shopId: string,
    lineItems: Array<{
      product_id?: string;
      variant_id?: number;
      quantity: number;
      print_provider_id?: number;
      blueprint_id?: number;
      sku?: string;
    }>,
    address: Address
  ): Promise<any> {
    const shippingData = {
      line_items: lineItems,
      address_to: address,
    };

    return this.handleRequest<any>(
      this.client.post(`/shops/${shopId}/orders/shipping.json`, shippingData)
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
      throw new PrintifyError("Unknown error occurred", 500);
    }
  }
}
