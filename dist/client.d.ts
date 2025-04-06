import { PressmaticConfig, Address, Order, Product, PaginationParams, ShippingOption, Shop } from "./types";
export declare class PressmaticClient {
    private readonly client;
    constructor(config: PressmaticConfig);
    /**
     * Get shop list
     * @returns Promise with Shop list
     */
    getShops(): Promise<Shop[]>;
    /**
     * Get paginated list of products
     * @param shopId - Printify shop ID
     * @param params - Pagination parameters
     * @returns Promise with array of Products
     */
    getProducts(shopId: string, params?: PaginationParams): Promise<Product[]>;
    /**
     * Get single product details
     * @param shopId - Printify shop ID
     * @param productId - Product ID to retrieve
     * @returns Promise with Product details
     */
    getProduct(shopId: string, productId: string): Promise<Product>;
    /**
     * Delete a product
     * @param shopId - Printify shop ID
     * @param productId - Product ID to delete
     * @returns Promise indicating success
     */
    deleteProduct(shopId: string, productId: string): Promise<void>;
    /**
     * Publish a product
     * @param shopId - Printify shop ID
     * @param productId - Product ID to publish
     * @returns Promise indicating success
     */
    publishProduct(shopId: string, productId: string): Promise<void>;
    /**
     * Set publishing succeeded status
     * @param shopId - Printify shop ID
     * @param productId - Product ID
     * @param handle - Product handle
     * @param externalId - External ID
     * @returns Promise indicating success
     */
    setPublishingSucceeded(shopId: string, productId: string, handle: string, externalId: string): Promise<void>;
    /**
     * Create a new order
     * @param shopId - Printify shop ID
     * @param orderData - Order payload
     * @returns Promise with created Order
     */
    createOrder(shopId: string, orderData: Order): Promise<Order>;
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
    createOrderWithProductId(shopId: string, externalId: string, label: string, lineItems: Array<{
        product_id: string;
        variant_id: number;
        quantity: number;
    }>, shippingMethod: number, address: Address, isPrintifyExpress?: boolean, isEconomyShipping?: boolean, sendShippingNotification?: boolean): Promise<Order>;
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
    createOrderWithSKU(shopId: string, externalId: string, label: string, lineItems: Array<{
        sku: string;
        quantity: number;
    }>, shippingMethod: number, address: Address, isPrintifyExpress?: boolean, isEconomyShipping?: boolean, sendShippingNotification?: boolean): Promise<Order>;
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
    createFlexibleOrder(shopId: string, externalId: string, label: string, lineItems: Array<{
        product_id?: string;
        variant_id?: number;
        sku?: string;
        quantity: number;
    }>, shippingMethod: number, address: Address, isPrintifyExpress?: boolean, isEconomyShipping?: boolean, sendShippingNotification?: boolean): Promise<Order>;
    /**
     * Get order details
     * @param shopId - Printify shop ID
     * @param orderId - Order ID to retrieve
     * @returns Promise with Order details
     */
    getOrderDetails(shopId: string, orderId: string): Promise<Order>;
    /**
     * Update an existing order
     * @param shopId - Printify shop ID
     * @param orderId - Order ID to update
     * @param updateData - Partial order data to update
     * @returns Promise with updated Order
     */
    updateOrder(shopId: string, orderId: string, updateData: Partial<Order>): Promise<Order>;
    /**
     * Delete an order
     * @param shopId - Printify shop ID
     * @param orderId - Order ID to delete
     * @returns Promise indicating success
     */
    deleteOrder(shopId: string, orderId: string): Promise<void>;
    /**
     * Send order to production
     * @param shopId - Printify shop ID
     * @param orderId - Order ID to send to production
     * @returns Promise indicating success
     */
    sendOrderToProduction(shopId: string, orderId: string): Promise<void>;
    /**
     * Get shipping options for a product
     * @param shopId - Printify shop ID
     * @param productId - Product ID to check
     * @returns Promise with array of ShippingOptions
     */
    getShippingOptions(shopId: string, productId: string): Promise<ShippingOption[]>;
    /**
     * Calculate shipping cost
     * @param shopId - Printify shop ID
     * @param lineItems - Order line items
     * @param address - Shipping address
     * @returns Promise with shipping cost details
     */
    getShippingCost(shopId: string, lineItems: Array<{
        product_id?: string;
        variant_id?: number;
        quantity: number;
        print_provider_id?: number;
        blueprint_id?: number;
        sku?: string;
    }>, address: Address): Promise<any>;
    /**
     * Central request handler with error management
     * @param promise - Axios request promise
     * @returns Promise with typed response
     */
    private handleRequest;
}
