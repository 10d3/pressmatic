import { PrintifyConfig, Order, Product, PaginationParams, ShippingOption } from './types';
export declare class PrintifyClient {
    private readonly client;
    constructor(config: PrintifyConfig);
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
     * Create a new order
     * @param shopId - Printify shop ID
     * @param orderData - Order payload
     * @returns Promise with created Order
     */
    createOrder(shopId: string, orderData: Order): Promise<Order>;
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
     * Get shipping options for a product
     * @param shopId - Printify shop ID
     * @param productId - Product ID to check
     * @returns Promise with array of ShippingOptions
     */
    getShippingOptions(shopId: string, productId: string): Promise<ShippingOption[]>;
    /**
     * Central request handler with error management
     * @param promise - Axios request promise
     * @returns Promise with typed response
     */
    private handleRequest;
}
